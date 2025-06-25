"use client"

import Link from 'next/link'
import styles from './styles.module.scss'
import Image from 'next/image'
import LogoImg from '/public/logo.svg'
import { LogOutIcon } from 'lucide-react'
import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'

export function Header() {
    const router = useRouter();

    async function handleLogOut() {
        deleteCookie('session', { path: '/' })

        router.replace('/')
    }
    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href={'/dashboard'}>
                    <text className={styles.title1}>Dev<text className={styles.title2}>Restaurante</text></text>
                </Link>

                <nav>
                    <Link href={'/dashboard/category'}>
                        Categoria
                    </Link>
                    <Link href={'/dashboard/product'}>
                        Produtos
                    </Link>
                    <form action={handleLogOut}>
                        <button type='submit'>
                            <LogOutIcon size={24} color='#fff' />
                        </button>
                    </form>
                </nav>
            </div>
        </header>
    )
}