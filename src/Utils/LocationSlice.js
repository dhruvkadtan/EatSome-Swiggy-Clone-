import { createSlice } from "@reduxjs/toolkit";

const LocationSlice = createSlice({
    name : "location",
    initialState : {
        location : {
            address : ""
        }
    },
    reducers : {
        updateLocation : (state,action) => {
            state.location = action.payload;
        }
    }

});

export const {updateLocation} = LocationSlice.actions;

export default LocationSlice.reducer;
