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
    listarByCategoria: {
        handler: 'src/functions/tarefas/tarefasByCategoria.handler',
        events: [
            {
                http: {
                    path: 'tarefasByCategoria',
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
    pesquisarPorTexto: {
        handler: 'src/functions/tarefas/pesquisarPorTexto.handler',
        events: [
            {
                http: {
                    path: 'tarefas/pesquisarPorTexto',
                    method: 'get',
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
