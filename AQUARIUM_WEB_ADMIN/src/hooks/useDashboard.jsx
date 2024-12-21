/* eslint-disable no-unused-vars */
import { getDataDashboard } from "../app/api/doashboardApi";
import { useEffect, useState } from "react";

const currentDate = new Date();

export const useDashBoard = () => {
    const [ data, setData ] = useState({
        products: [],
        revenues: [],
        orders: [],
        customers: [],
        categories: [],
        payMethods: [],
        orderStatus: []
    });

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            await getDataDashboard().then(
                data => {
                    if (data.data) {
                        setData(data.data);
                        setIsLoading(false);
                    }
                }
            )
            .catch(err => {
                console.log("Error: ", err);
            });
        };
        fetchData();
    }, []);

    return { data, isLoading }
}


// utility functions
export const calRev = (revenue) => {
    let qtyPrevMonth = 0;
    let qtyCurrMonth = 0;
    let revCurrMonth = 0;
    let revPrevMonth = 0;
     
    revenue.forEach(e => {
        const revenueRecorMonth = (new Date(e.created_at)).getMonth() + 1;
        const currentMonth = currentDate.getMonth() + 1;

        if (currentMonth === revenueRecorMonth) {
            qtyCurrMonth += e.quantity;
            revCurrMonth += e.revenue;
        }

        if (currentMonth - 1 === revenueRecorMonth) {
            qtyPrevMonth += e.quantity;
            revPrevMonth += e.revenue;
        }
    })
    return { qtyCurrMonth, qtyPrevMonth, revCurrMonth, revPrevMonth };
}

export const calOrd = (orders) => {
    let qtyOrd = 0;
    let ordFinish = 0;
    orders.forEach(e => {
        const orderMonth = (new Date(e.created_at)).getMonth() + 1;
        const currentMonth = (new Date()).getMonth() + 1;

        if (orderMonth === currentMonth) {
            qtyOrd++;
            if (e.status === "Hoàn thành") ordFinish++;
        }
    })
    return { ordFinish, qtyOrd };
}

export const calCus = (customers) => {
    let cusOnl = 0;
    let qtyCus = 0;

    customers.forEach(e => {
        qtyCus++;
        if (e.status === 'online') cusOnl++;
    })

    return { qtyCus, cusOnl }
}