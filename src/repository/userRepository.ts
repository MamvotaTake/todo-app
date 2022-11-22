import { NotFoundError } from "@takesure/common";
import BaseRepository from "./baseRepository";
import { User } from "./models/user";

class UserRepository extends BaseRepository{
    model: any

    getList(data: any) {
        return this.model.find()
    }

    async getById(id: string) {

        try {
            const result = await this.model.findById(id);
            if (!result) {
                throw new NotFoundError();
            }
            return result;
        } catch (err) {
            return { status: 400, message: err }

        }

    }

    async updateById(id: string, data: any) {

        try {
            const result = await this.model.findByIdAndUpdate(id, data, { new: true });
            if (!result) {
                throw new NotFoundError();
            }

            return result;

        } catch (err) {
            return { status: 400, message: err }
        }

    }

    async deleteById(id: string) {
        const result = await this.model.findByIdAndDelete(id)

        if (!result) {
            throw new NotFoundError();
        }
        return result;
    }

}

export default new UserRepository(User);