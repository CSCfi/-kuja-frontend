import React from "react";
import { UserProvider } from "./userContext";

const Store = ({ children }) => {
  return (
    <UserProvider>
      {children}
    </UserProvider>
  );
};

export default Store;
