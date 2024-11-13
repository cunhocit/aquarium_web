import OverviewDashboard from "./overview"
import ChartData from "./chartData"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome } from "@fortawesome/free-solid-svg-icons"

export default function Dashboard() {
    return(
    <>
        <div className="wrap-dashboard">
            <div className="title_box">
                <FontAwesomeIcon icon={faHome} />
                <h2 className="dashboard-title">Dashboard</h2>
            </div>

            <OverviewDashboard/>
            
            <ChartData/>
        </div>
    </>
    )
}