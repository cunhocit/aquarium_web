import { useState } from "react";
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';

export function useSidebar() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    
    const sidebarIcon = isSidebarOpen ? faXmark : faBars;

    const handleShowSidebar = () => {
        setSidebarOpen(prevState => !prevState);
    }

    return { sidebarIcon, isSidebarOpen, handleShowSidebar };
}

export function useReStateForm() {
    const [username, setUsename] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [email, setEmail] = useState('');
    const [displayName, setDisplayName] = useState('');
    
    const reStateLoginForm = () => {
        setUsename('');
        setPassword('');
        setEmail('');
        setDisplayName('');
    }


    return { username, password, email, displayName, rePassword, 
             setUsename, setPassword, setEmail, setDisplayName, setRePassword,
             reStateLoginForm };
}

export function useOpenForm() {
    const [isOpenLoginForm, setOpenLoginForm] = useState(false);
    const [isOpenRegisterForm, setOpenRegisterForm] = useState(false);

    const handleOpenLoginForm = () => {
        setOpenLoginForm(prevState => !prevState);
    }

    const handleOpenRegisterForm = () => {
        setOpenRegisterForm(prevState => !prevState);
    }

    return { isOpenLoginForm, setOpenLoginForm, 
            isOpenRegisterForm, setOpenRegisterForm,
            handleOpenRegisterForm, handleOpenLoginForm };
}

export function useOpenRegisterForm() {

}