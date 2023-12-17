import { useDispatch } from "react-redux";
import { MENU_IMG_CDN } from "../Utils/Constants";
import { addItem } from "../Utils/CartSlice";
import { useState } from "react";


const Item = ({item}) => {
    
    let dispatch = useDispatch();
    
    const [itemAddCount , setItemAddCount] = useState(1)

    const handleAdd = (item) => {
        dispatch(addItem(item))
        setItemAddCount(itemAddCount + 1);
    }

    return(
        <div className="flex border-b-2 border-gray-300 p-3 space-x-2 justify-between" key={item?.card?.info?.id}>
            <div style={{"maxWidth" : "calc(100% - 144px)"}}>
                <h2 className="text-slate-800 font-semibold">{item?.card?.info?.name}</h2>
                <h3 className="text-slate-800 font-semibold">{item?.card?.info?.price / 100}</h3>
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
                    {itemAddCount > 1 ? 
                                        <div className="flex text-green-500 bg-white border-2 border-gray-300 shadow-md absolute rounded-md top-20 left-7  cursor-pointer justify-between">
                                        <div className="flex items-center px-1">
                                            <button onClick={() => handleItemCount(item, 'remove')} className="text-lg">-</button>
                                        </div>
                                        <div className="flex-1 text-center px-3 py-2">{itemAddCount}</div>
                                        <div className="flex items-center px-1">
                                            <button onClick={() => handleItemCount(item, 'add')} className="text-lg">+</button>
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
        )
}

export default Item;