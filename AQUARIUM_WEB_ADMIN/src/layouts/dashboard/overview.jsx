/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxes, faShoppingCart, faDollarSign, faUser } from '@fortawesome/free-solid-svg-icons';
import { calCus, calOrd, calRev } from '../../hooks/useDashBoard';

export default function OverviewDashboard({data}) {
    const {qtyCurrMonth, qtyPrevMonth, revCurrMonth, revPrevMonth} = calRev(data.revenues);
    const {ordFinish, qtyOrd} = calOrd(data.orders);
    const {cusOnl, qtyCus} = calCus(data.customers)

    const subQty = qtyCurrMonth - qtyPrevMonth;
    const subRev = revCurrMonth - revPrevMonth; 

    return(
        <>
            <div className="data-overview">

                <div className="data-box">
                    <div className='data-box-top'>
                        <FontAwesomeIcon icon={ faBoxes } />
                        <div className="in4-box">
                            <p>Sản phẩm đã bán</p> 
                            <h3>{qtyCurrMonth}</h3>
                        </div>
                    </div>
                    <hr />
                    <p className="sale-title">
                        <span style={{color: subQty > 0 ? "green" : "red"}}> {   
                            (subQty > 0) 
                            ? 
                            `+ ${(((subQty)/qtyPrevMonth)*100).toFixed(2)}% ` 
                            : 
                            `${(((subQty)/qtyPrevMonth)*100).toFixed(2)}% ` 
                        } </span>
                        tháng trước
                    </p>
                </div>

                <div className="data-box">
                    <div className='data-box-top'>
                        <FontAwesomeIcon icon={faShoppingCart } />
                        <div className="in4-box">
                            <p>Tổng số đơn hàng</p>
                            <h3>{qtyOrd}</h3>
                        </div>
                    </div>
                    <hr />
                    <p className="sale-title">
                        <span style={{color: "green"}}>{ordFinish} </span> 
                        đơn đã hoàn thành
                    </p>
                </div>

                <div className="data-box">
                    <div className='data-box-top'>
                        <FontAwesomeIcon icon={faDollarSign } />
                        <div className="in4-box">
                            <p>Doanh thu tháng</p>
                            <h3>{revCurrMonth.toLocaleString('vi-VN')} VND</h3>
                        </div>
                    </div>
                    <hr />
                    <p className="sale-title">
                        <span style={{color: subRev > 0 ? "green" : "red"}}>
                            {(subRev > 0) ?
                                `+ ${((subRev/revPrevMonth)*100).toFixed(2)}% ` :
                                `${((subRev/revPrevMonth)*100).toFixed(2)}% `}
                        </span>
                        tháng trước
                    </p>

                </div>

                <div className="data-box">
                    <div className='data-box-top'>
                        <FontAwesomeIcon icon={faUser} />
                        <div className="in4-box">
                            <p>Tổng số khách hàng</p>
                            <h3>{qtyCus}</h3>
                        </div>
                    </div>
                    <hr />
                    <p className="sale-title">
                        <span style={{color: "green"}}>{cusOnl}</span> 
                        tài khoản đang online
                    </p>
                </div>
            </div>
        </>
    );
}