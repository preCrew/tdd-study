import { atom } from "recoil";

interface TtodoState{
    id: number, 
    item: string
}

export const todoState = atom<TtodoState[]>({
    key: 'todoState', // unique ID (with respect to other atoms/selectors)
    default: [], // default value (aka initial value)
  });

