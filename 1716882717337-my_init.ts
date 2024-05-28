import { MigrationInterface, QueryRunner } from "typeorm";

export class MyInit1716882717337 implements MigrationInterface {
    name = 'MyInit1716882717337'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "room" ("id" integer NOT NULL, "name" character varying(300) NOT NULL, "capacity" integer NOT NULL DEFAULT '0', "userId" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_c6d46db005d623e691b2fbcba23" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "room"`);
    }

}
