import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddFilmIdToTicket1750722767364 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.addColumn('tickets', 
                new TableColumn({
                    name: 'filmId',
                    type: 'uuid',
                    isNullable: true
                })
            )
            await queryRunner.createForeignKey('tickets',
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
            await queryRunner.dropForeignKey('tickets', 'FilmTicket');
            await queryRunner.dropColumn('tickets', 'filmId');
        }

}
