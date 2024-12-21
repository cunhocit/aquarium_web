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