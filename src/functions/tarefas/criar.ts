import { CriarTarefa } from "@libs/models/Tarefa";
import { getUserByToken } from "@libs/services/authService";
import { createTarefa } from "@libs/services/tarefasService";
import { APIGatewayProxyHandler } from "aws-lambda";
import { Handler } from "src/errors/Handler";
import { appError, forbidden, ok } from "src/utils/Returns";

const criarTarefa: APIGatewayProxyHandler = async (event) => {
    const token = event.headers['firebase-auth-token'];

    try {
        if (!token)
            return forbidden();

        const user = await getUserByToken(token);
        const tarefa = JSON.parse(event.body) as CriarTarefa;
        
        await createTarefa(user.email, tarefa);

        return ok("mensagem", "Sucesso!");
    } catch (error) {
        return appError(error);
    }
};

export const handler = Handler(criarTarefa);