import { deleteTarefaById } from '@libs/services/tarefasService'
import { APIGatewayProxyHandler } from 'aws-lambda'
import { ok, appError } from 'src/utils/Returns'
import { Handler } from 'src/errors/Handler'

const deletarTarefa: APIGatewayProxyHandler = async (event) => {
    try {
        const { email, id } = JSON.parse(event.body) //pega o emal do usuario e o id da tarefa no body

        await deleteTarefaById(email, id) //deleta a funcao do banco de dados

        return ok('mensagem', 'Tarefa deletada com sucesso.') //deletada
    } catch (error) {
        console.error('Erro ao deletar a tarefa:', error)
        return appError(error) //erro de busca
    }
}

export const handler = Handler(deletarTarefa)