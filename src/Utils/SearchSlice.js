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
        },
        clearSearchText : (state) => {
            state.searchText = ""
        }
    }
})

export const {updateIsSearchClicked , updateSearchText , clearSearchText} = SearchSlice.actions;

export default SearchSlice.reducer;