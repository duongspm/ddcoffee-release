import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import getPosts from './routers/posts.js';
import mongoose from 'mongoose';

const URI = 'mongodb+srv://admin:Admin@cluster0.j9cco.mongodb.net/?retryWrites=true&w=majority';

const app = express();

const PORT = process.env.port || 5000;
app.use(bodyParser.json({limit: '30md'}));
app.use(bodyParser.urlencoded({extended: true, limit: '30mb'}));
app.use(cors());

app.use('/getPosts',getPosts)

mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log("Ket noi thanh cong toi MongoDB");
    app.listen(PORT, () => {
        console.log(`server is running on port ${PORT}`);
    })
}).catch(err => {
    console.log("err", err)
})

