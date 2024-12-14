import { APIGatewayProxyResult } from 'aws-lambda'
import AppError from '../errors/AppError'
import BusinessError from '../errors/business/BusinessError'
import ClientError from '../errors/ClientError'
import InternalError from '../errors/internal/InternalError'
import NotFoundError from '../errors/NotFoundError'
import { HttpStatusCode } from 'src/enums/HttpStatusCode'

// Import all extensions
import './extensions/array'

const defaultHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Methods': '*',
}

export const ok = (
    dataName: string,
    data: unknown,
    headers?: Record<string, string | number | boolean>
): APIGatewayProxyResult => {
    return {
        statusCode: HttpStatusCode.OK,
        body: JSON.stringify({ [dataName]: data }),
        headers: { ...defaultHeaders, ...headers },
    }
}

export const noContent = (): APIGatewayProxyResult => {
    return {
        statusCode: HttpStatusCode.NO_CONTENT,
        body: '',
        headers: defaultHeaders,
    }
}

export const created = (
    dataName: string,
    data: unknown
): APIGatewayProxyResult => {
    return {
        statusCode: HttpStatusCode.CREATED,
        body: JSON.stringify({ [dataName]: data }),
        headers: defaultHeaders,
    }
}

export const appError = (appError: AppError): APIGatewayProxyResult => ({
    statusCode: appError.statusCode,
    body: JSON.stringify({
        type: appError.name,
        message: appError.message,
    }),
    headers: defaultHeaders,
})

/**
 *
 * @deprecated intead use a well defined error return
 */
export const errorMessage = (
    dataName: string,
    data: unknown,
    statusCode: HttpStatusCode
): APIGatewayProxyResult => {
    return {
        statusCode,
        body: JSON.stringify({ [dataName]: data }),
        headers: defaultHeaders,
    }
}

export const internalServerError = (): APIGatewayProxyResult =>
    appError(new InternalError(''))

export const alreadyExists = (message: string): APIGatewayProxyResult =>
    appError(new BusinessError(message))

export const notFound = (message: string): APIGatewayProxyResult =>
    appError(new NotFoundError(message))

export const badRequest = (message: string): APIGatewayProxyResult =>
    appError(new ClientError(message))

export const forbidden = (
    message = 'forbidden access'
): APIGatewayProxyResult =>
    appError(new AppError(message, HttpStatusCode.FORBIDDEN))
