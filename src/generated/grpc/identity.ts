/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { util, configure } from 'protobufjs/minimal';
import * as Long from 'long';
import { Observable } from 'rxjs';
import { Metadata } from '@grpc/grpc-js';

export const protobufPackage = 'identity';

export interface Identity {
  id: string;
  email: string;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateIdentityInput {
  email: string;
}

export interface CreateIdentityOutput {
  success: boolean;
  identity?: Identity | undefined;
}

export interface RequestIdentityVerificationInput {
  id: string;
  via: RequestIdentityVerificationInput_RequestIdentityVerificationViaType;
}

export enum RequestIdentityVerificationInput_RequestIdentityVerificationViaType {
  EMAIL = 'EMAIL',
  UNRECOGNIZED = 'UNRECOGNIZED',
}

export interface RequestIdentityVerificationOutput {
  success: boolean;
  identity?: Identity | undefined;
}

export const IDENTITY_PACKAGE_NAME = 'identity';

export interface IdentityRpcClient {
  createIdentity(
    request: CreateIdentityInput,
    metadata?: Metadata
  ): Observable<CreateIdentityOutput>;

  requestIdentityVerification(
    request: RequestIdentityVerificationInput,
    metadata?: Metadata
  ): Observable<RequestIdentityVerificationOutput>;
}

export interface IdentityRpcController {
  createIdentity(
    request: CreateIdentityInput,
    metadata?: Metadata
  ):
    | Promise<CreateIdentityOutput>
    | Observable<CreateIdentityOutput>
    | CreateIdentityOutput;

  requestIdentityVerification(
    request: RequestIdentityVerificationInput,
    metadata?: Metadata
  ):
    | Promise<RequestIdentityVerificationOutput>
    | Observable<RequestIdentityVerificationOutput>
    | RequestIdentityVerificationOutput;
}

export function IdentityRpcControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'createIdentity',
      'requestIdentityVerification',
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcMethod('IdentityRpc', method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcStreamMethod('IdentityRpc', method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
  };
}

export const IDENTITY_RPC_SERVICE_NAME = 'IdentityRpc';

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
