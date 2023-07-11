import mongoose from 'mongoose';

const ticketCollection = 'ticket';

const ticketSchema = new mongoose.Schema({
    code: String,
    purchase_datetime: Date,
    amount: Number, 
    purchaser: String
});

export const ticketModel = mongoose.model(ticketCollection, ticketSchema);
