/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";

const defaultValue = {
    details: null,
    setDetails: () => {},
};

export const DetailsContext = createContext(defaultValue);

export const DetailsProvider = ({ children }) => {
    const [details, setDetails] = useState();

    return (
        <DetailsContext.Provider value={{ details, setDetails }}>
            {children}
        </DetailsContext.Provider>
    );
};