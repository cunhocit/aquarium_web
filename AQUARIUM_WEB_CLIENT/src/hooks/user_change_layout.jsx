/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import { useState } from "react"
import { UserInfo } from "../layouts/user/user_info";
import { UserOrder } from "../layouts/user/user_order";
import { UserChangePassword } from "../layouts/user/change_password";
import { UserDiposit } from "../layouts/user/user_diposit";


export const userRenderUserLayout = () => {
    const [activePage, setRender] = useState('info');

    const render = (props) => {

        switch (activePage) {
            case 'info' :
                return <UserInfo {...props}/>;
            case 'order':
                return <UserOrder {...props}/>
            case 'change_password':
                return <UserChangePassword {...props}/>
            case 'diposit':
                return <UserDiposit {...props}/>
            default: 
                return <UserInfo {...props}/> 
        }
    }

    return {setRender, render}
}