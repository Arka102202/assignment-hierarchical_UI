import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./pages/Root";
import Homepage from "./pages/Homepage";
import { genEmp } from "./utils/dataGen";
import AllEmployee from "./pages/AllEmployee";

function App() {

  // genEmp();

  const routes = createBrowserRouter([
    {
      path: "/", element: <Root />, errorElement: <></>, children: [
        { index: true, element: <Homepage /> },
        { path: "allEmployees", element: <AllEmployee /> },
      ]
    }
  ])










  return (
    <RouterProvider router={routes}></RouterProvider>
  );
}

export default App;
