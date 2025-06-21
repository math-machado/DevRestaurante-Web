'use client'

import { ChangeEvent, useState } from 'react'
import styles from './styles.module.scss'
import { UploadCloud } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/app/dashboard/components/button'
import { api } from '@/services/app'
import { getCookieClient } from '@/lib/cookieClient'
import { toast } from 'sonner'

interface Categories {
    categories: {
        id: string,
        name: string
    }[]
}

export function Form({ categories }: Categories) {
    const [image, setImage] = useState<File>()
    const [previewImage, setPreviewImage] = useState('')

    function handleFile(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files[0]) {
            const image = e.target.files[0]

            if (image.type !== 'image/png' && image.type !== 'image/jpeg') {
                console.log('Formato da imagem invalido');
                return;
            }

            setImage(image)
            setPreviewImage(URL.createObjectURL(image))

            console.log(URL.createObjectURL(image));

        }
    }

    async function handleRegisterProduct(formData: FormData) {
        const category = formData.get('category')
        const name = formData.get('name')
        const price = formData.get('price')
        const description = formData.get('description')

        if (!name || !category || !price || !description || !image) {
            toast.warning('Preencha todos os campos')
            return;
        }

        const data = new FormData();

        data.append('name', name)
        data.append('price', price)
        data.append('category_id', categories[Number(category)].id)
        data.append('description', description)
        data.append('file', image)

        const token = await getCookieClient()

        await api.post('/product', data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .catch((err) => {
                console.log('error:', err);
                toast.error('Falha a cadastrar o produto')
                return;
            })

        toast.success('Produto cadastrado com sucesso')
        setPreviewImage('')


    }

    return (
        <main className={styles.container}>
            <h1>Novo produto</h1>

            <form action={handleRegisterProduct} className={styles.form}>
                <label className={styles.labelImage}>
                    <span>
                        <UploadCloud size={30} color='#fff' />
                    </span>

                    <input
                        type="file"
                        accept='image/png, image/jpeg'
                        required
                        onChange={handleFile}
                    />

                    {previewImage && (
                        <Image
                            alt='Foto de preview'
                            src={previewImage}
                            className={styles.preview}
                            fill={true}
                            quality={100}
                            priority={true}
                        />
                    )}

                </label>

                <select name="category">
                    {categories.map((category, index) => (
                        <option key={category.id} value={index}>
                            {category.name}
                        </option>
                    ))}
                </select>

                <input
                    type="text"
                    name='name'
                    placeholder='Digite o nome do produto'
                    required
                    className={styles.input}
                />

                <input
                    type="text"
                    name='price'
                    placeholder='Preço do produto'
                    required
                    className={styles.input}
                />

                <textarea
                    className={styles.input}
                    placeholder='Digite a descrição do produto'
                    required
                    name='description'
                ></textarea>

                <Button name='Cadastrar novo produto' />

            </form>
        </main>
    )
}