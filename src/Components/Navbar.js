import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useSelector , useDispatch} from "react-redux";
import { updateIsSearchClicked, updateSearchText , clearSearchText} from "../Utils/SearchSlice";
import LocationPopup from "./LocationPopup";


const Navbar = () => {
    const cartItems = useSelector(store => store.cart.items);
    const location = useSelector(store => store.location.location);
    const search = useSelector(store => store.search)
   
    const Location = (props) => {
        return (
            <div className="flex space-x-2 pt-1 hover:text-orange-500">
                <div className="font-semibold pt-1  min-[1px]:text-sm md:text-sm truncate ">{props.description}</div>
            </div>
        )
    }

    let dispatch = useDispatch();

    const handleClick = () => {
        if(search.isSearchClicked) {
            dispatch(clearSearchText())
        }
        dispatch(updateIsSearchClicked())
    }

    const [showLocationPopUp, setShowLocationPopUp] = useState(false)
    return(
        <React.Fragment>    
            <div className="sticky top-0 z-30 bg-white">
                <div className="p-5 flex justify-between lg:px-[5%]  shadow-md select-none">
                    <div className="flex w-1/2 ">
                        <div >
                            <Link to="/"><img className="min-[1px]:w-20  h-10 md:w-10" src="https://cdn.worldvectorlogo.com/logos/swiggy-1.svg" alt="EatSome"/></Link>
                        </div>
                        <div  className="font-bold pl-4 truncate text-slate-600 cursor-pointer" onClick={() => {setShowLocationPopUp(!showLocationPopUp)}}>
                            {Object.keys(location.address).length > 0 ? <Location description={location.description}/> :
                                                                         <Location description="Laxmi Chowk, Phase 1, Hinjawadi Rajiv Gandhi Infotech Park, Hinjawadi, Pimpri-Chinchwad, Maharashtra"/>}
                        </div>
                    </div>
                    <div className="w-full">
                        <ul className="flex justify-end min-[1px]:pt-1 min-[1px]:space-x-2 lg:space-x-8 md:space-x-4 ">
                            <li className="">
                                {   
                                    !search.isSearchClicked ? (<button className=" text-gray-600 font-semibold  min-[1px]:text-sm md:text-lg hover:text-orange-500" onClick={() => handleClick()}>Search</button>) :
                                    (<div className="flex">
                                        <input
                                            placeholder="Search For Restaurants.."   
                                            className="border-2 border-gray-400 min-[1px]:w-20 md:w-52 rounded-md p-2 hover:border-orange-500"
                                            value={search.searchText}
                                            onChange={(e) => dispatch(updateSearchText(e.target.value))}
                                        />
                                        <button className="border-2 rounded-md p-2 border-gray-400 mx-2 hover:border-orange-500" onClick={() => handleClick()}>x</button>
                                    </div>)
                                }
                            </li>
                            <li><Link className=" text-slate-600 font-semibold  min-[1px]:text-sm md:text-lg hover:text-orange-500" to="/cart">Cart [{cartItems.length}]</Link></li>
                        </ul>
                    </div>
                </div>
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