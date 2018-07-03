# /bin/bash

# clean previous builds
echo "--------------------------------------------------"
echo "Cleaning the project"
npm run clean
echo "--------------------------------------------------"

# install libraries
echo "--------------------------------------------------"
echo "Installing dependencies"
npm install
echo "--------------------------------------------------"

# build project
echo "--------------------------------------------------"
echo "Building the project"
npm run build
echo "--------------------------------------------------"

# create Docker container
echo "--------------------------------------------------"
echo "Building Docker container..."
docker build -t detector_api:latest -f Dockerfile .
echo "...Docker container is ready"
echo "--------------------------------------------------"
