import { getUserByToken } from '@libs/services/authService'
import { changeStateTarefa } from '@libs/services/tarefasService'
import {
    APIGatewayProxyEvent,
    APIGatewayProxyResult,
    APIGatewayProxyHandler,
} from 'aws-lambda'
import { Handler } from 'src/errors/Handler'
import { appError, forbidden, ok } from 'src/utils/Returns'

const alteraEstado: APIGatewayProxyHandler = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    const token = event.headers['Authorization']

    try {
        const { id } = JSON.parse(event.body) as Record<string, string>
        const user = await getUserByToken(token)

        if (!user || !id) {
            return forbidden('Não autorizado.')
        }

        await changeStateTarefa(user.email, id)

        return ok('mensagem', 'Tarefa atualizada com sucesso!')
    } catch (error) {
        return appError(error)
    }
}

export const handler = Handler(alteraEstado)
