import { useState } from "react";
import Dashboard from "../layouts/dashboard/dashboard";
import Orders from "../layouts/orders/orders";
import Products from "../layouts/products/products";
import Settings from "../layouts/settings/settings";
import Custumers from "../layouts/customers/custumers";

export default function usePageSwitch() {
    const [activePage, setActivePage] = useState('dashboard');

    const renderPage = () => {
        switch (activePage) {
            case 'dashboard':
                return <Dashboard/>;

            case 'orders':
                return <Orders/>;

            case 'products':
                return <Products/>;

            case 'settings':
                return <Settings/>;

            case 'customers':
                return <Custumers/>;

            default:
                return <Dashboard/>
        }
    }

    return { setActivePage, renderPage };
}