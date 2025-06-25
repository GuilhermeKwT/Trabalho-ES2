import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddFilmIdToSessions1750806880148 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('sessions', 
            new TableColumn({
                name: 'filmId',
                type: 'uuid',
                isNullable: true
            })
        )
        await queryRunner.createForeignKey('sessions',
            new TableForeignKey({
                name: 'FilmTicket',
                columnNames: ['filmId'],
                referencedTableName: 'films',
                referencedColumnNames: ['id'],
                onDelete: 'SET NULL'
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('sessions', 'FilmSession');
        await queryRunner.dropColumn('sessions', 'filmId');
    }

}
