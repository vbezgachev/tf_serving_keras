// package: tensorflow.serving
// file: model.proto

import * as jspb from "google-protobuf";

export class Int64Value extends jspb.Message {
  getValue(): number;
  setValue(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Int64Value.AsObject;
  static toObject(includeInstance: boolean, msg: Int64Value): Int64Value.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Int64Value, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Int64Value;
  static deserializeBinaryFromReader(message: Int64Value, reader: jspb.BinaryReader): Int64Value;
}

export namespace Int64Value {
  export type AsObject = {
    value: number,
  }
}

export class ModelSpec extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  hasVersion(): boolean;
  clearVersion(): void;
  getVersion(): Int64Value | undefined;
  setVersion(value?: Int64Value): void;

  getSignatureName(): string;
  setSignatureName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ModelSpec.AsObject;
  static toObject(includeInstance: boolean, msg: ModelSpec): ModelSpec.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ModelSpec, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ModelSpec;
  static deserializeBinaryFromReader(message: ModelSpec, reader: jspb.BinaryReader): ModelSpec;
}

export namespace ModelSpec {
  export type AsObject = {
    name: string,
    version?: Int64Value.AsObject,
    signatureName: string,
  }
}

