// package: tensorflow
// file: tensor.proto

import * as jspb from "google-protobuf";
import * as resource_handle_pb from "./resource_handle_pb";
import * as tensor_shape_pb from "./tensor_shape_pb";
import * as types_pb from "./types_pb";

export class TensorProto extends jspb.Message {
  getDtype(): types_pb.DataType;
  setDtype(value: types_pb.DataType): void;

  hasTensorShape(): boolean;
  clearTensorShape(): void;
  getTensorShape(): tensor_shape_pb.TensorShapeProto | undefined;
  setTensorShape(value?: tensor_shape_pb.TensorShapeProto): void;

  getVersionNumber(): number;
  setVersionNumber(value: number): void;

  getTensorContent(): Uint8Array | string;
  getTensorContent_asU8(): Uint8Array;
  getTensorContent_asB64(): string;
  setTensorContent(value: Uint8Array | string): void;

  clearHalfValList(): void;
  getHalfValList(): Array<number>;
  setHalfValList(value: Array<number>): void;
  addHalfVal(value: number, index?: number): number;

  clearFloatValList(): void;
  getFloatValList(): Array<number>;
  setFloatValList(value: Array<number>): void;
  addFloatVal(value: number, index?: number): number;

  clearDoubleValList(): void;
  getDoubleValList(): Array<number>;
  setDoubleValList(value: Array<number>): void;
  addDoubleVal(value: number, index?: number): number;

  clearIntValList(): void;
  getIntValList(): Array<number>;
  setIntValList(value: Array<number>): void;
  addIntVal(value: number, index?: number): number;

  clearStringValList(): void;
  getStringValList(): Array<Uint8Array | string>;
  getStringValList_asU8(): Array<Uint8Array>;
  getStringValList_asB64(): Array<string>;
  setStringValList(value: Array<Uint8Array | string>): void;
  addStringVal(value: Uint8Array | string, index?: number): Uint8Array | string;

  clearScomplexValList(): void;
  getScomplexValList(): Array<number>;
  setScomplexValList(value: Array<number>): void;
  addScomplexVal(value: number, index?: number): number;

  clearInt64ValList(): void;
  getInt64ValList(): Array<number>;
  setInt64ValList(value: Array<number>): void;
  addInt64Val(value: number, index?: number): number;

  clearBoolValList(): void;
  getBoolValList(): Array<boolean>;
  setBoolValList(value: Array<boolean>): void;
  addBoolVal(value: boolean, index?: number): boolean;

  clearDcomplexValList(): void;
  getDcomplexValList(): Array<number>;
  setDcomplexValList(value: Array<number>): void;
  addDcomplexVal(value: number, index?: number): number;

  clearResourceHandleValList(): void;
  getResourceHandleValList(): Array<resource_handle_pb.ResourceHandleProto>;
  setResourceHandleValList(value: Array<resource_handle_pb.ResourceHandleProto>): void;
  addResourceHandleVal(value?: resource_handle_pb.ResourceHandleProto, index?: number): resource_handle_pb.ResourceHandleProto;

  clearVariantValList(): void;
  getVariantValList(): Array<VariantTensorDataProto>;
  setVariantValList(value: Array<VariantTensorDataProto>): void;
  addVariantVal(value?: VariantTensorDataProto, index?: number): VariantTensorDataProto;

  clearUint32ValList(): void;
  getUint32ValList(): Array<number>;
  setUint32ValList(value: Array<number>): void;
  addUint32Val(value: number, index?: number): number;

  clearUint64ValList(): void;
  getUint64ValList(): Array<number>;
  setUint64ValList(value: Array<number>): void;
  addUint64Val(value: number, index?: number): number;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TensorProto.AsObject;
  static toObject(includeInstance: boolean, msg: TensorProto): TensorProto.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TensorProto, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TensorProto;
  static deserializeBinaryFromReader(message: TensorProto, reader: jspb.BinaryReader): TensorProto;
}

export namespace TensorProto {
  export type AsObject = {
    dtype: types_pb.DataType,
    tensorShape?: tensor_shape_pb.TensorShapeProto.AsObject,
    versionNumber: number,
    tensorContent: Uint8Array | string,
    halfValList: Array<number>,
    floatValList: Array<number>,
    doubleValList: Array<number>,
    intValList: Array<number>,
    stringValList: Array<Uint8Array | string>,
    scomplexValList: Array<number>,
    int64ValList: Array<number>,
    boolValList: Array<boolean>,
    dcomplexValList: Array<number>,
    resourceHandleValList: Array<resource_handle_pb.ResourceHandleProto.AsObject>,
    variantValList: Array<VariantTensorDataProto.AsObject>,
    uint32ValList: Array<number>,
    uint64ValList: Array<number>,
  }
}

export class VariantTensorDataProto extends jspb.Message {
  getTypeName(): string;
  setTypeName(value: string): void;

  getMetadata(): Uint8Array | string;
  getMetadata_asU8(): Uint8Array;
  getMetadata_asB64(): string;
  setMetadata(value: Uint8Array | string): void;

  clearTensorsList(): void;
  getTensorsList(): Array<TensorProto>;
  setTensorsList(value: Array<TensorProto>): void;
  addTensors(value?: TensorProto, index?: number): TensorProto;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): VariantTensorDataProto.AsObject;
  static toObject(includeInstance: boolean, msg: VariantTensorDataProto): VariantTensorDataProto.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: VariantTensorDataProto, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): VariantTensorDataProto;
  static deserializeBinaryFromReader(message: VariantTensorDataProto, reader: jspb.BinaryReader): VariantTensorDataProto;
}

export namespace VariantTensorDataProto {
  export type AsObject = {
    typeName: string,
    metadata: Uint8Array | string,
    tensorsList: Array<TensorProto.AsObject>,
  }
}

