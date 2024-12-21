/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { getOrdersAPI, getOrdersById } from "../app/api/ordersApi";


export const useGetOrder = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState();

    const fetchData = () => {
        getOrdersAPI().then(
            data => {
                if (data.data) {
                    setLoading(false);
                    setData(data.data)
                }
            }
        )
        .catch(err => {
            console.log("Error: ", err);
        })
    }

    useEffect(() => {
        fetchData();
    }, []);

    return {data, loading}
}

export const useGetOrderById = (id) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({
        order: [],
        products: [],
        pay_methods: [],
        status: []
    });

    const fetchData = (id) => {
        getOrdersById(id).then(
            response => {
                if (response) {
                    setLoading(false);
                    setData(response)
                }
            }
        )
        .catch(err => {
            console.log("Error: ", err);
        })
    }

    useEffect(() => {
        fetchData(id);
    }, []);

    return {data, loading, fetchData}
}