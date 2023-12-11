import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./CartSlice";
import LocationSlice from "./LocationSlice";
import restaurantSlice from "./restaurantSlice";


const store = configureStore({
    reducer : {
        cart : CartSlice,
        location : LocationSlice,
        restaurants : restaurantSlice
    }
});

export default store;