import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSessions1750791301052 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.createTable(new Table({
                name: "sessions",
                columns: [
                    {name: "id", type: "uuid", isPrimary: true, generationStrategy: "uuid", default: "uuid_generate_v4()"},
                    {name: "date", type: "timestamp"},
                    {name: "room", type: "varchar"},
                    { name: "created_at", type: "timestamp", default: "now()" },
                    { name: "updated_at", type: "timestamp", default: "now()" },
                ]
            }))
        }
    
        public async down(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.dropTable("sessions")
        }

}
