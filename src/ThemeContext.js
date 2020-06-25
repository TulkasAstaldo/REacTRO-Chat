import React, { useState } from "react";
import { backgrounds } from "./backgrounds";

export const ThemeContext = React.createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(backgrounds[0]);
  let [count, setCount] = useState(0);

  const handleClick = () => {
    let randNum = Math.floor(Math.random() * 12);
    setCount(randNum !== count ? randNum : Math.floor(Math.random() * 12));
    setTheme(backgrounds[count]);
  };

  return (
    <ThemeContext.Provider value={{ theme, handleClick }}>
      {children}
    </ThemeContext.Provider>
  );
};
