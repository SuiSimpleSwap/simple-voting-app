import { useState } from "react";
import { NavigationContext } from "./NavigationContext";

type NavigationProps = {
  children: React.ReactNode
};

const NavigationProvider: React.FC<NavigationProps> = ({children}) => {
  const [currentPage, setCurrentPage] = useState("/");
  const navigate = (page: string) => setCurrentPage(page);

  return (
    <NavigationContext.Provider value={{currentPage, navigate}}>
      {children}
    </NavigationContext.Provider>
  )
}

export default NavigationProvider;
