import { createUser } from '@libs/services/authService'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { Handler } from 'src/errors/Handler'
import { appError, ok } from 'src/utils/Returns'

const registrarHandle = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    try {
        const { email, senha } = JSON.parse(event.body) as Record<
            string,
            string
        >

        const token = await createUser(email, senha)

        if (!token) return ok('mensagem', 'Não foi possível se cadastrar')

        return ok('mensagem', 'Sucesso!', { 'Authorization': token })
    } catch (error) {
        return appError(error)
    }
}

export const handler = Handler(registrarHandle)
