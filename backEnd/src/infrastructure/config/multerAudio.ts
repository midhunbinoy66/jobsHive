
import multer from 'multer'
import path from 'path'

const storage: multer.StorageEngine = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname,'../../../audios'))
    },
    filename:(req,file,cb)=>{
        const name = Date.now().toString()+'-'+file.originalname.split(' ').join('-');
        cb(null,name);
    }
});

export const uploadAudio = multer({storage});