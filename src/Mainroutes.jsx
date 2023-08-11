import { useRoutes } from "react-router-dom";
import Signup from './Pages/Signup';
import AllUserData from './Pages/AllUserData';
import EditeUser from './Pages/EditeUser';
const MainRoutes = () => {

    const routes = useRoutes([
        {
            path: "/",
            element: (
                <>
                    <AllUserData />
                </>
            )
        },
        {
            path: "/signup",
            element: (
                <>
                    <Signup />
                </>
            )
        },
        {
            path: "/editeuser/:id",
            element: (
                <>
                    <EditeUser />
                </>
            )
        }
    ]);

    return routes;
};

export default MainRoutes;

