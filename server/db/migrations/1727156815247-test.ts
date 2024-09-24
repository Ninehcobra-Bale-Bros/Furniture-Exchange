import { MigrationInterface, QueryRunner } from "typeorm";

export class Test1727156815247 implements MigrationInterface {
    name = 'Test1727156815247'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "email" character varying(255) NOT NULL, "emailVerified" boolean NOT NULL DEFAULT false, "password" character varying(255) NOT NULL, "firstName" character varying(255) NOT NULL, "lastName" character varying(255) NOT NULL, "sex" "public"."user_sex_enum" NOT NULL, "image" character varying, "phoneNumber" character varying(10) NOT NULL, "addressLine1" character varying(255), "addressLine2" character varying(255), "role" "public"."user_role_enum" NOT NULL DEFAULT 'buyer', "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
