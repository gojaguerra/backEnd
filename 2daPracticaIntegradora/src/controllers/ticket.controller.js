import { 
    getTicketById as getTicketByIdService, 
    createTicket as createTicketService
} from '../services/ticket.services.js'; 


const getTicketById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await getTicketByIdService(id);

        if(!result) {
            return res.status(404).send({ status: 'error', message: 'ticket not found' });
        }

        res.send({ status: 'success', result });
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message });
    }
}