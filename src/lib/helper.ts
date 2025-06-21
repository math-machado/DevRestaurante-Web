import { OrderItemProps } from "@/providers/order";

export function calculateTotal(orders: OrderItemProps[]){
    return orders.reduce((total, item) => {
        const itemTotal = parseFloat(item.product.price) * item.amount;
        return total + itemTotal;
    }, 0)
}