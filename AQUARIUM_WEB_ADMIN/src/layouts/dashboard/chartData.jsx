/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import TableTopPrd from "./table_prd";
import TableOrders from "./table_order";
import { LineChartNewCustomers } from "../../components/charts/lineChartNewCus";
import LineChartRevenue from "../../components/charts/lineChartRev";
import PieChartTopSelling from "../../components/charts/pieChartTopSelling";
import PieChartPrdStruct from "../../components/charts/rieChartPrdStruct";

export default function ChartData({data}) {
    const revenues = data.revenues;
    const customers = data.customers;
    const categories = data.categories;
    const products = data.products;
    
    return(
        <>
            <div className="wrap-charts">

                <LineChartRevenue revenues={revenues}/>

                <LineChartNewCustomers customers={customers}/>

                <PieChartTopSelling categories={categories} revenues={revenues} />

                <PieChartPrdStruct categories={categories} />

                <TableTopPrd products={products} revenues={revenues} />

                <TableOrders data={data} />

            </div>
        </>
    )
}