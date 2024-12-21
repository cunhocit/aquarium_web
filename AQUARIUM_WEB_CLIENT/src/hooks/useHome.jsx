/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { getProducts, getRandom_10_Product } from "../app/api/product_api";
import { useGetCustomerById } from "./useCustomer";
import { getCustomerById } from "../app/api/customer_api";

export const useGetRandom10Product = () => {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        await getRandom_10_Product().then(
            response => {
                
                if (response.product) {
                    setData(response.product);
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

export const useGetNavigation = () => {
    const [customer, setCustomer] = useState();
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const fetchData1 = async () => {
        await getCustomerById().then(
            response => {
                if (response.customer) {
                    setCustomer(response.customer);
                }
            }
        )
    }
    const fetchData2 = async () => {
        await getProducts().then(
            response => {
                if (response.data) {
                    setData(response.data);
                    setIsLoading(false);
                }
            }
        )
    }

    useEffect(() => {
        fetchData1();
        fetchData2();
    }, [])

    return {data, customer, isLoading, fetchData1, fetchData2}
}

