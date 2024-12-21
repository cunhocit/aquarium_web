import { useEffect, useState } from "react";
import { getVouchers } from "../app/api/voucher_api";


export const useGetVouchers = () => {
    const [vouchers, setVouchers] = useState();
    const [isLoadingVouchers, setIsLoadingVouchers] = useState(true);

    const fetchVouchers = async () => {
        await getVouchers().then(
            response => {
                if (response.data) {
                    setVouchers(response.data);
                    setIsLoadingVouchers(false);
                }
            }
        )
    }

    useEffect(() => {
        fetchVouchers();
    }, []);

    return {vouchers, isLoadingVouchers, fetchVouchers}
}