'''
The CNN model for the dog breed detection. We use a transfer learning approach
here. We load pre-trained DenseNet201 model, save the bottleneck features
for it and use them as an input for the breed detection. Then the training
process is a way much faster with very good results
'''
import os

from tensorflow.python.keras.layers import GlobalAveragePooling2D, Dense
from tensorflow.python.keras.models import Sequential
from tensorflow.python.keras.callbacks import ModelCheckpoint, EarlyStopping
from tensorflow.python.keras.applications.densenet import DenseNet201
import numpy as np


class DogBreedDetectorModel:
    '''
    Model for the dog breed detection
    '''
    def __init__(self, num_dog_breeds=133, optimizer='adam'):
        '''
        Initializes the model.

        :param num_dog_breeds: number of dog breeds to detect
        :param optimizer: optimizer to use (adam, rmsprop, etc.)
        '''
        # learning parameters
        self.num_dog_breeds = num_dog_breeds
        self.optimizer = optimizer

        self.model = None

        # create folder to save the model
        saved_model_folder = 'saved_model'
        if not os.path.exists(saved_model_folder):
            os.makedirs(saved_model_folder)
        self.best_model_filename = saved_model_folder + '/best_model.h5'

    def init_model(self, train_data):
        '''
        Creates and initializes the Keras model

        :param train_data: train data. We need to know their shape for the model creation.
                           4-D tensor is expected:
                           (num_samples, 3-D shape of pre-trained network last layer output)
        '''
        self.model = Sequential()
        self.model.add(GlobalAveragePooling2D(input_shape=train_data.shape[1:]))
        self.model.add(Dense(self.num_dog_breeds, activation='softmax'))

        print(self.model.summary())
        self.model.compile(loss='categorical_crossentropy', optimizer=self.optimizer,
                           metrics=['accuracy'])

    def load_model(self):
        '''
        Loads previously save model

        :return: True if successful, false - if the saved model weights could not be found
        '''
        if os.path.exists(self.best_model_filename):
            self.model.load_weights(self.best_model_filename)
            print('Model weights loaded from {}'.format(self.best_model_filename))
            return True
        return False

    def train(self, train_data, train_labels, valid_data, valid_labels,
              batch_size=32, epochs=30):
        '''
        Trains the model. We use early stopping here and saves only the best model to the disk

        :param train_data: train data. 4-D tensor is expected:
                           (num_samples, 3-D shape of pre-trained network last layer output)
        :param train_label: train labels. 2-D tensor is expected:
                           (num_samples, num__dog_breeds)
        :param valid_data: validation data. 4-D tensor is expected:
                           (num_samples, 3-D shape of pre-trained network last layer output)
        :param valid_label: validation labels. 2-D tensor is expected:
                           (num_samples, num__dog_breeds)
        :param batch_size: batch size. Default is 32
        :param epochs: no. of epochs. 30 is default
        '''
        checkpointer = ModelCheckpoint(
            monitor='val_acc',
            filepath=self.best_model_filename,
            verbose=1, save_best_only=True, mode='max')
        early_stopper = EarlyStopping(monitor='val_acc', min_delta=0.001, patience=4, mode='max')

        self.model.fit(train_data, train_labels,
                       validation_data=(valid_data, valid_labels),
                       epochs=epochs,
                       verbose=1,
                       batch_size=batch_size,
                       callbacks=[checkpointer, early_stopper])

    def predict(self, test_data, test_labels):
        '''
        Makes prediction on test data
        :param test_data: test data. 4-D tensor is expected:
                           (num_samples, 3-D shape of pre-trained network last layer output)
        :param train_label: test labels. 2-D tensor is expected:
                           (num_samples, num__dog_breeds)
        '''
        print('Predicting on {} test images...'.format(test_data.shape[0]))

        model_predictions = [np.argmax(self.model.predict(np.expand_dims(data, axis=0))) \
                             for data in test_data]
        test_accuracy = 100*np.sum(
            np.array(model_predictions) ==
            np.argmax(test_labels, axis=1))/len(model_predictions)
        print('Test accuracy: %.4f%%' % test_accuracy)
