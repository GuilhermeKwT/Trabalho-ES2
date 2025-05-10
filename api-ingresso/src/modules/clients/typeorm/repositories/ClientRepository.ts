import { EntityRepository, Repository } from "typeorm";
import Client from "../entities/Client";

@EntityRepository(Client)
export default class ClientRepository extends Repository<Client> {

    async findById(id: string): Promise<Client | undefined> {
        return this.findOne({ where: { id } });
    }

    async findByEmail(email: string): Promise<Client | undefined> {
        return this.findOne({ where: { email } });
    }

    async findByName(name: string): Promise<Client | undefined> {
        return this.findOne({ where: { name } });
    }
}