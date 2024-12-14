import type { AWS } from '@serverless/typescript'
import { authRoutes } from 'src/routes/auth.routes'
import { helloRoutes } from 'src/routes/hello.routes'
import { tarefasRoutes } from 'src/routes/tarefas.routes'

const serverlessConfiguration: AWS = {
    service: 'aws-serverless-template',
    useDotenv: true,
    frameworkVersion: '3',
    plugins: ['serverless-esbuild', 'serverless-offline'],
    provider: {
        name: 'aws',
        runtime: 'nodejs14.x',
        apiGateway: {
            minimumCompressionSize: 1024,
            shouldStartNameWithService: true,
        },
        environment: {
            AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
            NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
            API_KEY: '${env:API_KEY}',
            AUTH_DOMAIN: '${env:AUTH_DOMAIN}',
            PROJECT_ID: '${env:PROJECT_ID}',
            SOTRAGE_BUCKET: '${env:STORAGE_BUCKET}',
            MESSAGING_SENDER_ID: '${env:MESSAGING_SENDER_ID}',
            TYPE: '${env:TYPE}',
            PRIVATE_KEY_ID: '${env:PRIVATE_KEY_ID}',
            PRIVATE_KEY: '${env:PRIVATE_KEY}',
            CLIENT_EMAIL: '${env:CLIENT_EMAIL}',
            CLIENT_ID: '${env:CLIENT_ID}',
            AUTH_URI: '${env:AUTH_URI}',
            TOKEN_URI: '${env:TOKEN_URI}',
            AUTH_PROVIDER_X509_CERT_URL: '${env:AUTH_PROVIDER_X509_CERT_URL}',
            CLIENT_X509_CERT_URL: '${env:CLIENT_X509_CERT_URL}',
            UNIVERSE_DOMAIN: '${env:UNIVERSE_DOMAIN}',
        },
    },
    // import the function via paths
    functions: { ...helloRoutes, ...authRoutes, ...tarefasRoutes },
    package: { individually: true },
    custom: {
        esbuild: {
            bundle: true,
            minify: false,
            sourcemap: true,
            exclude: ['aws-sdk'],
            target: 'node14',
            define: { 'require.resolve': undefined },
            platform: 'node',
            concurrency: 10,
        },
    },
}

module.exports = serverlessConfiguration
