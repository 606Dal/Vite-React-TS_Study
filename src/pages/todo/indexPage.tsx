import CustomLayout from "../../layouts/customLayout.tsx";
import {NavLink, Outlet} from "react-router";

function TodoIndexPage() {
    return (
        <CustomLayout>
            <div className="flex gap-4 p-4">
                <div className="flex-1 bg-lime-50 p-4 shadow rounded bold">
                    {/* 절대경로로 설정하는 걸 권장함. */}
                    <NavLink to={'/todo/list'}>LIST</NavLink>
                </div>
                <div className="flex-1 bg-lime-50 p-4 shadow rounded bold">
                    <NavLink to={'/todo/add'}>ADD</NavLink>
                </div>
            </div>
            <div>
                {/* Todo와 관련된 기능은 여기서 부터 */}
                <Outlet></Outlet>
            </div>
        </CustomLayout>
    );
}

export default TodoIndexPage;