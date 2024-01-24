import React from "react";
import ReactDOM from "react-dom/client";
import Navbar from "./src/Components/Navbar";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Cart from "./src/Components/Cart";
import Body from "./src/Components/Body";
import { Provider } from "react-redux";
import store from "./src/Utils/Store";
import RestaurantMenu from "./src/Components/RestaurantMenu";

const App = () => {
    return(
        <Provider store={store}>
            
            <>
                <Navbar/>
                <Outlet/>
             
            </>
          
        </Provider>
    )
}

const approuter = createBrowserRouter([
    {
        path : "/",
        element : <App/>,
        errorElement : <Error/>,
        children : [
            {
                path : "/",
                element : <Body/>,
            
            },
            {
                path : "/cart",
                element : <Cart/>,
            },
         
            {
                path : "/restaurant/:id",
                element : <RestaurantMenu/>,
            }, 
         
        
        ]
    }
])



const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<RouterProvider router={approuter}/>)