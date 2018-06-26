# /bin/bash
PROTOC_GEN_TS_PATH="./node_modules/.bin/protoc-gen-ts"
OUT_DIR="./src/generated"
PROTO_PATH="./src/protos/"
PROTO_FILES="./src/protos/*.proto"

# create output directory
if [ -d "$OUT_DIR" ]; then
    rm -rf $OUT_DIR
fi
mkdir $OUT_DIR

# generate javascript/typescript sources
protoc \
    --plugin="protoc-gen-ts=${PROTOC_GEN_TS_PATH}" \
    --js_out="import_style=commonjs,binary:${OUT_DIR}" \
    --ts_out="${OUT_DIR}" \
    --proto_path=$PROTO_PATH \
    $PROTO_FILES