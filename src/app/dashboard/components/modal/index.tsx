'use client'

import { use } from 'react'
import styles from './styles.module.scss'
import { X } from 'lucide-react'
import { OrderContext } from '@/providers/order'
import { calculateTotal } from '@/lib/helper'

export function ModalOrder() {

    const { onRequestClose, order, finishOrder } = use(OrderContext)
    return (
        <dialog className={styles.dialogContainer}>
            <section className={styles.dialogContent}>
                <button className={styles.dialogBack} onClick={onRequestClose}>
                    <X size={40} color='#ff3f4b' />
                </button>

                <article className={styles.container}>
                    <h2>Detalhes do pedido</h2>

                    <span className={styles.table}>
                        Mesa: <b>{order[0].order.table}</b>
                    </span>

                    {order[0].order?.name && (
                        <span className={styles.name}>
                            Nome da mesa: <b>{order[0].order.name}</b>
                        </span>
                    )}

                    {order.map(item => (
                        <section className={styles.item} key={item.id}>
                            <span>
                                Qtd: {item.amount} - <b>{item.product.name}</b> - R$ {parseFloat(item.product.price) * item.amount}
                            </span>
                            <span className={styles.description}>{item.product.description}</span>
                        </section>
                    ))}

                    <h3 className={styles.total}>Valor total: {calculateTotal(order)}</h3>

                    <button className={styles.buttonOrder} onClick={async () => await finishOrder(order[0].order_id)}>
                        Concluir pedido
                    </button>
                </article>
            </section>
        </dialog>
    )
}