import { MigrationInterface, QueryRunner } from "typeorm";

export class MyInit1716881965338 implements MigrationInterface {
    name = 'MyInit1716881965338'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "item" ("id" integer NOT NULL, "name" character varying(300) NOT NULL, "capacity" integer NOT NULL DEFAULT '0', "userId" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_d3c0c71f23e7adcf952a1d13423" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "item"`);
    }

}
