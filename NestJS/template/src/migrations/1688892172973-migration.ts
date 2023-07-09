import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1688892172973 implements MigrationInterface {
    name = 'Migration1688892172973'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("userId" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "hashedPassword" character varying NOT NULL, "accountType" character varying(255) NOT NULL, "lastLoggedIn" TIMESTAMP, CONSTRAINT "UQ_1f220358be6d5c7c177065caca1" UNIQUE ("email", "accountType"), CONSTRAINT "PK_8bf09ba754322ab9c22a215c919" PRIMARY KEY ("userId"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
