import { Categoria } from 'src/enums/Categoria'

export type Tarefa = {
    id: string
    nome: string
    descricao: string
    concluido: boolean
    categoria?: Categoria
}

export type CriarTarefa = Omit<Tarefa, 'id' | 'concluido'>
