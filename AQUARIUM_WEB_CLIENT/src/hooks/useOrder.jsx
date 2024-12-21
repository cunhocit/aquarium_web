import { useEffect, useState } from "react";
import { getOrderById } from "../app/api/order_api";


export const useGetOrderById = () => {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        await getOrderById().then(
            response => {
                if (response.data) {
                    setData(response.data);
                    setIsLoading(false);
                }
            }
        )
    }

    useEffect(() => {
        fetchData();
    }, [])

    return {data, isLoading, fetchData}
}