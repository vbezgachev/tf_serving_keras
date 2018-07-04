FROM nvidia/cuda:9.0-cudnn7-runtime-ubuntu16.04

# install necessary utilities
RUN apt-get update && apt-get install -y \
        curl \
        sudo \
        && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# install TensorFlow Serving server
RUN echo "deb [arch=amd64] http://storage.googleapis.com/tensorflow-serving-apt stable tensorflow-model-server tensorflow-model-server-universal" | \
	sudo tee /etc/apt/sources.list.d/tensorflow-serving.list

RUN curl https://storage.googleapis.com/tensorflow-serving-apt/tensorflow-serving.release.pub.gpg | sudo apt-key add -

RUN sudo apt-get update && sudo apt-get install tensorflow-model-server

# upgrade the packages. otherwise that TensorFlow Serving will not work
RUN apt-get install -y software-properties-common
RUN add-apt-repository ppa:ubuntu-toolchain-r/test -y

RUN apt-get update
RUN apt-get dist-upgrade -y

# create and change to working directory
WORKDIR /serving

# copy the prepared for serving model
RUN mkdir /serving/export_model
COPY export_model /serving/export_model

# start the server
EXPOSE 9000
ENTRYPOINT ["tensorflow_model_server"]
CMD ["--port=9000", "--model_name=dog_breed", "--model_base_path=/serving/export_model"]
