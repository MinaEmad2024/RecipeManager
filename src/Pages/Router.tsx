import { createBrowserRouter } from "react-router-dom"; 
import Home from "./home";
import Favorites from "./favorites";
import Details from "./detailsPage";
import Root from "./Root";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children:[
            {
                index:true,
                element: <Home />,
            },
            {
                path:'/details',
                element: <Details />
            },
            {
                path:'/favorites',
                element: < Favorites />
            },
            {
                path:'/recipe-item/:id',
                element: <Details />
            },
        ]
    }
]);

export default router;