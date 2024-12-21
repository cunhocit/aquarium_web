export function validRegister(data) {
  for (let e of data) {
      if (!fullField(e)) {
          return false;
      }
      if (data[0] !== e && containWhiteSpace(e)) {
          return false;
      }
  }

  if (!isValidEmail(data[1])) {
      alert('Email không hợp lệ');
      return false;
  }

  if (data[2] !== data[3]) {
      alert('Mật khẩu không trùng khớp')
      return false;
  }

  if (!isValidLengthPassword(data[2])) {
      return false;
  }

  if (!isValidPhone(data[4])) {
      alert('Số điện thoại không hợp lệ');
      return false;
  }

  return true;
}

export const validLogin = (data) => {
  for (let e of data) {
      if (!fullField(e)) {
          return false;
      }
      if (containWhiteSpace(e)) {
          return false;
      }
  }
  
  if (!isValidEmail(data[0])) {
    alert('Email không hợp lệ');
    return false;
  }

  if (!isValidLengthPassword(data[1])) {
      return false;
  }
  
  return true;
}


// ================== //
export const fullField = (data) => {
  if (!data || data.trim() === '' || data === null) {
      alert('Vui lòng nhập đầy đủ thông tin');
      return false;
  }
  return true;
} 

export const containWhiteSpace = (word) => {
  if (word.includes(' ')){
      alert(`Thông tin không được phép chứa khoảng trắng`);
      return true;
  }
  return false;
}

export const isValidEmail = (email) => {
  const emailPattern = /^[a-zA-Z0-9._-]+@gmail\.com$/;
  const emailPattern2 = /^[a-zA-Z0-9._-]+@vku\.udn\.vn$/;
  if (!emailPattern.test(email) && !emailPattern2.test(email)) {
      return false;
  }
  return true;
}

export const isValidPhone = (phone) => {
  const phonePattern = /^(0[1-9])[0-9]{8}$/;
  if (!phonePattern.test(phone)) return false;
  return true;
}

export const isValidLengthPassword = (password) => {
  if (password.length < 8) {
      alert('Mật khẩu phải có ít nhất 8 ký tự');
      return false;
  }
  return true;
}