/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ShowOrderHistory from "./order_history_tbl";
import { faBackwardStep } from "@fortawesome/free-solid-svg-icons";

export default function OrderHisotry({isShowHistoryPage, handleShowHP}){
    return(
        <>
        <div className="wrap-add-prd" style={{display: isShowHistoryPage ? 'flex' : 'none'}}>
            <div className="wrap-lef-add-prd">
                <div className="wrap-header-command">
                    <h3>Lịch sử mua hàng</h3>
                    <div className="-left-back-prd-list" onClick={handleShowHP}>
                        <FontAwesomeIcon icon={faBackwardStep} />
                        Trở về    
                    </div>
                </div>
                <ShowOrderHistory />
            </div>
        </div>
        </>
    )
}