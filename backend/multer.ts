import multer from 'multer';
import path from 'path';
import {promises as fs} from 'fs';
import config from './config';
import {randomUUID} from 'crypto';

const imageStorage = multer.diskStorage({
  destination: async (req, file, callback) => {
    const destDir = path.join(config.publicPath, 'images');
    await fs.mkdir(destDir, {recursive: true});
    callback(null, config.publicPath);
  },
  filename: (req, file, callback) => {
    const extension = path.extname(file.originalname);
    const newFilename = randomUUID() + extension;
    callback(null, 'images/' + newFilename);
  }
});

export const imagesUpload = multer({storage: imageStorage});