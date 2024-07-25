import { MigrationInterface, QueryRunner } from 'typeorm';

export class Users1721913202564 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
        -- Enable the uuid-ossp extension for UUID generation
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

        -- Create the users table
        CREATE TABLE "users" (
          "id" BIGSERIAL PRIMARY KEY,
          "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(),   
          "email" character varying(255) NOT NULL UNIQUE,
          "password" character varying(255) NOT NULL,    
          "remember_me_token" character varying(32) NOT NULL, 
          "verification_token" character varying(255),
          "verification_created_at" TIMESTAMPTZ,
          "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
          "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now()
        );

        -- Create a trigger function to update the updated_at column
        CREATE OR REPLACE FUNCTION update_updated_at_column()
        RETURNS TRIGGER AS $$
        BEGIN
            NEW.updated_at = now();
            RETURN NEW;
        END;
        $$ language 'plpgsql';

        -- Attach the trigger function to the users table
        CREATE TRIGGER update_users_updated_at
        BEFORE UPDATE ON "users"
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
      `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`, undefined);
  }
}
