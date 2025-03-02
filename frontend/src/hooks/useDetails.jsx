import { useContext } from "react";
import { DetailsContext } from "../contexts/DetailsContext";

const useDetails = () => useContext(DetailsContext);

export default useDetails;