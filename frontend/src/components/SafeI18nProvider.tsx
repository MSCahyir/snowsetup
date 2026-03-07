'use client';

import { ReactNode, createContext, useContext } from 'react';

const SafeI18nContext = createContext<boolean>(true);

export function SafeI18nProvider({ children }: { children: ReactNode }) {
  return (
    <SafeI18nContext.Provider value={true}>
      {children}
    </SafeI18nContext.Provider>
  );
}

export function useHasI18nContext(): boolean {
  try {
    const ctx = useContext(SafeI18nContext);
    return ctx === true;
  } catch {
    return false;
  }
}
