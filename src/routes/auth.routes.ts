export const authRoutes = {
    registrar: {
        handler: 'src/functions/auth/registrar.handler',
        events: [
            {
                http: {
                    path: 'auth/registrar',
                    method: 'post',
                    cors: false,
                    // authorizer: {
                    //   name: "authenticate",
                    // },
                },
            },
        ],
    },
    logar: {
        handler: 'src/functions/auth/logar.handler',
        events: [
            {
                http: {
                    path: 'auth/logar',
                    method: 'post',
                    cors: false,
                    // authorizer: {
                    //   name: "authenticate",
                    // },
                },
            },
        ],
    },
}
