import { BrowserRouter } from "react-router";
import Navigator from "./components/navigation/Navigator";


export default function  App() {
  return (
    <BrowserRouter>
      <Navigator />
    </BrowserRouter>
  )
}