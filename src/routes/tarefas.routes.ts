export const tarefasRoutes = {
    listar: {
        handler: 'src/functions/tarefas/index.handler',
        events: [
            {
                http: {
                    path: 'tarefas',
                    method: 'post',
                    cors: false,
                    // authorizer: {
                    //   name: "authenticate",
                    // },
                },
            },
        ],
    },
    listarByCategoria: {
        handler: 'src/functions/tarefas/tarefasByCategoria.handler',
        events: [
            {
                http: {
                    path: 'tarefasByCategoria',
                    method: 'post',
                    cors: false,
                    // authorizer: {
                    //   name: "authenticate",
                    // },
                },
            },
        ],
    },
    criar: {
        handler: 'src/functions/tarefas/criar.handler',
        events: [
            {
                http: {
                    path: 'tarefas/criar',
                    method: 'post',
                    cors: false,
                    // authorizer: {
                    //   name: "authenticate",
                    // },
                },
            },
        ],
    },
    alteraEstado: {
        handler: 'src/functions/tarefas/alteraEstado.handler',
        events: [
            {
                http: {
                    path: 'tarefas/alteraEstado',
                    method: 'patch',
                    cors: false,
                    // authorizer: {
                    //   name: "authenticate",
                    // },
                },
            },
        ],
    },
    relatorioTarefas: {
        handler: 'src/functions/tarefas/relatorioTarefas.handler',
        events: [
            {
                http: {
                    path: 'tarefas/relatorioTarefas',
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
