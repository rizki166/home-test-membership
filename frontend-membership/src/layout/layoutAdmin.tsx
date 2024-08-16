import { Outlet } from "react-router-dom"
import NavbarAdmin from "../component/componentGlobal/NavbarAdmin"
// import NavbarAdmin from "../components/componentsGlobal/navbarAdmin"

const LayoutsAdmin = () => {
    return (
        <div className="w-full">
            <div className="flex fixed w-full">
                <div className="">
                    <NavbarAdmin />
                </div>
                <div className="w-[85%]">
                    <Outlet />
                </div>

            </div>
        </div>
    )
}

export default LayoutsAdmin
