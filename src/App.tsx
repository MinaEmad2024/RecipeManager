import { RouterProvider } from "react-router-dom"
import router from './Pages/Router'
// import GlobalState from "./gcontext"
// import type {ReactNode} from "react"



// interface AppProps {
//   children: ReactNode;
// } 


function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
