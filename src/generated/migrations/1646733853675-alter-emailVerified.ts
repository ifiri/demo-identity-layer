import { MigrationInterface, QueryRunner } from 'typeorm';

export class alterEmailVerified1646733853675 implements MigrationInterface {
  name = 'alterEmailVerified1646733853675';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "identities" ALTER COLUMN "emailVerified" SET DEFAULT false`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "identities" ALTER COLUMN "emailVerified" DROP DEFAULT`
    );
  }
}
