import { useState } from 'react';
import { BottomModalContext } from './BottomModalContext';

interface IBottomModalProvider {
  children: React.ReactNode;
}

export function BottomModalProvider({ children }: IBottomModalProvider): JSX.Element {
  const [visible, setVisible] = useState(false);

  return (
    <BottomModalContext.Provider value={{ visible, setVisible }}>
      {children}
    </BottomModalContext.Provider>
  );
}