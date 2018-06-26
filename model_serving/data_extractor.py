'''
Data extractor reads train, validation and test images and labels from
the properly structured dog images folder
'''
import math
import os

from glob import glob
from tensorflow.python.keras.applications.densenet import DenseNet201, preprocess_input
from tensorflow.python.keras.preprocessing.image import ImageDataGenerator
from keras.utils.np_utils import to_categorical
import numpy as np

'''
Extracts train, validation and test data
'''
class DataExtractor:
    def __init__(self, train_data_dir, valid_data_dir, test_data_dir,
                 image_shape=(224, 224, 3)):
        '''
        Initializes the instance

        :param train_data_dir: directory containing train dog images. Expected structure:
                               one subdirectory for one breed that contains corresponding
                               dog breed images as jpegs
        :param valid_data_dir: same as train_data_dir for validation images
        :param test_data_dir: same as train_data_dir for test images
        :param images_shape: target image shape for the image resize
        '''

        # data directories
        self.train_data_dir = train_data_dir
        self.valid_data_dir = valid_data_dir
        self.test_data_dir = test_data_dir

        # image generator
        self.batch_size = 16
        self.image_shape = image_shape
        self.train_image_gen = ImageDataGenerator(
            width_shift_range=0.1,
            height_shift_range=0.1,
            horizontal_flip=True,
            preprocessing_function=preprocess_input)
        self.test_image_gen = ImageDataGenerator(preprocessing_function=preprocess_input)

        # DenseNet
        self.model = DenseNet201(weights='imagenet', include_top=False,
                                 input_shape=self.image_shape)

        # file names
        bottleneck_feature_dir = "bottleneck_features"
        if not os.path.exists(bottleneck_feature_dir):
            os.makedirs(bottleneck_feature_dir)

        self.train_bottleneck_features_filename = bottleneck_feature_dir + '/train.npy'
        self.valid_bottleneck_features_filename = bottleneck_feature_dir + '/valid.npy'
        self.test_bottleneck_features_filename = bottleneck_feature_dir + '/test.npy'

    def __create_bottleneck_features(self, data_dir, image_gen, bottleneck_features_filename):
        '''
        Extracts bottleneck features using DenseNet201 and saves them to to the disk

        :param data_dir: data directory containing the images.
                         Can be one of train, validation or test directory
        :param image_gen: image generator to get images from the directory. Should be one
                          of train or test image generators (see constructors)
        :param bottleneck_features_filename: name of the file to save the bottleneck features
        '''
        if not os.path.exists(bottleneck_features_filename):
            generator = image_gen.flow_from_directory(
                data_dir,
                target_size=(self.image_shape[0], self.image_shape[1]),
                batch_size=self.batch_size,
                class_mode=None,
                shuffle=False
            )

            num_samples = len(generator.filenames)
            predict_size = int(math.ceil(num_samples / self.batch_size))

            bottleneck_features = self.model.predict_generator(generator, predict_size)
            np.save(bottleneck_features_filename, bottleneck_features)

    def load_train_data(self):
        '''
        Creates if needed and loads train data

        :return: 4-D array of (num_train_samples, 7, 7, 1920) where the last 3 sizes are a shape of
                 last layer in DenseNet201
        '''
        self.__create_bottleneck_features(
            self.train_data_dir, self.train_image_gen, self.train_bottleneck_features_filename)
        return np.load(self.train_bottleneck_features_filename)

    def load_valid_data(self):
        '''
        Creates if needed and loads validation data

        :return: 4-D array of (num_valid_sample, 7, 7, 1920) where the last 3 sizes are a shape of
                 last layer in DenseNet201
        '''
        self.__create_bottleneck_features(
            self.valid_data_dir, self.test_image_gen, self.valid_bottleneck_features_filename)
        return np.load(self.valid_bottleneck_features_filename)

    def load_test_data(self):
        '''
        Creates if needed and loads test data

        :return: 4-D array of (num_sample, 7, 7, 1920) where the last 3 sizes are a shape of
                 last layer in DenseNet201
        '''
        self.__create_bottleneck_features(
            self.test_data_dir, self.test_image_gen, self.test_bottleneck_features_filename)
        return np.load(self.test_bottleneck_features_filename)

    def __load_labels(self, data_dir, image_gen):
        '''
        Extracts labels from the directory structure

        :param data_dir: data directory containing the images.
                         Can be one of train, validation or test directory
        :param image_gen: image generator to get images from the directory. Should be one
                          of train or test image generators (see constructors)
        :return: tuple of binary matrix of dog breed and number of found dog breeds
        '''
        generator = image_gen.flow_from_directory(
            data_dir,
            target_size=(self.image_shape[0], self.image_shape[1]),
            batch_size=self.batch_size,
            class_mode='categorical',
            shuffle=False
        )

        num_classes = len(generator.class_indices)
        return to_categorical(generator.classes, num_classes=num_classes), num_classes

    def load_train_labels(self):
        '''
        Extracts train labels

        :return: tuple of binary matrix of dog breed and number of found dog breeds
        '''
        return self.__load_labels(self.train_data_dir, self.train_image_gen)

    def load_valid_labels(self):
        '''
        Extracts valid labels

        :return: tuple of binary matrix of dog breed and number of found dog breeds
        '''
        return self.__load_labels(self.valid_data_dir, self.test_image_gen)

    def load_test_labels(self):
        '''
        Extracts test labels

        :return: tuple of binary matrix of dog breed and number of found dog breeds
        '''
        return self.__load_labels(self.test_data_dir, self.test_image_gen)

    def get_dog_breed_names(self):
        '''
        Gets the dog breed names

        :return: list of dog breed names
        '''
        dog_breed_names = [item[21:-1] for item in sorted(glob('{}/*/'.format(self.train_data_dir)))]
        return dog_breed_names
