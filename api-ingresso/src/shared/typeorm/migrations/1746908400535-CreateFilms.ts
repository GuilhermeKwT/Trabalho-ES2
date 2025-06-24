import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateFilms1746908400535 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "films",
            columns: [
                {name: "id", type: "uuid", isPrimary: true, generationStrategy: "uuid", default: "uuid_generate_v4()"},
                { name: "name", type: "varchar" },
                { name: "genres", type: "varchar" },
                { name: "directors", type: "varchar" },
                { name: "summary", type: "varchar" },
                { name: "banner", type: "varchar", isNullable: true },
                { name: "release_date", type: "date", isNullable: true },
                { name: "created_at", type: "timestamp", default: "now()" },
                { name: "updated_at", type: "timestamp", default: "now()" },
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("films")
    }

}
