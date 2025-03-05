
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter, Routes} from "react-router";
import rootRouter from "./router/root.tsx";

// const About =
//     lazy(() => import("./pages/aboutPage"))

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Routes>

            {...rootRouter()}

            {/*<Route path="/"*/}
            {/*       element={<MainPage />} />*/}
            {/*/!*<Route path="/about" element={<AboutPage />} />*!/*/}
            {/*<Route path="/about"*/}
            {/*       element={<Suspense fallback={Loding}><About/></Suspense>} />*/}
        </Routes>
    </BrowserRouter>

)
