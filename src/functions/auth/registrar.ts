import { auth } from "@libs/firebase";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Handler } from "src/errors/Handler";
import { appError, ok } from "src/utils/Returns";

const registrar = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const { email, senha }: { email: string; senha: string } = JSON.parse(
      event.body
    );

    const userRecord = await auth.createUser({ email, password: senha });
    const token = await auth.createCustomToken(userRecord.uid);

    return ok("token", token);
  } catch (error) {
    return appError(error);
  }
};

export const handler = Handler(registrar);
