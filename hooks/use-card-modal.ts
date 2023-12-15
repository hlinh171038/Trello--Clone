import {create} from 'zustand'

type CardModalStore = {
    id?: string;
    isOpen: boolean;
    onOpen: (id:string) => void;
    onClose: () => void
}

export const useCardModal = create<CardModalStore>((set)=>({
    // default value
    id: undefined,
    isOpen: false,
    onOpen: (id: string) => set({isOpen: true, id}),
    onClose: () =>set({isOpen: false, id:undefined})
}));