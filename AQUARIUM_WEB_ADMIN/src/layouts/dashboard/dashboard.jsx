import OverviewDashboard from "./overview"
import ChartData from "./chartData"

export default function Dashboard() {
    return(
    <>
        <div className="wrap-dashboard">
            <h2 className="dashboard-title">Dashboard</h2>

            <OverviewDashboard/>
            
            <ChartData/>
        </div>
    </>
    )
}