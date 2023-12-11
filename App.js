import React from "react";
import ReactDOM from "react-dom/client";
import Navbar from "./src/Components/Navbar";
import Footer from "./src/Components/Footer";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Help from "./src/Components/Help";
import SignIn from "./src/Components/SignIn";
import Cart from "./src/Components/Cart";
import RestaurantMenu from "./src/Components/RestaurantMenu";
import Body from "./src/Components/Body";
import { Provider } from "react-redux";
import store from "./src/Utils/Store";

const App = () => {
    return(
        <Provider store={store}>
            <>
                <Navbar/>
                <Outlet/>
                <Footer/>
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
                path : "/help",
                element : <Help/>,
            },
            {
                path : "/signin",
                element : <SignIn/>,
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