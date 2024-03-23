import { create } from "zustand";


interface UseModalStoreProps{
 isOpen: boolean;
 onOpen: ()=>void;
 onClose: ()=>void;

}


export const UseModalStore  = create<UseModalStoreProps>((set)=>({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))
