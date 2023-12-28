import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useSelector , useDispatch} from "react-redux";
import { updateIsSearchClicked} from "../Utils/SearchSlice";
import LocationPopup from "./LocationPopup";


const Navbar = () => {
    const cartItems = useSelector(store => store.cart.items);
    const location = useSelector(store => store.location.location);
 
   
    const [toggleMenu, setToggleMenu] = useState(false)
    const [showLocationPopUp, setShowLocationPopUp] = useState(false);

    const Location = (props) => {
        return (
            <div className="flex space-x-2  hover:text-orange-500">
                <div className="font-semibold   min-[1px]:text-sm md:text-lg truncate ">{props.description}</div>
            </div>
        )
    }

    let dispatch = useDispatch();

  

    return(
        <React.Fragment>    
            <div className="w-full h-20 sticky top-0 z-30 bg-white p-5 flex justify-between items-center lg:px-[5%]  shadow-md select-none">
                    <div className="flex w-1/2 items-center ">
                        
                        <Link to="/"><img className="min-[1px]:w-20  h-10 md:w-10" src="https://cdn.worldvectorlogo.com/logos/swiggy-1.svg" alt="EatSome"/></Link>
                        
                        <div  className="font-bold pl-4 truncate text-slate-600 cursor-pointer" onClick={() => {setShowLocationPopUp(!showLocationPopUp)}}>
                            {Object.keys(location.address).length > 0 ? <Location description={location.description}/> :
                                                                         <Location description="Laxmi Chowk, Phase 1, Hinjawadi Rajiv Gandhi Infotech Park, Hinjawadi, Pimpri-Chinchwad, Maharashtra"/>}
                        </div>
                    </div>

                    <ul className="min-[1px]:hidden md:flex justify-end min-[1px]:space-x-2 lg:space-x-8 md:space-x-4 ">
                        <li>           
                            <Link className=" text-slate-600 font-semibold  min-[1px]:text-sm md:text-lg hover:text-orange-500" to="/" onClick={() => dispatch(updateIsSearchClicked())}>Search</Link>
                        </li>
                        <li>
                            <Link className=" text-slate-600 font-semibold  min-[1px]:text-sm md:text-lg hover:text-orange-500" to="/cart">Cart [{cartItems.length}]</Link>
                        </li>
                    </ul>
                    <img
                        src="https://cdn4.iconfinder.com/data/icons/navigation-40/24/hamburger-menu-512.png"
                        alt="hamburger-icon"
                        className='md:hidden w-10'
                        onClick={() => setToggleMenu(!toggleMenu)}
                    />
                    {
                        toggleMenu && (
                            <div className="fixed top-20 right-0 h-full w-3/4 bg-white shadow-lg shadow-gray-500 overflow-y-auto z-[1000]">
                              <ul className='py-6 space-y-4 text-lg cursor-pointer'>
                                <li className='px-4 py-2 border-b text-slate-600 font-semibold  min-[1px]:text-sm md:text-lg hover:text-orange-500'>
                                    <Link to='/' onClick={() => {dispatch(updateIsSearchClicked()) ; setToggleMenu(false)}}>Search</Link>
                                </li>
                                <li className='px-4 py-2 border-b text-slate-600 font-semibold  min-[1px]:text-sm md:text-lg hover:text-orange-500'>
                                    <Link to='/cart' onClick={() => setToggleMenu(false)}>Cart</Link>
                                </li>
                              </ul>
                            </div>
                          )
                    }  
                </div>
            <div>
                {
                    showLocationPopUp && <LocationPopup setShowLocationPopUp={() => {setShowLocationPopUp(!showLocationPopUp)}}/>
                }
            </div>
        </React.Fragment>  
    )
}

export default Navbar;