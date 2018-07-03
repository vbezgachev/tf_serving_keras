# /bin/bash

# activate anaconda environment with python 3.6 and installed libraries
export PATH=/home/vetal/anaconda3/envs/aind2/bin:$PATH
echo "--------------------------------------------------"
echo "Python path was set to:" && which python
echo "--------------------------------------------------"

# run the deteactor trainer that creates the model, load the weights (if they exist)
# and prepares the model for serving
echo "Start model training and export..."
echo "--------------------------------------------------"
python dog_breed_detector_trainer.py
echo "--------------------------------------------------"
echo "...model training and export finished"

# create a docker image for TensorFlow Server server
echo "Building Docker container..."
echo "--------------------------------------------------"
docker build -t detector_serving_model:latest -f Dockerfile .
echo "--------------------------------------------------"
echo "...Docker container is ready"
