import { useEffect, useState } from "react";
import { getVouchers } from "../app/api/voucherApi";

export const useVouchers = () => {
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const fetchData = async () => {
        await getVouchers().then(
            response => {
                if (response.data) {
                    setData(response.data);
                    setLoading(false);
                }
            }
        )
        .catch(err => {
            console.log("Error: ", err);
        })
    };

    useEffect(() => {
        fetchData();
    }, []);

    return {data, isLoading, fetchData}
}