const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
    genre:{type:String},
    language:{type:String},
    mood:{type:String},
    recommendations:{type:Array}
})

const Ticket = mongoose.model('searchmovie',TicketSchema) ;//register karthe hai schema ko

module.exports= Ticket