import React, { createContext, useContext, useRef } from 'react';
import { sampleRoutine } from '../components/character/residentRoutine';
const Context = createContext(null);
export function ResidentProvider({children}) {
 const state=useRef(sampleRoutine(0));
 return <Context.Provider value={state}>{children}</Context.Provider>;
}
export const useResident = () => useContext(Context);
