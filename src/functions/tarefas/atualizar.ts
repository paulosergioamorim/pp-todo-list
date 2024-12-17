import { APIGatewayProxyHandler } from 'aws-lambda'
import { notFound, ok, appError } from 'src/utils/Returns'
import { Handler } from 'src/errors/Handler'
import { updateTarefa } from '@libs/services/tarefasService'
import { CriarTarefa } from '@libs/models/Tarefa'

const atualizarTarefa: APIGatewayProxyHandler = async (event) => {
    try {
        const { email, id, fieldsToUpdate }: { email: string; id: string; fieldsToUpdate: Partial<CriarTarefa> } = JSON.parse(event.body) // pega o email, id e oq vai atualizar no body
        
        const tarefaAtualizada = await updateTarefa(email, id, fieldsToUpdate) //atualiza a tarefa

        if (!tarefaAtualizada) {
            return notFound(`Tarefa com ID ${id} não encontrada!`) //erro caso a tarefa nao seja encontrada
        }

        return ok('mensagem', 'Tarefa atualizada com sucesso!') //atualizada

    } catch (error) {
        return appError(error) //erro de busca
    }
}

export const handler = Handler(atualizarTarefa)