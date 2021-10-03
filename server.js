'use strict';

const exprees = require('express');
const server = exprees();

const cors = require('cors');
require('dotenv').config();
server.use(cors());
server.use(exprees.json());
const PORT = process.env.PORT

const mongoose = require('mongoose');
const MONGO_SERVER = process.env.MONGO_SERVER;

const {getFruitsController,
       addtoFavController,
       getFavController,
       deleteFavController,
       updateFavController} = require('./controllers/Fruits.controller')

const {seedFruit}= require('./models/fruits.model')

mongoose.connect(`${MONGO_SERVER}`,
                                { useNewUrlParser: true,
                                  useUnifiedTopology: true});


                                //    server.get('/seed-data',  (req,res)=>{
                                //     seedFruit();
                                //        res.json({
                                //         'message': 'book objects Created Successfully'
                                //        })}
                                //      );


//proof of life endpoint
server.get('/', (req,res)=>{
    res.send('server working!')
});

//get data from api 
server.get('/fruits',getFruitsController);

server.post('/addtoFav', addtoFavController);

server.get('/getFav',getFavController);

server.delete('/deleteFav/:id', deleteFavController);

server.put('/updateFav/:id',updateFavController);


server.listen(PORT, ()=>{
 console.log(`listeing to port ${PORT}`);
 mongoose.connect(`${MONGO_SERVER}`,{useNewUrlParser: true, useUnifiedTopology: true});

 const db = mongoose.connection;
 db.on('error', console.error.bind(console, 'connection error:'));
 db.once('open', function() {
 console.log("connected to db")
});
})

