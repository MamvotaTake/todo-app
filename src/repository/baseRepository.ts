/** Base repository that will be extended with all repositories */
export default class BaseRepository {
    model: any;
    constructor(model: any){
        this.model = model;
    }

}