import AuthProvider from "./contexts/AuthProvider";
import { BrowserRouter } from "react-router";
import RouteProvider from "./components/RouteProvider";


export default function  App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <RouteProvider />
      </BrowserRouter>
    </AuthProvider>
  )
}