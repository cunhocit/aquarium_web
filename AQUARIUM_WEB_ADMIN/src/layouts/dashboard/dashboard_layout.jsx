/* eslint-disable no-unused-vars */
import OverviewDashboard from "./overview"
import ChartData from "./chartData"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome } from "@fortawesome/free-solid-svg-icons"
import { useDashBoard } from "../../hooks/useDashBoard";

export default function DashboardLayout() {
    const { data, isLoading } = useDashBoard();
    
    if (isLoading) {
        return <div>Đang tải dữ liệu</div>;
    }

    return(
    <>        
        <div className="wrap-dashboard">
            <div className="title_box">
                <FontAwesomeIcon icon={faHome} />
                <h2 className="dashboard-title">Trang chủ</h2>
            </div>

            <OverviewDashboard  data={data} />
            
            <ChartData data={data}/>
        </div>
    </>
    )
}