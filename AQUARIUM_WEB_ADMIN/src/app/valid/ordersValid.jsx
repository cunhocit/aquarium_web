import { isValidPhone } from "./audthValid";

export const OrderValid = (order) => {
    if (!isValidPhone(order.phone)) {
        alert('Số điện thoại không hợp lệ!');
        return false;
    }
    if (parseInt(order.quantity) <= 0) {
        alert('Số lượng không được phép < 0!');
        return false;
    }
    return true;
}