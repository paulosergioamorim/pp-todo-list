import { deleteTarefaById } from '@libs/services/tarefasService'
import { APIGatewayProxyHandler } from 'aws-lambda'
import { ok, appError, forbidden } from 'src/utils/Returns'
import { Handler } from 'src/errors/Handler'
import { getUserByToken } from '@libs/services/authService'

const deletarTarefa: APIGatewayProxyHandler = async (event) => {
    const token = event.headers['Authorization']
    if (!token) return forbidden('Não autorizado.')

    try {
        const user = await getUserByToken(token)
        const { id } = JSON.parse(event.body) as Record<string, string>

        await deleteTarefaById(user.email, id) //deleta a funcao do banco de dados

        return ok('mensagem', 'Tarefa deletada com sucesso.') //deletada
    } catch (error) {
        console.error('Erro ao deletar a tarefa:', error)
        return appError(error) //erro de busca
    }
}

export const handler = Handler(deletarTarefa)
