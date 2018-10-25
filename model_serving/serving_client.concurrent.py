'''
Send JPEG image to tensorflow_model_server loaded with GAN model.

Hint: the code has been compiled together with TensorFlow serving
and not locally. The client is called in the TensorFlow Docker container
'''

import time
import threading
import sys

from argparse import ArgumentParser

# Communication to TensorFlow server via gRPC
from grpc.beta import implementations
import tensorflow as tf

# TensorFlow serving stuff to send messages
from tensorflow_serving.apis import predict_pb2
from tensorflow_serving.apis import prediction_service_pb2
from tensorflow.contrib.util import make_tensor_proto

from tensorflow.contrib.util import make_tensor_proto

from os import listdir
from os.path import isfile, join

import numpy as np


def parse_args():
    parser = ArgumentParser(description='Request a TensorFlow server for a prediction on the image')
    parser.add_argument('-s', '--server',
                        dest='server',
                        default='172.17.0.2:9000',
                        help='prediction service host:port')
    parser.add_argument('-i', '--image_path',
                        dest='image_path',
                        default='',
                        help='path to images folder',)
    parser.add_argument('-c', '--concurrency',
                        dest='concurrency',
                        default='1',
                        help='max number of concurrent requests')

    args = parser.parse_args()

    host, port = args.server.split(':')

    return host, port, args.image_path, args.concurrency


class _ResultCounter(object):
    '''Counter for the prediction results.'''

    def __init__(self, num_tests, concurrency):
        self._num_tests = num_tests
        self._concurrency = concurrency
        self._error = 0
        self._done = 0
        self._active = 0
        self._condition = threading.Condition()

    def inc_error(self):
        with self._condition:
            self._error += 1

    def inc_done(self):
        with self._condition:
            self._done += 1
            self._condition.notify()

    def dec_active(self):
        with self._condition:
            self._active -= 1
            self._condition.notify()

    def get_error_rate(self):
        with self._condition:
            while self._done != self._num_tests:
                self._condition.wait()
            return self._error / float(self._num_tests)

    def throttle(self):
        with self._condition:
            while self._active == self._concurrency:
                self._condition.wait()
            self._active += 1


def _create_rpc_callback(result_counter):
    '''Creates RPC callback function.
    Args:
        result_counter: Counter for the prediction result.
    Returns:
        The callback function.
    '''
    def _callback(result_future):
        '''Callback function.
        Calculates the statistics for the prediction result.
        Args:
        result_future: Result future of the RPC.
        '''
        exception = result_future.exception()
        if exception:
            result_counter.inc_error()
            print(exception)
        else:
            sys.stdout.write('.')
            sys.stdout.flush()
            response = np.array(
                result_future.result().outputs['sequential_1'].float_val)
            prediction = np.argmax(response)
            print('Prediction: {}'.format(prediction))
        result_counter.inc_done()
        result_counter.dec_active()
    return _callback


def main():
    # parse command line arguments
    host, port, image_path, concurrency = parse_args()

    channel = implementations.insecure_channel(host, int(port))
    stub = prediction_service_pb2.beta_create_PredictionService_stub(channel)
    
    filenames = [(image_path + '/' + f) for f in listdir(image_path) if isfile(join(image_path, f))]
    files = []
    imagedata = []

    for filename in filenames:
        f = open(filename, 'rb')
        files.append(f)

        data = f.read()
        imagedata.append(data)

    result_counter = _ResultCounter(len(imagedata), concurrency)

    start = time.time()

    for data in imagedata:
        request = predict_pb2.PredictRequest()
        request.model_spec.name = 'dog_breed'
        request.model_spec.signature_name = 'serving_default'

        request.inputs['examples'].CopyFrom(make_tensor_proto(data, shape=[1]))

        result_counter.throttle()
        result_future = stub.Predict.future(request, 60.0)  # 60 secs timeout
        result_future.add_done_callback(_create_rpc_callback(result_counter))

    error_rate = result_counter.get_error_rate()
    end = time.time()
    time_diff = end - start
    print('time elapased: {}, error rate: {}'.format(time_diff, error_rate))


if __name__ == '__main__':
    main()
