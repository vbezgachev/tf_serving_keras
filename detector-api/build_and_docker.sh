# /bin/bash

# build the project in Docker
echo "--------------------------------------------------"
echo "Building the project in Docker..."
docker build -t detector_api_builder:latest -f Dockerfile.build .
docker run --name detector_api_builder detector_api_builder:latest

docker cp detector_api_builder:/detector_api ./dist

docker rm detector_api_builder
docker rmi detector_api_builder:latest
echo "...Build finished"
echo "--------------------------------------------------"

# create Docker container
echo "--------------------------------------------------"
echo "Building Docker container..."
docker build -t detector_api:latest -f Dockerfile .
echo "...Docker container is ready"
echo "--------------------------------------------------"
