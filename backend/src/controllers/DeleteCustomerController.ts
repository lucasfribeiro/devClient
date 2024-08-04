import { FastifyRequest, FastifyReply } from "fastify";
import { DeleteCutomerService } from "../services/DeleteCustomerService";

class DeleteCustomerController{
    async handle(request: FastifyRequest, reply: FastifyReply){
        const { id } = request.query as { id:string }

        const customerService = new DeleteCutomerService();

        const customer = await customerService.execute({ id })

        reply.send(customer);
    }

    
}

export { DeleteCustomerController }