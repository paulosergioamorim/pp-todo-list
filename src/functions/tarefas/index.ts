import { getUserByToken } from '@libs/services/authService'
import { getTarefasByEmail } from '@libs/services/tarefasService'
import { APIGatewayProxyHandler } from 'aws-lambda'
import { Handler } from 'src/errors/Handler'
import { appError, forbidden, ok } from 'src/utils/Returns'

const getTarefas: APIGatewayProxyHandler = async (event) => {
    const token = event.headers['Authorization']

    try {
        if (!token) return forbidden('Não autorizado.')

        const user = await getUserByToken(token)
        const tarefas = await getTarefasByEmail(user.email)

        return ok('tarefas', tarefas)
    } catch (error) {
        return appError(error)
    }
}

export const handler = Handler(getTarefas)
