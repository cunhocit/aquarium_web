/* eslint-disable no-unreachable */
import { useState } from "react";
import AdminInfo from "../layouts/settings/admin_info";
import ChangePassword from "../layouts/settings/change_password";

export function useSettingSwitch() {
    const [activeSpace, setActiveSpace] = useState('admin_info');

    const renderSpace = (props) => {
        switch (activeSpace) {
            case 'change_password':
                return <ChangePassword {...props} setActivePage={setActiveSpace}/>;

            case 'admin_info':
                return <AdminInfo {...props}/>;

            default:
                return <AdminInfo {...props} />;
        }
    }

    return { setActiveSpace, renderSpace };
}