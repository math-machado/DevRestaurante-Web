import { api } from "@/services/app";
import { Orders } from "./components/orders";
import { getCookieServer } from "@/lib/cookieServer";
import { OrderProps } from '@/lib/order.types';

async function getOrders(): Promise<OrderProps[] | []> {
    try {
        const token = await getCookieServer();

        const response = await api.get('/order', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        console.log(response.data);

        return response.data || []
    } catch (error) {
        console.log(error);
        return []
    }
}

export default async function Dashboard() {

    const orders = await getOrders()

    return (
        <>
            <Orders orders={orders}/>
        </>
    )
}