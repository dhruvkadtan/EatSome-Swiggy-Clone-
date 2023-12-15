import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useSelector , useDispatch} from "react-redux";
import { updateIsSearchClicked } from "../Utils/SearchSlice";
import LocationPopup from "./LocationPopup";


const Navbar = () => {
    const cartItems = useSelector(store => store.cart.items);
    const location = useSelector(store => store.location.location)
   
    const Location = (props) => {
        return (
            <div className="flex space-x-2 ">
                <div className="font-bold text-lg underline">{props.address}  </div>
                <div className="font-semibold pt-1 text-sm truncate w-2/5">{props.description}</div>
            </div>
        )
    }

    let dispatch = useDispatch();

    const handleClick = () => {
        console.log("hanldeClick")
        dispatch(updateIsSearchClicked())
    }
    

    const [showLocationPopUp, setShowLocationPopUp] = useState(false)
    return(
        <React.Fragment>
            <nav>
                <div className="p-5 flex justify-between shadow-md ">
                    <div className="flex">
                        <div >
                            <Link to="/"><img className="h-10 w-10" src="https://cdn.worldvectorlogo.com/logos/swiggy-1.svg" alt="EatSome"/></Link>
                        </div>
                        <div  className="font-bold pl-4  text-lg truncate text-slate-600 cursor-pointer hover:text-orange-500" onClick={() => {setShowLocationPopUp(!showLocationPopUp)}}>
                            {Object.keys(location.address).length > 0 ? <Location address={location.address.split(' ')[0]} description={location.description}/> :
                                                                         <Location address="Phase" description="Laxmi Chowk, Phase 1, Hinjawadi Rajiv Gandhi Infotech Park, Hinjawadi, Pimpri-Chinchwad, Maharashtra"/>}
                        </div>
                    </div>
                    <ul className="flex space-x-8 ">
                        <li><button className=" text-gray-600 font-semibold text-lg hover:text-orange-500" onClick={() => handleClick()}>Search</button></li>
                        <li><Link className=" text-slate-600 font-semibold text-lg hover:text-orange-500" to="/help">Help</Link></li>
                        <li><Link className=" text-slate-600 font-semibold text-lg hover:text-orange-500" to="/offers">Offers</Link></li>
                        <li><Link className=" text-slate-600 font-semibold text-lg hover:text-orange-500" to="/signin">SignIn</Link></li>
                        <li><Link className=" text-slate-600 font-semibold text-lg hover:text-orange-500" to="/cart">Cart ({cartItems.length})</Link></li>
                    </ul>
                </div>
            </nav>
            <div>
                {
                    showLocationPopUp && <LocationPopup setShowLocationPopUp={() => {setShowLocationPopUp(!showLocationPopUp)}}/>
                }
            </div>
        </React.Fragment>  
    )
}

export default Navbar;