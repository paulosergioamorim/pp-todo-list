import { getTarefasByTextMatching } from '@libs/services/tarefasService'
import { APIGatewayProxyHandler } from 'aws-lambda'
import { ok, badRequest } from 'src/utils/Returns'
import { Handler } from 'src/errors/Handler'

const pesquisarPorTexto: APIGatewayProxyHandler = async (event) => {
    try {
        const { email, searchText } = JSON.parse(event.body) //pega o email e a palavra-chave

        if (!email || !searchText) {
            return badRequest('O email e o texto de busca são obrigatórios!') //erro caso email ou palavra-chave n sejam disponibilizados
        }

        const tarefas = await getTarefasByTextMatching(email, searchText) //chama a funcao

        return ok('tarefas', tarefas) //tudo certo
    } catch (error) {
        return badRequest('Erro ao buscar tarefas!') //erro do cliente
    }
}

export const handler = Handler(pesquisarPorTexto)
