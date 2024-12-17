import { APIGatewayProxyHandler } from 'aws-lambda'
import { notFound, ok, appError, forbidden } from 'src/utils/Returns'
import { Handler } from 'src/errors/Handler'
import { updateTarefa } from '@libs/services/tarefasService'
import { CriarTarefa } from '@libs/models/Tarefa'
import { getUserByToken } from '@libs/services/authService'

const atualizarTarefa: APIGatewayProxyHandler = async (event) => {
    const token = event.headers['Authorization']

    try {
        if (!token) return forbidden('Não autorizado.')

        const user = await getUserByToken(token)

        const { id } = JSON.parse(event.body) as Record<string, string>
        const fieldsToUpdate = JSON.parse(event.body) as Partial<CriarTarefa>

        const tarefaAtualizada = await updateTarefa(
            user.email,
            id as string,
            fieldsToUpdate as Partial<CriarTarefa>
        ) //atualiza a tarefa

        if (!tarefaAtualizada)
            return notFound(`Tarefa com ID ${id} não encontrada!`) //erro caso a tarefa nao seja encontrada

        return ok('mensagem', 'Tarefa atualizada com sucesso!') //atualizada
    } catch (error) {
        return appError(error) //erro de busca
    }
}

export const handler = Handler(atualizarTarefa)
