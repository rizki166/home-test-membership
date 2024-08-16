import { Outlet,  } from "react-router-dom";
import NavbarUser from "../component/componentGlobal/NavbarUser";




const Layouts = () => {


    return (
        <div className="overflow-x-hidden">

            <div className="fixed z-50 w-full">
                <NavbarUser />
            </div>

            <div>
                <Outlet />
            </div>
        </div>
    );
};

export default Layouts;
