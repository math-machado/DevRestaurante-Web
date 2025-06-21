import Image from "next/image";
import logoImg from '/public/logo.svg'
import styles from '../page.module.scss'
import Link from "next/link";
import { api } from '@/services/app'
import { redirect } from "next/navigation";

export default function Signup() {

    async function handleRegister(formData: FormData) {
        'use server'

        const name = formData.get('name')
        const email = formData.get('email')
        const password = formData.get('password')

        if (!name || !email || !password) {
            return
        }

        try {
            await api.post('/users', {
                name,
                email,
                password
            })
        } catch (error) {
            console.log('error', error);
        }

        redirect('/')
    }

    return (
        <>
            <div className={styles.containerCenter}>
                <Image
                    src={logoImg}
                    alt='Logo da pizzaria'
                />


                <section className={styles.login}>

                    <h1>Criando sua conta</h1>

                    <form action={handleRegister}>
                        <input
                            type="text"
                            required
                            name='name'
                            placeholder='Digite seu nome'
                            className={styles.input}
                        />
                        <input
                            type="email"
                            required
                            name='email'
                            placeholder='Digite seu email'
                            className={styles.input}
                        />
                        <input
                            type="password"
                            required
                            name='password'
                            placeholder='********'
                            className={styles.input}
                        />

                        <button type='submit'>
                            Cadastrar
                        </button>
                    </form>

                    <Link href={'/'} className={styles.text}>
                        Há possui uma conta? Faça um login
                    </Link>
                </section>
            </div>
        </>
    )
}