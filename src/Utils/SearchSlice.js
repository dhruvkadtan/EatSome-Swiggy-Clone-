import { createSlice } from "@reduxjs/toolkit";



const SearchSlice = createSlice({
    name : "search",
    initialState : {
        isSearchClicked : false,
        searchText : ""
    },
    reducers : {
        updateIsSearchClicked : (state) => {
            if(state.isSearchClicked ==  false)
                state.isSearchClicked = true
            else
                state.isSearchClicked = false
        },
        updateSearchText : (state,action) => {
            state.searchText = action.payload
        }
    }
})

export const {updateIsSearchClicked , updateSearchText} = SearchSlice.actions;

export default SearchSlice.reducer;