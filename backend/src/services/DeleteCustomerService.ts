import prismaClient from "../prisma"

interface DeleteCustomerProps{
    id: string
}

class DeleteCutomerService{
    async execute({ id }: DeleteCustomerProps){
        if(!id){
            throw new Error("Solicitação Inválida.")
        }

        const findCustomer = await prismaClient.customer.findFirst({
            where:{
                id: id
            }
        })

        if(!findCustomer){
            throw new Error("Cliente não encontrado.")
        }

        await prismaClient.customer.delete({
            where:{
                id: findCustomer.id
            }
        })

        return { message:"Excluído!" }
    }
}

export { DeleteCutomerService }