import { ticketModel } from "../models/ticket.Model.js";

export default class TicketManager {

    constructor() {
        console.log('Working ticket with DB');
    };

    getTicketById = async (id) => {
        const result = await ticketModel.findById(id);
        return result;
    };

    createTicket = async (ticket) => {
        const result = await ticketModel.create(ticket);
        return result;
    };

    updateTicket = async (id, ticket) => {
        const result = await ticketModel.findByIdAndUpdate(id, ticket);
        return result;
    };

};