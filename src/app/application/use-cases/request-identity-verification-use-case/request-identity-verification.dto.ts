export enum RequestIdentityVerificationViaEnum {
  EMAIL = 'EMAIL',
}

export class RequestIdentityVerificationDto {
  id: string;
  via: RequestIdentityVerificationViaEnum;
}
