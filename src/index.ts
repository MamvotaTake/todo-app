import mongoose from 'mongoose';
import app from './app';
import { log } from './utils/Logger'


const start = async () => {

    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined!')
    }

    // if(!process.env.MONGO_URL) {
    //     throw new Error('MONGO_URL must be defined')
    // }

    try {
        await mongoose.connect(process.env.MONGODB_URL as string);
        log.info('Db Connected Successfully');
    } catch (err: any) {
        log.error(err);
    }

    app.listen(3000, ()=>{
        log.info("listening on port 3000");
    })
}

start();