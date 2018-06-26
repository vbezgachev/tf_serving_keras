// package: tensorflow
// file: tensor_shape.proto

import * as jspb from "google-protobuf";

export class TensorShapeProto extends jspb.Message {
  clearDimList(): void;
  getDimList(): Array<TensorShapeProto.Dim>;
  setDimList(value: Array<TensorShapeProto.Dim>): void;
  addDim(value?: TensorShapeProto.Dim, index?: number): TensorShapeProto.Dim;

  getUnknownRank(): boolean;
  setUnknownRank(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TensorShapeProto.AsObject;
  static toObject(includeInstance: boolean, msg: TensorShapeProto): TensorShapeProto.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TensorShapeProto, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TensorShapeProto;
  static deserializeBinaryFromReader(message: TensorShapeProto, reader: jspb.BinaryReader): TensorShapeProto;
}

export namespace TensorShapeProto {
  export type AsObject = {
    dimList: Array<TensorShapeProto.Dim.AsObject>,
    unknownRank: boolean,
  }

  export class Dim extends jspb.Message {
    getSize(): number;
    setSize(value: number): void;

    getName(): string;
    setName(value: string): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Dim.AsObject;
    static toObject(includeInstance: boolean, msg: Dim): Dim.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Dim, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Dim;
    static deserializeBinaryFromReader(message: Dim, reader: jspb.BinaryReader): Dim;
  }

  export namespace Dim {
    export type AsObject = {
      size: number,
      name: string,
    }
  }
}

