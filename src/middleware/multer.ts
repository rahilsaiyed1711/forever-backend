import multer from 'multer';
import path from 'path';
const storage = multer.diskStorage({
  // destination: function(res,file, cb){
  //   cb(null, "./uploads");
  // },
  filename: function (res, file, cb) {
    const suffix = `${Date.now()}-${Math.random() * 1e9}${path.extname(
      file.originalname
    )}`;
    cb(null, suffix);
  },
});

const upload = multer({
  storage: storage,
});

export default upload;
