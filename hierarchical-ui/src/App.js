import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./pages/Root";
import Homepage from "./pages/Homepage";

function App() {



  const routes = createBrowserRouter([
    {path:"/", element: <Root />, errorElement:<></>, children:[
      {index:true, element:<Homepage />}
    ]}
  ])










  return (
    <RouterProvider router={routes}></RouterProvider>
  );
}

export default App;
