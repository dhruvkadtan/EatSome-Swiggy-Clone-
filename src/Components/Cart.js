import { addItem, removeItem } from "../Utils/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { IMG_CDN_URL, MENU_IMG_CDN } from "../Utils/Constants";


const Cart = () => {

    const cartItems = useSelector(store => store.cart.items);
    const resDetails = useSelector(store => store.cart.resDetails);
    let totalPrice = 0;
    let gstCharges = 20;
    let platformFee = 5;
    let toPay = gstCharges + platformFee;
    console.log(cartItems)
    console.log(resDetails)   

    const orderedItems = new Map();
    cartItems.map((item) => {
        if(orderedItems.has(item.id)) {
            let _item = orderedItems.get(item.id)
            _item.count += 1
        } else {
            orderedItems.set(item.id , {item : item, count : 1});
        }
        let price = ( item.price ? item.price / 100 : item.defaultPrice / 100);
        totalPrice += price
    })

    const _orderedItems = Array.from(orderedItems);
    toPay += totalPrice;
    
    const dispatch =  useDispatch();

    const handleAddItem = (itemInfo) => {
      
        dispatch(addItem(itemInfo));
    }

    const handleRemoveItem = (item) => {
      dispatch(removeItem(item));
    }

    const handleItemCount  = (item , type) => {
        if(type === 'add') {
            handleAddItem(item)
          } else {
            handleRemoveItem(item);
          }
    }

    return(
        <div className="bg-gray-100 h-screen py-10 select-none">
            {
               cartItems.length > 0 ?
                (
                    <div className="bg-white mx-[25%] p-10" >
                            <Link to={"/restaurant/" + resDetails.id}>
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
                            </Link>
                            <div className="mt-8 ">
                                {
                                    _orderedItems.map((item) => {
                                        console.log(item)
                                        return(
                                            <div key={item[0]} className="w-full flex justify-between py-2 ">
                                               <div className="m-2 font-semibold text-slate-700 text-md w-4/12">{item[1].item.name}</div>
                                               <div className='flex justify-between border h-10 w-20 border-slate-300 p-1'>
                                                    <button onClick={() => handleItemCount(item[1].item, 'remove')} className="text-lg mb-1 text-gray-500">-</button>
                                                    <div className="flex-1 text-center mt-1  text-green-500">{item[1].count}</div>
                                                    <button onClick={() => handleItemCount(item[1].item, 'add')} className="text-lg mb-1  text-green-500">+</button> 
                                                </div>
                                                <div className='text-gray-500 font-semibold text-md w-4/12 float-right m-2 ml-10'>&#8377;{((item[1].item.price ? item[1].item.price / 100 : item[1].item.defaultPrice / 100) * item[1].count).toFixed(2)}</div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className='m-3'>
                                <div className='font-semibold text-slate-700'>Bill Details</div>
                                <div className='flex w-full justify-between font-light'>
                                    <div className='text-sm w-4/12'>Item Total</div>
                                    <div className="w-20">=</div>
                                    <div className="w-4/12">&#8377;{totalPrice.toFixed(2)}</div>
                                </div>
                                <div className='flex justify-between  font-light'>
                                    <div className='text-sm w-4/12 '>Platform Fee</div>
                                    <div className="w-20">=</div>
                                    <div className="w-4/12">&#8377;{platformFee.toFixed(2)}</div>
                                </div>
                                <div className='flex justify-between font-light'>
                                    <div className='text-sm w-4/12'>GST and Restaurant Charges</div>
                                    <div className="w-20">=</div>
                                    <div className="w-4/12">&#8377;{gstCharges.toFixed(2)}</div>
                                </div>
                                <div className="h-0.5 border border-500 bg-gray-500 mt-2"></div>
                                <div className='flex justify-between'>
                                    <div className='mt-1 font-bold text-slate-700  w-4/12'>TO PAY</div>
                                    <div className="w-20">=</div>
                                    <div className="w-4/12 text-slate-700">&#8377;{toPay.toFixed(2)}</div>
                            </div>
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