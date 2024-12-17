import { getUserByToken } from '@libs/services/authService'
import { getTarefasByCategoria } from '@libs/services/tarefasService'
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { Handler } from 'src/errors/Handler'
import { appError, forbidden, ok } from 'src/utils/Returns'

const tarefasByCategoria: APIGatewayProxyHandler = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    const token = event.headers['Authorization']

    try {
        if (!token) return forbidden("Não autorizado.");

        const { categoria } = JSON.parse(event.body)
        
        const user = await getUserByToken(token)
        const tarefas = await getTarefasByCategoria(user.email, categoria)

        return ok('tarefas', tarefas)
    } catch (error) {
        return appError(error)
    }
}

export const handler = Handler(tarefasByCategoria)
