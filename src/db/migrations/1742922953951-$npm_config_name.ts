import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1742922953951 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
        await queryRunner.query(`
            CREATE TABLE "task" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "title" VARCHAR(255) NOT NULL,
                "description" VARCHAR(255) NOT NULL,
                "status" VARCHAR(50) NOT NULL,
                expiration_date timestamp NOT NULL,
                CONSTRAINT "PK_task_id" PRIMARY KEY ("id")
            );`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS "task";`);
    }

}
