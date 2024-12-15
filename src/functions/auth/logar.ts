import { login } from '@libs/services/authService'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { Handler } from 'src/errors/Handler'
import { appError, notFound, ok } from 'src/utils/Returns'

async function logar(
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
    try {
        const { email, senha } = JSON.parse(event.body) as Record<
            string,
            string
        >

        const token = await login(email, senha)

        if (!token) return notFound('Não foi possível realizar login')

        return ok('mensagem', 'Sucesso!', { 'firebase-auth-token': token })
    } catch (error) {
        return appError(error)
    }
}

export const handler = Handler(logar)
