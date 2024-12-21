/* eslint-disable no-unused-vars */
import { containWhiteSpace, fullField, isValidEmail, isValidPhone } from "./audthValid";

export function validUpdateCustomer(customer) {
    console.log(customer);
    
    for (const [key, value] of Object.entries(customer)) {
        if (key != 'password' || key != 'verify_at') {
            continue;
        }
        if (!value) {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return false;
        }
    }

    if (!isValidEmail(customer.email)) {
        alert('Email không hợp lệ')
        return false;
    }

    if(!isValidPhone(customer.phone)) {
        alert('Số điện thoại không hợp lệ')
        return false;
    }

    return true;
}

