import { useDispatch, useSelector } from "react-redux";
import { MENU_IMG_CDN } from "../Utils/Constants";
import { addItem ,setResDetails ,removeItem , clearCart} from "../Utils/CartSlice";
import React, { useEffect, useState } from "react";
import Modal from "./Modal";


const Item = ({resDetails,item}) => {
    
    let dispatch = useDispatch();
    
    const cartItems = useSelector(store => store.cart.items);
    const cartResDetails = useSelector(store => store.cart.resDetails)
   
    const [isResSame, setIsResSame] = useState(true);
    const [itemAddCount , setItemAddCount] = useState(0)
    const [itemToAdd, setItemToAdd] = useState({});

    useEffect(() => {
     
        let itemsCount = 0;
        cartItems.forEach((cartItem) => {
            if(cartItem.id === item?.card?.info?.id) {
                itemsCount += 1;
            }   
            setItemAddCount(itemsCount);
        });
    
    }, [cartItems, item.id])

    const handleAdd = (item) => {
        
       if(Object.keys(cartResDetails).length === 0) {
        
        setItemAddCount(itemAddCount + 1);
        dispatch(setResDetails(resDetails))
        dispatch(addItem(item))
       } else {
        if(cartResDetails?.id && (cartResDetails?.id == resDetails.id)) {
           
            setItemAddCount(itemAddCount + 1)
            dispatch(addItem(item))
            
        } else {
           
            setIsResSame(false);
            setItemToAdd(item);
        }
       }
      
    }

    const handleRemoveItem = (item) => {
        setItemAddCount(itemAddCount - 1);
        dispatch(removeItem(item));
    }
  
    const handleItemCount = (item, type) => {
        if(type === 'add') {
          handleAdd(item)
        } else {
          handleRemoveItem(item);
        }
      }

    const handleClose = () => {
        setIsResSame(!isResSame);
    };
  
  
    const handleNo = () => {
        setIsResSame(!isResSame);
    }
  
    const handleYes = () => {
        setIsResSame(!isResSame);
        dispatch(clearCart());
        dispatch(setResDetails(resDetails));
        setItemAddCount(itemAddCount + 1);
        dispatch(addItem(itemToAdd));
    }
  
    return(
        <React.Fragment>
        <div className="flex border-b-2 border-gray-300 p-3 space-x-2 justify-between" key={item?.card?.info?.id}>
            <div style={{"maxWidth" : "calc(100% - 144px)"}}>
                <h2 className="text-slate-800 font-semibold">{item?.card?.info?.name}</h2>
                <h3 className="text-slate-800 font-semibold">&#8377;{item?.card?.info?.price / 100}</h3>
                <h3 className="text-gray-400 mt-2 mb-2">{item?.card?.info?.description}</h3>
            </div>
            <div className="relative inline-block mb-4">
                <div className="relative text-center">
                    <div className="relative inline-block">
                        <img
                            className="rounded-md"
                            style={{"width" : "118px" , "height" : "96px" ,"background" : "rgb(251, 238, 215)"}}
                            src={MENU_IMG_CDN + item?.card?.info?.imageId}
                        />
                    </div>
                    {itemAddCount > 0 ? 
                                        <div className="flex text-green-500 bg-white border-2 border-gray-300 shadow-md absolute rounded-md top-20 left-7  cursor-pointer justify-between">
                                        <div className="flex items-center px-1">
                                            <button onClick={() => handleItemCount(item?.card?.info, 'remove')} className="text-lg">-</button>
                                        </div>
                                        <div className="flex-1 text-center px-3 py-2">{itemAddCount}</div>
                                        <div className="flex items-center px-1">
                                            <button onClick={() => handleItemCount(item?.card?.info, 'add')} className="text-lg">+</button>
                                        </div>
                                        </div>
                        :
                        <button
                        onClick={() => handleAdd(item?.card?.info)}
                        className="items-center absolute top-20 left-7 px-5 py-2 cursor-pointer justify-between font-semibold rounded-md text-sm bg-white text-green-500 border-2 border-gray-300"
                        >
                        ADD
                        </button>
                    }
                </div>
            </div>
        </div>
        {
            !isResSame &&
            <Modal 
                isOpen={!isResSame} 
                handleClose={handleClose}
                modalDetails={{
                    header: "Items already in cart", 
                    body: "Your cart contains items from other restaurant. Would you like to reset your cart for adding items from this restaurant?",
                    footer: {
                    no: {message: 'NO', handler: handleNo},
                    yes: {message: 'YES, START AFRESH', handler: handleYes},
                    }
                }}
                />
                }
        </React.Fragment>
        )
}

export default Item;