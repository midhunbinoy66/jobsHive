import { createServer } from "./infrastructure/config/app";
import { connectDb } from "./infrastructure/config/db";
import http from 'http'

const PORT  = process.env.PORT || 3000

const app = createServer();

connectDb().then(
    ()=>{
        if(app){
            const server  = http.createServer(app);
            server.listen(PORT,()=>console.log('connected and listening ....'))
        }else{
            throw Error('app is undefined...')
        }
    }
)