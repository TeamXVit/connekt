import { DetailsContext } from "../contexts/DetailsContext";
import { useContext } from "react";

const useDetails = () => useContext(DetailsContext);

export default useDetails;