import LineChartRevenue, { LineChartNewCustomers } from "../../components/charts/line_chart";
import PieChartPrd from "../../components/charts/pie_chart";
import PieChartWithPaddingAngle from "../../components/charts/pie_chart_padding_angle";
import TableTopPrd from "./table_prd";
import TableTopUser from "./table_topuse";

export default function ChartData() {
    return(
        <>
        <div className="wrap-charts">
            <div className="wrap-revenue-chart">
                <div className="revenue-chart-header">
                    <h3>Doanh thu</h3>
                    <select className="selectValueLineChart" name="" id="">
                        <option value="">Tuần</option>
                        <option value="">Tháng</option>
                    </select>
                </div>
                <LineChartRevenue/>
            </div>

            <div className="wrap-struc-prd">
                <h3>Cơ cấu sản phẩm</h3>
                <div className="wrap-pie-chart">
                    <PieChartPrd/>
                </div>
            </div>

            <div className="wrap-top-categories">
                <h3>Danh mục bán chạy</h3>
                <div className="wrap-pie-pad-angle">
                    <PieChartWithPaddingAngle/>
                </div>
            </div>

            <TableTopPrd/>
            <LineChartNewCustomers/>
            <TableTopUser/>
        </div>
        </>
    )
}