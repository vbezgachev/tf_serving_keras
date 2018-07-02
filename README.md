## Dog breed detector
It is a sample application to detect a dog breed on the image. It consists of 3 parts:
- Model creation, training and preparing for serving
- Detector API that provides a REST interface for the prediction
- Angular application that allows dog image selection and displays prediction results

### Model
I created a CNN model for a dog breed prediction based on my [learning project](https://github.com/Vetal1977/aind2-dog-project). I used [Keras](https://github.com/keras-team/keras) for the model implementation to simplify the things. Then I exported it and prepared to be served by a [TensorFlow Serving](https://github.com/tensorflow/serving) server.

### Detector API
Since the TensorFlow serving speaks [gRPC](https://grpc.io/) I created a web service that provides an API
via the REST interface. It is, actually, a facade that hides gRPC protocol with HTTP protocol that is visible to the outside world.  
The service is implemented as a [NodeJS express](https://expressjs.com/) application.

### Detector Application
I created an [Angular](https://angular.io) application that allows to select the images for prediction and displays the results. It is very simple and not nice - I just wanted to demonstrate how to build the pipeline from UI to the backend service and model hosted by TensorFlow Serving server.
