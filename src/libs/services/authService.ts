import { auth } from '@libs/firebase'
import { admin } from '@libs/firebase-admin'
import {
    createUserWithEmailAndPassword,
    signInWithCustomToken,
    signInWithEmailAndPassword,
} from 'firebase/auth'

async function createCustomToken(uid: string) {
    console.log('-> LOG: createCustomToken\n')

    return await admin.createCustomToken(uid)
}

/**
 * Verifica é possível realizar login, e retorna um token gerado
 * @param email
 * @param password
 * @returns token gerado ou null caso não for possível relizar login
 */
export async function login(
    email: string,
    password: string
): Promise<string | null> {
    console.log('-> LOG: login\n')
    const { user } = await signInWithEmailAndPassword(auth, email, password)

    if (!user) return null

    return await createCustomToken(user.uid)
}

/**
 * Cria um usuário com e-mail e senha, e retorna um token gerado
 * @param email
 * @param password
 * @returns token gerado ou null caso não for possível criar o usuário
 */
export async function createUser(
    email: string,
    password: string
): Promise<string | null> {
    console.log('-> LOG: createUser\n')
    const { user } = await createUserWithEmailAndPassword(auth, email, password)

    if (!user) return null

    return await createCustomToken(user.uid)
}

/**
 * Valida um token customizável gerado pelo próprio servidor
 * @param token token customizável a ser validado
 * @returns usuário atrelado ao token
 */
export async function getUserByToken(token: string) {
    console.log('-> LOG: getUserByToken\n')
    const { user } = await signInWithCustomToken(auth, token)

    return user
}
