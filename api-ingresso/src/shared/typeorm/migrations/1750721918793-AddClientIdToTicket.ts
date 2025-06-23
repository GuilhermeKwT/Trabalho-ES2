import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddClientIdToTicket1750721918793 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('tickets', 
            new TableColumn({
                name: 'clientId',
                type: 'uuid',
                isNullable: true
            })
        )
        await queryRunner.createForeignKey('tickets',
            new TableForeignKey({
                name: 'ClientTicket',
                columnNames: ['clientId'],
                referencedTableName: 'clients',
                referencedColumnNames: ['id'],
                onDelete: 'SET NULL'
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('tickets', 'ClientTicket');
        await queryRunner.dropColumn('tickets', 'clientId');
    }

}
