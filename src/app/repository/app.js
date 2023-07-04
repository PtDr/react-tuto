import { createContext, useState } from "react";

export const AppContext = createContext();

export const useAppState = () => {
  const checkedNumber = useState(0);

  return checkedNumber;
};
