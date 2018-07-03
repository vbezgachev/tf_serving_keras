'''
Trains the dog breed detector and saves the final model for the serving
'''
import os
import shutil

from glob import glob

from data_extractor import DataExtractor
from dog_breed_detector_model import DogBreedDetectorModel
from final_model import FinalModel
from tensorflow.python.keras.applications.densenet import preprocess_input
from tensorflow.python.keras.estimator import model_to_estimator
import tensorflow as tf


def preprocess_image(image_buffer, image_shape=(224, 224, 3)):
    '''
    Preprocess JPEG encoded bytes to 3D float Tensor and rescales
    it so that pixels are in a range of [-1, 1]

    :param image_buffer: Buffer that contains JPEG image
    :return: 4D image tensor (1, width, height,channels) with pixels scaled
             to [-1, 1]. First dimension is a batch size (1 is our case)
    '''

    # Decode the string as an RGB JPEG.
    # Note that the resulting image contains an unknown height and width
    # that is set dynamically by decode_jpeg. In other words, the height
    # and width of image is unknown at compile-time.
    image_buffer = tf.reshape(image_buffer, [])
    img = tf.image.decode_jpeg(image_buffer, channels=3)

    # Networks accept images in batches.
    # The first dimension usually represents the batch size.
    img = tf.image.resize_images(img, size=(image_shape[1], image_shape[0]))

    # Finally, preprocess image for the model
    img = preprocess_input(img)
    return img

def serving_input_receiver_fn():
    '''
    An input receiver that expects a serialized tf.Example

    :return: a return type for a serving_input_receiver_fn
    '''
    serialized_tf_example = tf.placeholder(tf.string, name='input_image')
    feature_configs = {
        'image/encoded': tf.FixedLenFeature(
            shape=[], dtype=tf.string),
    }
    tf_example = tf.parse_example(serialized_tf_example, feature_configs)
    jpegs = tf_example['image/encoded']

    receiver_tensors = {'examples': jpegs}
    images = tf.map_fn(preprocess_image, jpegs, dtype=tf.float32)
    features = {'input_2': images}
    return tf.estimator.export.ServingInputReceiver(features, receiver_tensors)

def export_for_serving(model):
    '''
    Converts model to the TensorFlow estimator and saves it to the disk

    :param model: keras model to prepare for serving
    '''
    export_dir = 'export_model/'
    if os.path.exists(export_dir):
        shutil.rmtree(export_dir)

    tf_estimator = model_to_estimator(keras_model=model)
    tf_estimator.export_savedmodel(
        export_dir,
        serving_input_receiver_fn,
        strip_default_attrs=True)

def train_test_dog_breed_detector(do_model_test=True):
    '''
    Trains and tests the dog breed detector model

    :param do_model_test: set to True for running prediction on the test data
    :return: dog breed detector model
    '''
    # get train and validation data and labels
    data_extractor = DataExtractor('dog_images/train', 'dog_images/valid', 'dog_images/test')

    train_data = data_extractor.load_train_data()
    train_labels, train_num_dog_breeds = data_extractor.load_train_labels()

    valid_data = data_extractor.load_valid_data()
    valid_labels, valid_num_dog_breeds = data_extractor.load_valid_labels()

    assert train_num_dog_breeds == valid_num_dog_breeds

    # create and init the model
    model = DogBreedDetectorModel(num_dog_breeds=train_num_dog_breeds)
    model.init_model(train_data)

    # train the model
    if not model.load_model():
        model.train(train_data, train_labels, valid_data, valid_labels)

    # load test data and predict
    if do_model_test:
        test_data = data_extractor.load_test_data()
        test_labels, test_num_dog_breeds = data_extractor.load_test_labels()
        assert train_num_dog_breeds == test_num_dog_breeds

        model.predict(test_data, test_labels)
    return model

def create_save_final_model(top_model):
    '''
    Creates and save the final model - it consists of pretrained DenseNet201 and
    dog breed detector on top of it

    :param top_model: dog breed model is expected
    '''
    dog_breed_names = [item[21:-1] for item in sorted(glob('{}/*/'.format('dog_images/train')))]

    final_model = FinalModel(top_model.model, dog_breed_names)
    export_for_serving(final_model.model)


if __name__ == '__main__':
    dog_breed_detector_model = train_test_dog_breed_detector(do_model_test=False)
    create_save_final_model(dog_breed_detector_model)
