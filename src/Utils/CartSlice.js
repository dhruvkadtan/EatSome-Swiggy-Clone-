import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({

    name : "cart",
    initialState : {
        items : [],
        resDetails: {}  
    },

    reducers : {
        setResDetails: (state, action) => {
            state.resDetails = action.payload;
        },
        addItem : (state, action) => {
            state.items.push(action.payload);
        },
        removeItem : (state,action) => {
            let itemId = action.payload.id;
            for(i=0;i< state.items.length;i++) {
                if(state.items[i].id === itemId) {
                    state.items.splice(i,1);
                    break;
                }
            }
        },
        clearCart : (state) => {
            state.items = [];
            state.resDetails = {}
        },
    }

})

export const {addItem , removeItem, clearCart, setResDetails} = CartSlice.actions;

export default CartSlice.reducer;