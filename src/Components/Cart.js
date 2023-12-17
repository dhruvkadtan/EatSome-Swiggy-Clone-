import { useSelector } from "react-redux";

const Cart = () => {

    const cart = useSelector(store => store.cart.items)

    return(
        <div>Cart Component
        {console.log(cart)}
        </div>
    )
}

export default Cart;