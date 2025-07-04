import React, { createContext, useContext, useState, useEffect } from "react";

interface PrivateTabContextProps {
  isPrivate: boolean;
  togglePrivate: () => void;
}

const PrivateTabContext = createContext<PrivateTabContextProps | undefined>(
  undefined
);

export const usePrivateTab = () => {
  const context = useContext(PrivateTabContext);
  if (!context)
    throw new Error("usePrivateTab must be used within PrivateTabProvider");
  return context;
};

export const PrivateTabProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isPrivate, setIsPrivate] = useState(() => {
    // Load from localStorage on first render
    const stored = localStorage.getItem("isPrivate");
    return stored === "true";
  });

  useEffect(() => {
    localStorage.setItem("isPrivate", String(isPrivate));
  }, [isPrivate]);

  const togglePrivate = () => setIsPrivate((prev) => !prev);

  return (
    <PrivateTabContext.Provider value={{ isPrivate, togglePrivate }}>
      {children}
    </PrivateTabContext.Provider>
  );
};
