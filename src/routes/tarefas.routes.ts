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
    atualizar: {
        handler: 'src/functions/tarefas/atualizar.handler',
        events: [
            {
                http: {
                    path: 'tarefas/atualizar/{id}',
                    method: 'put',
                    cors: false,
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
    deletar: {
        handler: 'src/functions/tarefas/deletar.handler',
        events: [
            {
                http: {
                    path: 'tarefas/deletar',
                    method: 'delete',
                    cors: false,
                    // authorizer: {
                    //   name: "authenticate",
                    // },
                },
            },
        ],
    },
    pesquisarPorTexto: {
        handler: 'src/functions/tarefas/pesquisarPorTexto.handler',
        events: [
            {
                http: {
                    path: 'tarefas/pesquisarPorTexto',
                    method: 'post',
                    cors: false,
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
