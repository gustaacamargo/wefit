import { useContext } from "react";
import { BottomModalContext } from "../context/BottomModal/BottomModalContext";

export const useBottomModal = () => useContext(BottomModalContext);