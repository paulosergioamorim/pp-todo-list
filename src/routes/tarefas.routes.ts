export const tarefasRoutes = {
    listar: {
        handler: 'src/functions/tarefas/index.handler',
        events: [
            {
                http: {
                    path: 'tarefas',
                    method: 'get',
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
                },
            },
        ],
    },
    atualizar: {
        handler: 'src/functions/tarefas/atualizar.handler',
        events: [
            {
                http: {
                    path: 'tarefas/atualizar',
                    method: 'put',
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
                    method: 'get',
                },
            },
        ],
    },
}
