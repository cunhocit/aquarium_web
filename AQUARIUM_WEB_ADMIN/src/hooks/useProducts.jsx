/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { getAllPrdAndCateAPI, getProducts } from "../app/api/doashboardApi";
import { getAllCtgAPI } from "../app/api/categoriesApi";
import { getOrdersByPrdName } from "../app/api/ordersApi";
import { deletePrdAPI, getProductById } from "../app/api/productsApi";

export const useGetProducts = () => {
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const fetchData = async () => {
        await getProducts().then(
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

export const useProducts = () => {
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const fetchData = async () => {
        await getAllPrdAndCateAPI().then(
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

export const useFetchCategories = () => {
    const [categories, setCategories] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const fetchData = async () => {
        await getAllCtgAPI().then(
            response => {
                if (response) {
                    setCategories(response.data);
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

    return {categories, isLoading, fetchData}
}

export const useGetProdcutById = (id) => {
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const fetchData = async () => {
        await getProductById(id).then(
            response => {
                if (response) {
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