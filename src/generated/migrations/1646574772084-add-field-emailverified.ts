import { MigrationInterface, QueryRunner } from 'typeorm';

export class addFieldEmailverified1646574772084 implements MigrationInterface {
  name = 'addFieldEmailverified1646574772084';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "identities" ADD "emailVerified" boolean NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "identities" DROP COLUMN "emailVerified"`
    );
  }
}
