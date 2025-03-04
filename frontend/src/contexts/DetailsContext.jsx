/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState } from "react";


export const DetailsContext = createContext();

export const DetailsProvider = ({ children }) => {
    const [details, setDetails] = useState(null);

    return(
        <DetailsContext.Provider value={{ details, setDetails }}>
            {children}
        </DetailsContext.Provider>
    )
}