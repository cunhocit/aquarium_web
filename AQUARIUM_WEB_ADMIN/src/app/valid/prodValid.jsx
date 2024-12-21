/* eslint-disable no-unused-vars */
export function validUpdatePrd(data) {
    if (!data.category || !data.name || !data.description || !data.price) {
        alert('Vui lòng nhập đầy đủ thông tin');
        return false;
    }

    if (data.quantity < 0) {
        alert('Số lượng sản phẩm không thể < 0');
        return false;
    }

    return true;
}

export const fullField = (data) => {
    if (data === null || data === undefined || data === '') {
        alert('Vui lòng nhập đầy đủ thông tin');
        return false;
    }
    return true;
};