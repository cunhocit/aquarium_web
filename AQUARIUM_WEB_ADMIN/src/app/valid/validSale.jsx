
export const validSale = (chooseSales) => {
    for (let p of chooseSales) {
        if (!p.end_date || !p.discount_percentage) {
            alert('Vui lòng điền đủ thông tin trước khi chọn!');
            return false;
        }
        if (isNaN(p.discount_percentage)) {
            alert('Giá trị khuyến mãi là một số!');
            return false;
        }
        if (p.discount_percentage <= 0) {
            alert('Không thể khuyến mãi thấp hơn 0%');
            return false;
        }
        if ((new Date(p.end_date) < (new Date()))) {
            alert('Ngày kết thúc phải lớn hơn ngày hiện tại');
            return false;
        }
    }

    return true;
}

export const validSale2 = (chooseSales) => {
    for (let p of chooseSales) {
        if (isNaN(p.discount_percentage)) {
            alert('Giá trị khuyến mãi là một số!');
            return false;
        }
        if (p.discount_percentage <= 0) {
            alert('Không thể khuyến mãi thấp hơn 0%');
            return false;
        }
        if ((new Date(p.end_date) < (new Date()))) {
            alert('Ngày kết thúc phải lớn hơn ngày hiện tại');
            return false;
        }
    }

    return true;
}