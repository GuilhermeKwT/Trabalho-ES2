import { EntityRepository, Repository } from "typeorm";
import Session from "../entities/Session";

@EntityRepository(Session)
export default class SessionRepository extends Repository<Session> {

    async findById(id: string): Promise<Session | undefined> {
        return this.findOne({ where: { id } });
    }
}