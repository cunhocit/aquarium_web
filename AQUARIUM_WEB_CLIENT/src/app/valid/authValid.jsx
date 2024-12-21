import { containWhiteSpace, emptyField, isEmail, isPassword, isPhone } from "./baseValid";

export const RegisterValid = (customer) => {
    if (!emptyField(customer)) return false;
    
    if (!containWhiteSpace(customer)) return false;

    if (!isEmail(customer.email)) return false;

    if (!isPassword(customer.password, customer.rePassword)) return false;

    if (!isPhone(customer.phone)) return false;

    return true;
}

export const LoginValid = (customer) => {
    if (!emptyField(customer)) return false;
    
    if (!containWhiteSpace(customer)) return false;

    if (!isEmail(customer.email)) return false;

    return true;
}

export const ChangePasswordValid = (passBox) => {
    if (!emptyField(passBox)) return false;
    
    if (passBox.password < 6 || passBox.new_password < 6 || passBox.confirm_password < 6) {
        alert('Mật khẩu phải có ít nhất 6 ký tự!');
        return false;
    }

    if (passBox.new_password != passBox.confirm_password) {
        alert('Mật khẩu không chính xác!');
        return false;
    }

    return true;
}
