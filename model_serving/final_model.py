'''
The final model consists of pre-trained DenseNet201 and trained
dog breed detector model. It comnsumes an image as an input and
produces dog breed prediction as an output
'''
import tensorflow as tf
from tensorflow.python.keras.models import Model
from tensorflow.python.keras.applications.densenet import DenseNet201, preprocess_input
from tensorflow.python.keras.preprocessing import image
import numpy as np


class FinalModel:
    '''
    Final model for the dog breed detection
    '''
    def __init__(self, top_model, dog_breed_names, image_shape=(224, 224, 3)):
        '''
        Initializes the model.

        :param top_model: trained dog breed detector
        :param image_shape: image shape
        '''
        self.cnn_model = DenseNet201(weights='imagenet', include_top=False, input_shape=image_shape)
        self.top_model = top_model
        self.model = Model(inputs=self.cnn_model.input,
                           outputs=self.top_model(self.cnn_model.output))

        self.model.compile(loss='categorical_crossentropy', optimizer='adam',
                           metrics=['accuracy'])

        self.dog_breed_names = dog_breed_names

    def predict(self, image_path):
        '''
        Makes prediction on test image

        :param image_path: path to the file with an image
        :return: dog breed name
        '''
        print('Predicting on {}'.format(image_path))

        # loads RGB image as PIL.Image.Image type
        img = image.load_img(image_path, target_size=(224, 224))

        # convert PIL.Image.Image type to 3D tensor with shape (224, 224, 3)
        x = image.img_to_array(img)

        # convert 3D tensor to 4D tensor with shape (1, 224, 224, 3) and preprocess the image
        image_tensor = np.expand_dims(x, axis=0)
        preprocessed_image = preprocess_input(image_tensor)

        # make prediction
        preds = self.model.predict(preprocessed_image)
        return self.dog_breed_names[np.argmax(preds)]
