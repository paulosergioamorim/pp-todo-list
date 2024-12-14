import { db } from '@libs/firebase'
import { CriarTarefa, Tarefa } from '@libs/models/Tarefa'
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    query,
    QueryDocumentSnapshot,
    QuerySnapshot,
    setDoc,
    where,
} from 'firebase/firestore'
import { Categoria } from 'src/enums/Categoria'

/**
 * Converte o tipo de documento do Firebase para o tipo do Typescript
 * @param doc
 * @returns tareja já convertida
 */
function parseDocumentDataToObject(doc: QueryDocumentSnapshot): Tarefa {
    return { id: doc.id, ...doc.data() } as Tarefa
}

/**
 * Converte uma lista de documentos do Firebase para um array com tipo do Typescript
 * @param snapshot
 * @returns array de objetos convertidos
 */
function parseQuerySnapshotToArray(snapshot: QuerySnapshot): Tarefa[] {
    return snapshot.docs.map(parseDocumentDataToObject)
}

/**
 * Busca todas as tarefas pertencentes a um usuário
 * @param email email do usuário
 * @returns lista de tarefas
 */
export async function getTarefasByEmail(email: string) {
    console.log('-> LOG: getTarefasByEmail\n')
    const snapshot = await getDocs(collection(db, 'usuarios', email, 'tarefas'))

    return parseQuerySnapshotToArray(snapshot)
}

/**
 * Busca todas as tarefas pertencentes a um usuário pela categoria
 * @param email email do usuário
 * @param categoria filtro de categoria
 * @returns lista de tarefas
 */
export async function getTarefasByCategoria(
    email: string,
    categoria: Categoria
) {
    console.log('-> LOG: getTarefasByCategoria\n')
    const snapshot = await getDocs(
        query(
            collection(db, 'usuarios', email, 'tarefas'),
            where('categoria', '==', categoria)
        )
    )

    return parseQuerySnapshotToArray(snapshot)
}

/**
 * Busca todas as tarefas pertencentes a um usuário por busca de palavras chave
 * nome da tarefa ou na descrição da tarefa
 * @param email email do usuário
 * @param searchText fragmento de texto a ser filtrado
 * @returns lista de tarefas
 */
export async function getTarefasByTextMatching(
    email: string,
    searchText: string
) {
    console.log('-> LOG: getTarefasByTextMatching\n')
    const searchNomeSnapshot = await getDocs(
        query(
            collection(db, 'usuarios', email, 'tarefas'),
            where('nome', '>=', searchText),
            where('nome', '<=', searchText + '\uf8ff')
        )
    )

    const searchDescricaoSnapshot = await getDocs(
        query(
            collection(db, 'usuarios', email, 'tarefas'),
            where('descricao', '>=', searchText),
            where('descricao', '<=', searchText + '\uf8ff')
        )
    )

    const tarefas = {
        ...parseQuerySnapshotToArray(searchNomeSnapshot),
        ...parseQuerySnapshotToArray(searchDescricaoSnapshot),
    }

    return tarefas
}

/**
 * Busca uma tarefa de um usuário com base no id (do Firebase)
 * @param email email do usuário
 * @param id id da tarefa
 * @returns tarefa encontrada
 */
export async function getTarefaById(email: string, id: string) {
    console.log('-> LOG: getTarefaById\n')
    const snapshot = await getDoc(doc(db, 'usuarios', email, 'tarefas', id))

    if (!snapshot.exists()) return null

    return parseDocumentDataToObject(snapshot)
}

/**
 * Cria uma tarefa para um usuário (não concluída por padrão)
 * @param email email do usuario
 * @param tarefa tarefa a ser criada
 */
export async function createTarefa(email: string, tarefa: CriarTarefa) {
    console.log('-> LOG: createTarefa\n')
    await addDoc(collection(db, 'usuarios', email, 'tarefas'), {
        ...tarefa,
        concluido: false,
    })
}

/**
 * Atualiza os dados de uma tarefa existente
 * @param email email do usuario
 * @param id id da tarefa
 * @param fieldsToUpdate campos (não obrigatórios) a serem atualizados
 */
export async function updateTarefa(
    email: string,
    id: string,
    fieldsToUpdate: Partial<CriarTarefa>
) {
    console.log('-> LOG: updateTarefa\n')
    let { id: _, ...existingTarefa } = await getTarefaById(email, id)

    if (!existingTarefa) return

    existingTarefa = { ...existingTarefa, ...fieldsToUpdate }

    await setDoc(doc(db, 'usuarios', email, 'tarefas', id), existingTarefa)
}

/**
 * Muda o estado de conclusão de uma tarefa (para concluido se ainda não
 * concluido, ou para não concluido caso o contrário)
 * @param email email do usuario
 * @param id id da tarefa
 */
export async function changeStateTarefa(email: string, id: string) {
    console.log('-> LOG: changeStateTarefa\n')
    const { id: _, ...existingTarefa } = await getTarefaById(email, id)

    existingTarefa.concluido = !existingTarefa.concluido

    await updateTarefa(email, id, existingTarefa)
}

/**
 * Delete permanentemente uma tarefa
 * @param email email do usuario
 * @param id id da tarefa
 */
export async function deleteTarefaById(email: string, id: string) {
    console.log('-> LOG: deleteTarefaById\n')
    await deleteDoc(doc(db, 'usuarios', email, 'tarefas', id))
}
