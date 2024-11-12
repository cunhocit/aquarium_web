import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxes, faShoppingCart, faDollarSign, faHouse } from '@fortawesome/free-solid-svg-icons';

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
                        <FontAwesomeIcon icon={faHouse } />
                        <div className="in4-box">
                            <p>Tình trạng kho</p>
                            <h3>80%</h3>
                        </div>
                    </div>
                    <hr />
                    <p className="sale-title">
                        Còn <span style={{color: "green"}}>20%</span> sức chứa
                    </p>
                </div>
            </div>
        </>
    );
}