/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react"
import { getAllCusAPI, getCustomerById, getOrderHistoryByEmail } from "../app/api/customersApi";

export const useGetCustomers = () => {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        await getAllCusAPI().then(
            response => {
                setData(response);
                setIsLoading(false);
            }
        )
    }

    useEffect(() => {
        fetchData();
    }, []);

    return { data, fetchData, isLoading }
}

export const useGetCustomerById = (id) => {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        await getCustomerById(id).then(
            response => {
                setData(response);
                setIsLoading(false);
            }
        )
    }

    useEffect(() => {
        fetchData();
    }, []);

    return { data, fetchData, isLoading }
}


export const useOrderHistoryByEmail = (email) => {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        await getOrderHistoryByEmail(email).then(
            response => {
                setData(response.response);
                setIsLoading(false);
            }
        )
    }

    useEffect(() => {
        fetchData();
    }, []);

    return { data, fetchData, isLoading }
}