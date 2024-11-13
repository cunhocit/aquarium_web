import SettingFunc from "./setting_func";

export default function AdminInfo() {
    return(
        <>
        <div className="wrap-admin-info">
            <h3>Thông tin chung</h3>

            <div className="admin-info">
                <div className="-w-admin-info">
                    <label htmlFor="" className="value_admin_box">
                        <p>Họ và tên</p>
                        <input type="text" />
                    </label>

                    <label htmlFor="" className="value_admin_box">
                        <p>Ngày sinh</p>
                        <input type="date" />
                    </label>

                    <label htmlFor="" className="value_admin_box">
                        <p>Email</p>
                        <input type="email" />
                    </label>

                    <label htmlFor="" className="value_admin_box">
                        <p>Số điện thoại</p>
                        <input type="phone" />
                    </label>
                    
                    <label htmlFor="" className="value_admin_box">
                        <p>Ngày đăng ký</p>
                        <input type="date" />
                    </label>
                </div>

                <SettingFunc/>
            </div>
        </div>
        </>
    )
}