import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { useContext } from "react";


function Layout() {
    
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    );
}


export default Layout;