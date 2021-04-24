import { createContext, useContext } from "react";

const signInContext = createContext();

export function AppWrapper({ children }) {
  return (
    <signInContext.Provider value={sharedState}>
      {children}
    </signInContext.Provider>
  );
}

export function useAppContext() {
  return useContext(signInContext);
}
