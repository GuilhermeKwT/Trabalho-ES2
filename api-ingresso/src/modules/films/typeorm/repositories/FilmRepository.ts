import { EntityRepository, Repository } from "typeorm";
import Film from "../entities/Film";

@EntityRepository(Film)
export default class FilmRepository extends Repository<Film> {

    async findById(id: string): Promise<Film | undefined> {
        return this.findOne({ where: { id } });
    }

    async findByName(name: string): Promise<Film | undefined> {
        return this.findOne({ where: { name } });
    }
}