import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1688826443577 implements MigrationInterface {
    name = 'Migration1688826443577'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lastLoggedIn" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lastLoggedIn" SET DEFAULT now()`);
    }

}
