import path from 'path';
import {CorsOptions} from 'cors';

const rootPath = __dirname;
const corsWhitelist = ['http://localhost:5173'];

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || corsWhitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

const config = {
  rootPath,
  publicPath: path.join(rootPath, 'public'),
  corsOptions,
  database: 'mongodb://localhost/redditForum',
};

export default config;