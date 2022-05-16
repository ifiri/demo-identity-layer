import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1646568197779 implements MigrationInterface {
  name = 'init1646568197779';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "identities" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "created" TIMESTAMP NOT NULL DEFAULT now(),
                "updated" TIMESTAMP NOT NULL DEFAULT now(),
                "email" character varying NOT NULL,
                CONSTRAINT "UQ_e12e68fd99eabd42036b9b22469" UNIQUE ("email"),
                CONSTRAINT "PK_7b2f8cccf4ac6a2d7e6e9e8b1f6" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_e12e68fd99eabd42036b9b2246" ON "identities" ("email")
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP INDEX "public"."IDX_e12e68fd99eabd42036b9b2246"
        `);
    await queryRunner.query(`
            DROP TABLE "identities"
        `);
  }
}
