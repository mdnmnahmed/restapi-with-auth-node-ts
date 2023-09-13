import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import routers from './routers';
// import { MONGODB_URI } from './config/keys';

const app = express();

// Middlewares
dotenv.config();
app.use(cors({
    credentials: true
}));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());


//Connection With DataBase
// mongoose.connect(process.env.MONGODB_URI || MONGODB_URI,
//     {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         useFindAndModify: false
//     })
//     .then((data)=> console.log("Connected with DB."))
//     .catch((err) => console.log("Error Occured With DataBase: " + err));
const MONGODB_URI: string = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.qzgcd.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority`;
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);
mongoose.connection.on('error', (error: Error) => console.log("Error while connecting with DB: ", error))


const server = http.createServer(app);
server.listen(process.env.PORT || 5000, () => {
    console.log("Server Started.");
});