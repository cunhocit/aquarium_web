import { useEffect, useState } from "react";
import { getCustomerById } from "../app/api/customer_api";

export const useGetCustomerById = () => {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        await getCustomerById().then(
            response => {
                if (response.customer) {
                    setData(response.customer);
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