export const emptyField = (data) => {
    for (const feild in data) {
        if (data[feild] === '') {
            alert('Bạn chưa nhập đầy đủ thông tin!');
            return false;
        }
    }
    return true;
} 
  
export const containWhiteSpace = (data) => {
    for (const feild in data) {
        if (data[feild].includes(' ') && feild != 'name') {
            alert('Thông tin không được phép chứa khoảng trắng!');
            return false;
        }
    }
    return true;
}
  
export const isEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@gmail\.com$/;
    const emailPattern2 = /^[a-zA-Z0-9._-]+@vku\.udn\.vn$/;
    if (!emailPattern.test(email) && !emailPattern2.test(email)) {
        alert('Email không hợp lệ!');
        return false;
    }
    return true;
}
  
export const isPhone = (phone) => {
    const phonePattern = /^(0[1-9])[0-9]{8}$/;
    if (!phonePattern.test(phone)) {
        alert('Số điện thoại không hợp lệ!');
        return false
    };
    return true;
}

export const isPassword = (password, rePassword) => {
    if (password.length < 6 || rePassword.length < 6) {
        alert('Mật khẩu phải có ít nhất 6 ký tự!');
        return false;
    }
    if (password != rePassword) {
        alert('Mật khẩu không chính xác!');
        return false;
    }
    return true;
}