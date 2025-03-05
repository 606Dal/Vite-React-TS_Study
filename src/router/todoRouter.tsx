/* 루트에 다 하면 코드가 복잡해 보이니까 따로 빼는 것.
* 일반 함수는 소문자로 많이 잡음. 컴포넌트는 대문자*/

import {Navigate, Route} from "react-router";
import TodoIndexPage from "../pages/todo/indexPage.tsx";
import {lazy, Suspense} from "react";

const Loading = <div>Loding.....</div>

const TodoList = lazy(() =>
    import('../pages/todo/listPage.tsx'))

const TodoAdd = lazy(() =>
    import('../pages/todo/addPage.tsx'))

const TodoRead = lazy(() =>
    import('../pages/todo/readPage.tsx'))

export default function todoRouter() {

    return (
        // 사실은 {} 빼도 됨. / 슬래시도 빼도 됨.
        <Route path={'/todo'} element={<TodoIndexPage/>}>
            {/* replace가 리다이렉트 : todo로 들어오면 todo/list로 이동 */}
            <Route index element={<Navigate to={'list'} replace />}></Route>
            <Route path={'list'}
                   element={<Suspense fallback={Loading}><TodoList/></Suspense>}></Route>
            <Route path={'add'}
                   element={<Suspense fallback={Loading}><TodoAdd/></Suspense>}></Route>
            <Route path={'read/:tno'}
                   element={<Suspense fallback={Loading}><TodoRead/></Suspense>}></Route>
        </Route>
    )


}