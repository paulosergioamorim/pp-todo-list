import { changeStateTarefa } from '@libs/services/tarefasService';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { Handler } from 'src/errors/Handler';
import { appError, ok } from 'src/utils/Returns';

const alteraEstado = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    try {
        const { email, id } = JSON.parse(event.body);

        if (!email || !id ) {
            throw new Error("Parâmetros inválidos: 'email' e 'id' são obrigatórios.");
        }

        await changeStateTarefa(email, id);

        return ok('Tarefa atualizada com sucesso!', { id });

    } catch (error) {
        return appError(error);
    }
}

export const handler = Handler(alteraEstado);
