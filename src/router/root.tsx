import {Route} from "react-router";
import {lazy, Suspense} from "react";
import todoRouter from "./todoRouter.tsx";
import todoRouter2 from "./todoRouter2.tsx";

const Loading = <div>Loding.....</div>

const Main =
    lazy(() => import("../pages/mainPage"))

const About =
    lazy(() => import("../pages/aboutPage"))

export default function rootRouter() {
    // 배열로 해 줘야 함. , 콤마 잊지 않기
    return [
        // 공백이나 / 슬래시 사용.
        <Route path={'/'} element={<Suspense fallback={Loading}><Main/></Suspense>}></Route>,
        <Route path={'/about'} element={<Suspense fallback={Loading}><About/></Suspense>}></Route>,
        todoRouter(),
        todoRouter2(),

    ]
}