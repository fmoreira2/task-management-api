import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1742922989654 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "username" VARCHAR(255) NOT NULL,
                "password" VARCHAR(255) NOT NULL,               
                CONSTRAINT "PK_user_id" PRIMARY KEY ("id"),
                CONSTRAINT "user_un_username" UNIQUE ("username")
            );`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
         await queryRunner.query(`DROP TABLE IF EXISTS "user";`);
    }

}
