import {lazy, Suspense} from "react";
import {Navigate, Route} from "react-router";
import TodoIndexPage2 from "../pages/todo2/indexPage2.tsx";

const Loading = <div>Loding.....</div>

/* lazy() 지연 로딩에 사용 */
const TodoList2 = lazy(() =>
    import('../pages/todo2/listPage2.tsx'))

function TodoRouter2() {
    return (
        <Route path={'/todo2'} element={<TodoIndexPage2/>}>
            <Route index element={<Navigate to={'list2'} replace /> }></Route>
            <Route path={'list2'}
                   element={<Suspense fallback={Loading}><TodoList2/></Suspense> }></Route>
        </Route>
    );
}

export default TodoRouter2;