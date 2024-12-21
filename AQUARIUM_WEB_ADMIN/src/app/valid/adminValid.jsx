/* eslint-disable no-unused-vars */

import { isValidEmail, isValidPhone } from "./audthValid";

export const adminUpadeValid = (admin) => {
    for (const [key, value] of Object.entries(admin)) {
        if (!value) {
            alert('Vui lòng nhập đầy đủ thông tin!');
            return false;
        }
    }
    if (!isValidEmail(admin.email)) {
        alert('Email không hợp lệ')
        return false;
    }

    if(!isValidPhone(admin.phone)) {
        alert('Số điện thoại không hợp lệ')
        return false;
    }

    return true;
}