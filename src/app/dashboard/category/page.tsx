import { api } from '@/services/app';
import styles from './styles.module.scss'
import { Button } from '@/app/dashboard/components/button'
import { getCookieServer } from '@/lib/cookieServer';
export default function Category() {

    async function handleRegisterCategoty(formData: FormData) {
        'use server'

        const name = formData.get('name')

        if(!name)return;

        const data = {
            name
        }

        const token = await getCookieServer()

        const respose = await api.post('category', data, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })

        console.log(respose);
        
    }
    return (
        <main className={styles.container}>
            <h1>Nova categoria</h1>

            <form action={handleRegisterCategoty} className={styles.form}>
                <input
                    type="text"
                    name='name'
                    placeholder="Nome da categoria, ex: 'Pizzas'"
                    required
                    className={styles.input}
                />

                <Button name='Cadastrar' />
            </form>
        </main>
    )
}