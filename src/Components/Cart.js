import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { IMG_CDN_URL, MENU_IMG_CDN } from "../Utils/Constants";

const Cart = () => {

    const cartItems = useSelector(store => store.cart.items);
    const resDetails = useSelector(store => store.cart.resDetails);

    console.log(cartItems)
    console.log(resDetails)   
  

    return(
        <div className="bg-gray-100 pt-10">
            {
               cartItems.length > 0 ?
                (
                    <div className="bg-white mx-[25%] p-10" >
                       
                            <div className="flex">
                                <img
                                    className="w-20 h-20"
                                    src={IMG_CDN_URL + resDetails?.cloudinaryImageId}
                                    alt={resDetails?.name}
                                />
                                <div className="ml-10">
                                    <h2 className="text-slate-700 font-semibold text-lg">{resDetails?.name}</h2>
                                    <h3 className="text-gray-500 text-md">{resDetails?.areaName}</h3>
                                    <div className="mt-2 border-2 border-slate-700 w-10"></div>
                                </div>
                            </div>
                            <div className="mt-8">
                                {
                                    cartItems.map((item) => {
                                        console.log(item)
                                        return(
                                            <div className="flex">
                                               <div>{item.name}</div>
                                               <div className="px-10">
                                                    <button>+   </button>
                                                </div>
                                                <div>
                                                    {item.defaultPrice / 100}
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                       
                    </div>
                ) 
                : 
                (
                    <div>
                        <div className='flex flex-col justify-center items-center h-screen'>
                            <img
                                src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0"
                                alt='Your cart is empty'
                                className='w-72 h-64'
                            />
                            <div className='mt-5 text-slate-600 text-xl  font-bold'>Your cart is empty</div>
                            <div className='ml-10 justify-center text-gray-400'>You can go to the home page to view more restaurants</div>
                            <NavLink className="mt-8 bg-orange-500 px-4 py-2 text-white font-semibold" to="/">SEE RESTAURANTS NEAR YOU</NavLink>
                        </div> 
                    </div>
                )
            }
        </div>
        
    )
}

export default Cart;