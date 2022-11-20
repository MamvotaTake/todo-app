import app from './app';
import { log } from './utils/Logger'


const start = async () => {

    app.listen(3000, ()=>{
        log.info("listening on port 3000");
    })
}

start();