export const RegisterAccount = async({ displayName, username, password, rePassword, email }) => {
    try {
        if ( password != rePassword ) {
            alert('Mật khẩu không trùng khớp');
            return;
        }

        if ( !password || !username || !rePassword || !displayName || !email ) {
            alert('Vui lòng nhập đầy đủ thông tin!')
            return;
        }

        const response = await fetch( 
            'http://localhost:8080/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    displayName,
                    username,
                    password,
                    rePassword,
                    email
                })
            });
        const data = await response.json();
        console.log("Data: ", data);
        return data;
    }catch(err) {
        console.log('Error: ', err)
        throw err;
    }
}