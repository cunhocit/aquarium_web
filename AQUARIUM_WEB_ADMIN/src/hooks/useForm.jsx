import { useState } from "react";

export function useLoginRegister() {
    const [isOpenForm, setIsOpenForm] = useState(false);

    const handleOpenForm = () => {
        setIsOpenForm(prev => !prev);
    }

    return { isOpenForm, handleOpenForm };
}

export function useChangePrdForm() {
    const [isOpen, setOpen] = useState(false);

    const handleOpenForm = () => {
        setOpen(prev => !prev);
    }

    return {isOpen, handleOpenForm}
}