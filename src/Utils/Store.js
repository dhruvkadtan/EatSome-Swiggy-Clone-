import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./CartSlice";
import LocationSlice from "./LocationSlice";
import restaurantSlice from "./restaurantSlice";
import SearchSlice from "./SearchSlice";


const store = configureStore({
    reducer : {
        cart : CartSlice,
        location : LocationSlice,
        restaurants : restaurantSlice,
        search : SearchSlice
    }
});

export default store;