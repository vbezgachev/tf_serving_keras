// package: tensorflow
// file: resource_handle.proto

import * as jspb from "google-protobuf";

export class ResourceHandleProto extends jspb.Message {
  getDevice(): string;
  setDevice(value: string): void;

  getContainer(): string;
  setContainer(value: string): void;

  getName(): string;
  setName(value: string): void;

  getHashCode(): number;
  setHashCode(value: number): void;

  getMaybeTypeName(): string;
  setMaybeTypeName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ResourceHandleProto.AsObject;
  static toObject(includeInstance: boolean, msg: ResourceHandleProto): ResourceHandleProto.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ResourceHandleProto, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ResourceHandleProto;
  static deserializeBinaryFromReader(message: ResourceHandleProto, reader: jspb.BinaryReader): ResourceHandleProto;
}

export namespace ResourceHandleProto {
  export type AsObject = {
    device: string,
    container: string,
    name: string,
    hashCode: number,
    maybeTypeName: string,
  }
}

