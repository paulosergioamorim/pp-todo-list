import { getUserByToken } from '@libs/services/authService'
import { getTarefasByEmail, getTarefasByTextMatching } from '@libs/services/tarefasService'
import { APIGatewayProxyHandler } from 'aws-lambda'
import { Handler } from 'src/errors/Handler'
import { appError, forbidden, ok, badRequest } from 'src/utils/Returns'
import { Categoria } from 'src/enums/Categoria'
import { getTarefasByCategoria } from '@libs/services/tarefasService'

const getTarefas: APIGatewayProxyHandler = async (event) => {
    const token = event.headers['Authorization']

    try {
        if (!token) return forbidden('Não autorizado!')

        const user = await getUserByToken(token)

        const { categoria, searchText } = Object.fromEntries(
            new URLSearchParams(event.queryStringParameters)
        )

        let tarefas
        let tarefasPorCategoria
        let tarefasPorTexto

        if (!categoria && !searchText) {
            tarefas = await getTarefasByEmail(user.email)

            return ok('tarefas', tarefas)
        }

        else if (categoria && searchText){
            if (!Object.values(Categoria).includes(categoria as Categoria)) {
                return badRequest('Categoria inválida!')
            }
            tarefasPorCategoria = await getTarefasByCategoria(user.email, categoria as Categoria)
            tarefasPorTexto = await getTarefasByTextMatching(user.email, searchText)
            tarefas = tarefasPorTexto.filter((x) => tarefasPorCategoria.find((y) => x.id === y.id))
            return ok('tarefas', tarefas)
        }

        else if (categoria){
            if (!Object.values(Categoria).includes(categoria as Categoria)) {
                return badRequest('Categoria inválida!')
            }
            tarefas = await getTarefasByCategoria(user.email, categoria as Categoria)
            return ok('tarefas', tarefas)
        }

        else if (searchText) {
            tarefas = await getTarefasByTextMatching(user.email, searchText)
            return ok('tarefas', tarefas)
        }

        return ok('tarefas', tarefas)

    } catch (error) {
        return appError(error)
    }
}

export const handler = Handler(getTarefas)
