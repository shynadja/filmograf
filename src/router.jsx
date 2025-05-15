import { createBrowserRouter } from "react-router";
import App from "./App";
import HomePage from "./pages/HomePage";
import FavouritePage from "./pages/FavouritePage";
import AddFilmPage from "./pages/AddFilmPage";
import FilmPage from "./pages/FilmPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "/", element: <HomePage /> },
            { path: "/saved", element: <FavouritePage /> },
            { path: "/film/:id", element: <FilmPage /> },
            { path: "/film/add", element: <AddFilmPage /> }
        ],

    },
]);
export default router;