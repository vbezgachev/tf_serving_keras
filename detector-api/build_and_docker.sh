# /bin/bash

# build the project in Docker
DIST_DIR="./dist"
BUILDER="detector-api-builder"
RUNNER="detector-api"
VERSION="latest"

echo "--------------------------------------------------"
echo "Building the project in Docker..."
docker build -t $BUILDER:$VERSION -f Dockerfile.build .
docker run --name $BUILDER $BUILDER:$VERSION

if [ -d "$DIST_DIR" ]; then
    rm -rf $DIST_DIR
fi
docker cp $BUILDER:/detector_api/ $DIST_DIR

docker rm $BUILDER
docker rmi $BUILDER:$VERSION
echo "...Build finished"
echo "--------------------------------------------------"

# create Docker container
# echo "--------------------------------------------------"
# echo "Building Docker container..."
# docker build -t $RUNNER:$VERSION -f Dockerfile .
# echo "...Docker container is ready"
# echo "--------------------------------------------------"
