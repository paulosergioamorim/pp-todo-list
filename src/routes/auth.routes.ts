export const authRoutes = {
    registrar: {
      handler:
        "src/functions/auth/registrar.handler",
      events: [
        {
          http: {
            path: "registrar",
            method: "post",
            cors: false,
            // authorizer: {
            //   name: "authenticate",
            // },
          },
        },
      ],
    },
  }