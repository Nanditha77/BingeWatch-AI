const mongoose = require('mongoose');

const connectDB = async () =>{
    try{
        await mongoose.connect('mongodb://localhost:27017/moviesuggestion')
        console.log('Contected to Database');
    }
    catch(eror){
        console.log(eror);
    }
}

module.exports = connectDB;