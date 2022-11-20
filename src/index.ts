import mongoose from 'mongoose';
import app from './app';
import { log } from './utils/Logger'


const start = async () => {

    try {
        await mongoose.connect('mongodb://root:password123@mongodb-primary:27017/');
        log.info('Db Connected Successfully');
    } catch (err: any) {
        log.error(err);
    }

    app.listen(3000, ()=>{
        log.info("listening on port 3000");
    })
}

start();