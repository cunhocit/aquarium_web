import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxes, faShoppingCart, faDollarSign, faUser } from '@fortawesome/free-solid-svg-icons';

export default function OverviewDashboard() {
    return(
        <>
            <div className="data-overview">
                <div className="data-box">
                    <div className='data-box-top'>
                        <FontAwesomeIcon icon={faBoxes } />
                        <div className="in4-box">
                            <p>Tổng số sản phẩm</p>
                            <h3>3020</h3>
                        </div>
                    </div>
                    <hr />
                    <p className="sale-title"><span style={{color: "green"}}>+55%</span> tuần trước</p>
                </div>
                <div className="data-box">
                    <div className='data-box-top'>
                        <FontAwesomeIcon icon={faShoppingCart } />
                        <div className="in4-box">
                            <p>Tổng số đơn hàng</p>
                            <h3>3020</h3>
                        </div>
                    </div>
                    <hr />
                    <p className="sale-title"><span style={{color: "green"}}>+55%</span> tuần trước</p>
                </div>
                <div className="data-box">
                    <div className='data-box-top'>
                        <FontAwesomeIcon icon={faDollarSign } />
                        <div className="in4-box">
                            <p>Doanh thu</p>
                            <h3>3020</h3>
                        </div>
                    </div>
                    <hr />
                    <p className="sale-title"><span style={{color: "green"}}>+55%</span> tuần trước</p>
                </div>
                <div className="data-box">
                    <div className='data-box-top'>
                        <FontAwesomeIcon icon={faUser} />
                        <div className="in4-box">
                            <p>Tổng số khách hàng</p>
                            <h3>885</h3>
                        </div>
                    </div>
                    <hr />
                    <p className="sale-title">
                        <span style={{color: "green"}}>209</span> tài khoản đang online
                    </p>
                </div>
            </div>
        </>
    );
}