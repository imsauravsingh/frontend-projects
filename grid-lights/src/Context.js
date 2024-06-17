import { createContext } from "react";

const ContextData = createContext();

const Context = ({ children }) => {
  return <ContextData.Provider>{children}</ContextData.Provider>;
};

export default Context;
