'use client'

import { getCookieClient } from '@/lib/cookieClient';
import { api } from '@/services/app';
import { useRouter } from 'next/navigation';
import { createContext, ReactNode, useState } from 'react'
import { toast } from 'sonner';

export interface OrderItemProps {
    id: string;
    amount: number;
    created_at: string;
    order_id: string;
    product_id: string;
    order: {
        id: string;
        table: number;
        status: boolean;
        draft: boolean;
        name: string | null;
    };
    product: {
        id: string;
        name: string;
        price: string;
        description: string;
        banner: string;
        category_id: string
    }
}

type OrderContextData = {
    isOpen: boolean;
    onRequestOpen: (order_id: string) => Promise<void>;
    onRequestClose: () => void;
    order: OrderItemProps[];
    finishOrder: (order_id: string) => Promise<void>;
}

type OrderProviderProps = {
    children: ReactNode;
}

export const OrderContext = createContext({} as OrderContextData)

export function OrderProvider({ children }: OrderProviderProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [order, setOrder] = useState<OrderItemProps[]>([])
    const router = useRouter();

    async function onRequestOpen(order_id: string) {
        const token = await getCookieClient()

        try {
            const response = await api.get('/order/detail', {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    order_id: order_id
                }
            })

            console.log(response.data);
            setOrder(response.data)

        } catch (error) {
            console.log(error);
        }

        setIsOpen(true)
    }

    function onRequestClose() {
        setIsOpen(false)
    }

    async function finishOrder(order_id: string) {
        const token = await getCookieClient()

        const data = {
            order_id: order_id
        }
        try {
            await api.put('/order/finish', data , {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        } catch (error) {
            console.log(error);
            toast.error('Erro ao finalizar o pedido')
            return;
        }

        toast.success('Pedido finalizado com sucesso')
        router.refresh();
        setIsOpen(false)
    }

    return (

        <OrderContext.Provider value={{ isOpen, onRequestClose, onRequestOpen, order, finishOrder }}>
            {children}
        </OrderContext.Provider >
    )
}