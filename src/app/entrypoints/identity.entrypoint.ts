import { Metadata } from '@grpc/grpc-js';
import { Controller, Logger } from '@nestjs/common';

import {
  CreateIdentityOutput,
  CreateIdentityInput,
  IdentityRpcController,
  IdentityRpcControllerMethods,
  RequestIdentityVerificationInput,
  RequestIdentityVerificationOutput,
} from '../../generated/grpc/identity';
import { CreateIdentityUseCase } from '../application/use-cases/create-identity-use-case/create-identity.use-case';
import {
  RequestIdentityVerificationDto,
  RequestIdentityVerificationViaEnum,
} from '../application/use-cases/request-identity-verification-use-case/request-identity-verification.dto';
import { RequestIdentityVerificationUseCase } from '../application/use-cases/request-identity-verification-use-case/request-identity-verification.use-case';

@IdentityRpcControllerMethods()
@Controller()
export class IdentityEntrypoint implements IdentityRpcController {
  private readonly logger = new Logger(IdentityEntrypoint.name);

  constructor(
    private readonly createIdentityUseCase: CreateIdentityUseCase,
    private readonly verifyIdentityUseCase: RequestIdentityVerificationUseCase
  ) {}

  async createIdentity(
    request: CreateIdentityInput,
    metadata?: Metadata
  ): Promise<CreateIdentityOutput> {
    try {
      const result = await this.createIdentityUseCase.execute(request);

      if (result.isFailure) {
        return {
          success: false,
        };
      }

      return {
        success: true,
        identity: result.getResult().toObject(),
      };
    } catch (err) {
      this.logger.error(err);
      return {
        success: false,
      };
    }
  }

  async requestIdentityVerification(
    request: RequestIdentityVerificationInput,
    metadata?: Metadata
  ): Promise<RequestIdentityVerificationOutput> {
    try {
      const verifyIdentityDto = new RequestIdentityVerificationDto();
      verifyIdentityDto.id = request.id;
      verifyIdentityDto.via =
        request.via as unknown as RequestIdentityVerificationViaEnum;

      const result = await this.verifyIdentityUseCase.execute(
        verifyIdentityDto
      );

      if (result.isFailure) {
        return {
          success: false,
        };
      }

      return {
        success: true,
        identity: result.getResult().toObject(),
      };
    } catch (err) {
      this.logger.error(err);
      return {
        success: false,
      };
    }
  }
}
