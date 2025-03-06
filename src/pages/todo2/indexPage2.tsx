import CustomLayout from "../../layouts/customLayout.tsx";
import {NavLink, Outlet} from "react-router";

function TodoIndexPage2() {
    return (
        <CustomLayout>
            <div className="flex gap-4 p-4">
                <div className="flex-1 bg-pink-100 p-4 shadow rounded bold">
                    <NavLink to={'/todo2/list2'}>LIST</NavLink>
                </div>
                <div className="flex-1 bg-pink-100 p-4 shadow rounded bold">
                    <NavLink to={'/todo2/add2'}>ADD</NavLink>
                </div>
            </div>
            <div>
                <Outlet></Outlet>
            </div>
        </CustomLayout>
    );
}

export default TodoIndexPage2;