export class CreateCustomerDto {
  readonly name: string;
  readonly email: string;
  readonly dateOfBirth: Date;
  readonly password: string;
}

export class UpdateCustomerDto {
  readonly name?: string;
  readonly email?: string;
  readonly dateOfBirth?: Date;
  readonly password?: string;
}
