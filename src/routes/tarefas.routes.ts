export const tarefasRoutes = {
  listar: {
    handler: "src/functions/tarefas/index.handler",
    events: [
      {
        http: {
          path: "tarefas",
          method: "post",
          cors: false,
          // authorizer: {
          //   name: "authenticate",
          // },
        },
      },
    ],
  },
  criar: {
    handler: "src/functions/tarefas/criar.handler",
    events: [
      {
        http: {
          path: "tarefas/criar",
          method: "post",
          cors: false,
          // authorizer: {
          //   name: "authenticate",
          // },
        },
      },
    ],
  },
};
