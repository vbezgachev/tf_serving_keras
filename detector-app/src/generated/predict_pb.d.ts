// package: tensorflow.serving
// file: predict.proto

import * as jspb from "google-protobuf";
import * as tensor_pb from "./tensor_pb";
import * as model_pb from "./model_pb";

export class PredictRequest extends jspb.Message {
  hasModelSpec(): boolean;
  clearModelSpec(): void;
  getModelSpec(): model_pb.ModelSpec | undefined;
  setModelSpec(value?: model_pb.ModelSpec): void;

  getInputsMap(): jspb.Map<string, tensor_pb.TensorProto>;
  clearInputsMap(): void;
  clearOutputFilterList(): void;
  getOutputFilterList(): Array<string>;
  setOutputFilterList(value: Array<string>): void;
  addOutputFilter(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PredictRequest.AsObject;
  static toObject(includeInstance: boolean, msg: PredictRequest): PredictRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PredictRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PredictRequest;
  static deserializeBinaryFromReader(message: PredictRequest, reader: jspb.BinaryReader): PredictRequest;
}

export namespace PredictRequest {
  export type AsObject = {
    modelSpec?: model_pb.ModelSpec.AsObject,
    inputsMap: Array<[string, tensor_pb.TensorProto.AsObject]>,
    outputFilterList: Array<string>,
  }
}

export class PredictResponse extends jspb.Message {
  hasModelSpec(): boolean;
  clearModelSpec(): void;
  getModelSpec(): model_pb.ModelSpec | undefined;
  setModelSpec(value?: model_pb.ModelSpec): void;

  getOutputsMap(): jspb.Map<string, tensor_pb.TensorProto>;
  clearOutputsMap(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PredictResponse.AsObject;
  static toObject(includeInstance: boolean, msg: PredictResponse): PredictResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PredictResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PredictResponse;
  static deserializeBinaryFromReader(message: PredictResponse, reader: jspb.BinaryReader): PredictResponse;
}

export namespace PredictResponse {
  export type AsObject = {
    modelSpec?: model_pb.ModelSpec.AsObject,
    outputsMap: Array<[string, tensor_pb.TensorProto.AsObject]>,
  }
}

