import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddSessionIdToTickets1750806975618 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('tickets', 
            new TableColumn({
                name: 'sessionId',
                type: 'uuid',
                isNullable: true
            })
        )
        await queryRunner.createForeignKey('tickets',
            new TableForeignKey({
                name: 'SessionTicket',
                columnNames: ['sessionId'],
                referencedTableName: 'sessions',
                referencedColumnNames: ['id'],
                onDelete: 'SET NULL'
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('tickets', 'SessionTicket');
        await queryRunner.dropColumn('tickets', 'sessionId');
    }

}
