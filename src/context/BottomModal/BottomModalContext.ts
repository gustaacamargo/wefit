import { createContext, useContext } from 'react';

export type BottomModalType = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

export const BottomModalContext = createContext<BottomModalType>({
  visible: false,
  setVisible: (visible) => null
});