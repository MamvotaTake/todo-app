import { NotFoundError } from "@takesure/common";
import BaseRepository from "./baseRepository";
import { Todo } from "./models/todo";

class TodoRepository extends BaseRepository {
    model: any;

/**
 * Description - getting all objects
 * @param {any} data
 * @returns {object} - list of all objects
 */
    getList(data: any) {
        return this.model.find()
    }

/**
 * Description - get object by id
 * if the id is invalid, then catch will return 400 error
 * @param {string} id
 * @returns {object} - single object by id
 */
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

/**
 * Description - update object by id
 * if the id is invalid, then catch will return 400 error
 * @param {string} id
 * @param {any} data
 * @returns {object} - object that was updated
 */
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

/**
 * Description - delete object by id
 * @param {string} id
 * @returns {null} 
 */
    async deleteById(id: string) {
        const result = await this.model.findByIdAndDelete(id)

        if (!result) {
            throw new NotFoundError();
        }
        return result;
    }



}

export default new TodoRepository(Todo)