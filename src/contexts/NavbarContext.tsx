import React, { createContext, useContext, useState } from "react";

interface NavbarContextType {
  isTransparent: boolean;
  setIsTransparent: (value: boolean) => void;
}

const NavbarContext = createContext<NavbarContextType | undefined>(undefined);

export function NavbarProvider({ children }: { children: React.ReactNode }) {
  const [isTransparent, setIsTransparent] = useState(false);

  return (
    <NavbarContext.Provider value={{ isTransparent, setIsTransparent }}>
      {children}
    </NavbarContext.Provider>
  );
}

export function useNavbar() {
  const context = useContext(NavbarContext);
  if (context === undefined) {
    throw new Error("useNavbar must be used within a NavbarProvider");
  }
  return context;
}
