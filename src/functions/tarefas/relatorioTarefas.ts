import { getUserByToken } from '@libs/services/authService'
import { getTarefasByEmail } from '@libs/services/tarefasService'
import { APIGatewayProxyHandler } from 'aws-lambda'
import { Handler } from 'src/errors/Handler'
import { appError, ok } from 'src/utils/Returns'

const relatorioTarefas: APIGatewayProxyHandler = async (event) => {
    const token = event.headers['firebase-auth-token']

    try {
        let totalTarefas = 0;
        let concluidas = 0;
        const categorias: Record<string, number> = {};

        if (!token) return ok('tarefas', [])

        const user = await getUserByToken(token)
        const tarefas = await getTarefasByEmail(user.email)

        for (const t of tarefas) {
            totalTarefas++;
            if (t.concluido) concluidas++;
            if (t.categoria) {
                categorias[t.categoria] = (categorias[t.categoria] || 0) + 1;
            }
        }

        const relatorio = {
            total: totalTarefas,
            concluidas: concluidas,
            categorias: categorias
        };

        return ok('relatorio', relatorio);
    } catch (error) {
        return appError(error)
    }
}

export const handler = Handler(relatorioTarefas)