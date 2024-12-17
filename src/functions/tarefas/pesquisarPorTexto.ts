import { getTarefasByTextMatching } from '@libs/services/tarefasService'
import { APIGatewayProxyHandler } from 'aws-lambda'
import { ok, badRequest, forbidden } from 'src/utils/Returns'
import { Handler } from 'src/errors/Handler'
import { getUserByToken } from '@libs/services/authService'

const pesquisarPorTexto: APIGatewayProxyHandler = async (event) => {
    const token = event.headers['Authorization']

    try {
        if (!token) return forbidden('Não autorizado.')

        const user = await getUserByToken(token)

        const { searchText } = Object.fromEntries(
            new URLSearchParams(event.queryStringParameters)
        )

        if (!searchText) return badRequest('O texto de busca é obrigatório!') //erro caso palavra-chave não seja disponibilizada

        const tarefas = await getTarefasByTextMatching(user.email, searchText) //chama a funcao

        return ok('tarefas', tarefas) //tudo certo
    } catch (error) {
        return badRequest('Erro ao buscar tarefas!') //erro do cliente
    }
}

export const handler = Handler(pesquisarPorTexto)
