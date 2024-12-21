
export const validVoucher = (voucher) => {
    if (isNaN(voucher.discount_percentage)) {
        alert('Giá trị khuyến mãi là một số!');
        return false;
    }

    if (voucher.type_code === 'Giảm theo %') {
        if (voucher.discount_percentage <= 0) {
            alert('Giả trị khuyến mãi chỉ nằm trong khoảng 1 -> 100%');
            return false;
        }
        if (voucher.discount_percentage > 100) {
            alert('Giả trị khuyến mãi chỉ nằm trong khoảng 1 -> 100%');
            return false;
        }
    }

    if (voucher.type_code === 'Giảm theo số tiền') {
        if (voucher.discount_percentage <= 5000) {
            alert('Giả trị khuyến mãi không được nhỏ hơn 5000 VNĐ');
            return false;
        }
    }

    if (voucher.quantity <=0) {
        alert('Không thể số lượng thấp hơn 0');
        return false;
    }

    if (!voucher.end_date) {
        alert('Ngày kết thúc phải lớn hơn ngày hiện tại');
        return false;
    }

    if ((new Date(voucher.end_date) < (new Date()))) {
        alert('Ngày kết thúc phải lớn hơn ngày hiện tại');
        return false;
    }

    return true;
}


export const validVouchers = (vouchers) => {
    if (vouchers.length === 0) {
        alert('Chưa chọn voucher nào để chỉnh sửa!');
        return false;
    }
    for (let voucher of vouchers) {
        if (isNaN(voucher.discount_percentage)) {
            alert('Giá trị khuyến mãi là một số!');
            return false;
        }
    
        if (voucher.type_code === 'Giảm theo %') {
            if (voucher.discount_percentage <= 0) {
                alert('Giả trị khuyến mãi chỉ nằm trong khoảng 1 -> 100%');
                return false;
            }
            if (voucher.discount_percentage > 100) {
                alert('Giả trị khuyến mãi chỉ nằm trong khoảng 1 -> 100%');
                return false;
            }
        }
    
        if (voucher.type_code === 'Giảm theo số tiền') {
            if (voucher.discount_percentage <= 5000) {
                alert('Giả trị khuyến mãi không được nhỏ hơn 5000 VNĐ');
                return false;
            }
        }
    
        if (voucher.quantity <=0) {
            alert('Không thể số lượng thấp hơn 0');
            return false;
        }
    
        if (!voucher.end_date) {
            alert('Ngày kết thúc phải lớn hơn ngày hiện tại');
            return false;
        }
    
        if ((new Date(voucher.end_date) < (new Date()))) {
            alert('Ngày kết thúc phải lớn hơn ngày hiện tại');
            return false;
        }
    }

    return true;
}