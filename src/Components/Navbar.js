import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import store from "../Utils/Store";
import LocationPopup from "./LocationPopup";

const Navbar = () => {
    const cartItems = useSelector(store => store.cart.items);
    const location = useSelector(store => store.location.location)

    const [showLocationPopUp, setShowLocationPopUp] = useState(false)
    return(
        <React.Fragment>
            <nav className=" shadow-gray-500">
                <div className="p-5 flex justify-between">
                    <div className="flex">
                        <div>
                            <Link to="/"><h1 className="font-bold text-lg text-orange-500">EatSome</h1></Link>
                        </div>
                        <div  className="font-bold pl-4 text-lg truncate text-slate-600 cursor-pointer hover:text-orange-500" onClick={() => {setShowLocationPopUp(!showLocationPopUp)}}>
                            {Object.keys(location.address).length > 0 ? location.address : 'Laxmi Chowk'}
                        </div>
                    </div>
                    <ul className="flex">
                        <li className="px-2"><Link className=" text-slate-600 font-semibold" to="/help">Help</Link></li>
                        <li className="px-2"><Link className=" text-slate-600 font-semibold" to="/offers">Offers</Link></li>
                        <li className="px-2"><Link className=" text-slate-600 font-semibold" to="/signin">SignIn</Link></li>
                        <li className="px-2"><Link className=" text-slate-600 font-semibold" to="/cart">Cart ({cartItems.length})</Link></li>
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