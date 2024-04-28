import { Server, Socket } from "socket.io";
import { createServer } from "./infrastructure/config/app";
import { connectDb } from "./infrastructure/config/db";
import http from 'http'
import { IChatReqs } from "./application/interfaces/types/chat";
import { chatUseCase } from "./infrastructure/utils/controllers";

const PORT  = process.env.PORT || 3000

const app = createServer();

connectDb().then(
    ()=>{
        if(app){
            const server  = http.createServer(app);
            const io = new Server(server,{
                cors:{
                    origin:[process.env.CORS_URI as string],
                    methods:['GET','POST']
                },
            })

            const userSockets = new Map<string,string>();
            
            io.on('connection',(socket:Socket)=>{
                const id = socket.handshake.query.id as string
                userSockets.set(id,socket.id);
                socket.on('send-message',async(chatData:IChatReqs)=>{
                    let recepientId:string;
                    if(chatData.sender ==='User'){
                        recepientId = chatData.employerId ?? chatData.adminId as string
                    }else if(chatData.sender ==='Employer'){
                        recepientId = chatData.userId ?? chatData.adminId as string
                    }else{
                        recepientId = chatData.userId ?? chatData.employerId as string
                    }

                    const savedData = await  chatUseCase.sendMessage(chatData)
                    socket.to(userSockets.get(recepientId) as string).emit('recieve-message',savedData);
                });


                socket.on('typing',(data:{name:string,sender:string,reciever:string})=>{
                    const recepientId =data.reciever;
                    socket.to(userSockets.get(recepientId) as string).emit('typing',data);
                });

                socket.on('disconnect',()=>{
                    userSockets.delete(id);
                })

            })


            server.listen(PORT,()=>console.log('connected and listening ....'))
        }else{
            throw Error('app is undefined...')
        }
    }
)