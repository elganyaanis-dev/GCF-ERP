import { createContext, useContext } from "react";

interface SubsidiaryContextType {
  subsidiary_id: string;
}

export const SubsidiaryContext = createContext<SubsidiaryContextType | null>(null);

export function useSubsidiary() {
  const context = useContext(SubsidiaryContext);
  if (!context) {
    return { subsidiary_id: "gcf" };
  }
  return context;
}
