/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { getProductById, getProducts, getProductsById } from "../app/api/product_api";
import { getCommentsByProduct } from "../app/api/comment";
import { getCustomerById } from "../app/api/customer_api";
import { getVouchers } from "../app/api/voucher_api";
import { getTransports } from "../app/api/transports_api";

export const useGetProducts = () => {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
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
        fetchData();
    }, []);

    return {data, fetchData, isLoading}
}

export const useGetProductDetailById = (id) => {
    const [data, setData] = useState();
    const [data2, setData2] = useState();
    const [products, setProducts] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        await getProductById(id).then(
            response => {
                if (response.data) {
                    setData(response.data);
                }
            }
        )
    }

    const fetchData2 = async () => {
        await getCommentsByProduct(id).then(
            response => {
                if (response.data) {
                    setData2(response.data);
                    setIsLoading(false);
                }
            }
        )
    }

    const fetchData3 = async () => {
        await getProducts().then(
            response => {
                if (response.data) {
                    setProducts(response.data);
                    setIsLoading(false);
                }
            }
        )    
    }

    useEffect(() => {
        fetchData();
        fetchData2();
        fetchData3();
    }, []);

    return {data, fetchData, isLoading, data2, fetchData2, products, fetchData3}
}

export const useGetListProductsById = () => {
    const list_id = localStorage.getItem('shopping_cart');
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        await getProductsById(list_id).then(
            response => {
                if (response.data) {
                    setData(response.data ? response.data : []);
                    setIsLoading(false);
                }
            }
        );
    };

    useEffect(() => {
        fetchData();
    }, []);

    return {fetchData, data, isLoading}
}

export const useGetProductByListId = () => {
    const [data, setData] = useState();
    const [customer, setCustomer] = useState();
    const [vouchers, setVouchers] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [transports, setTransports] = useState();

    const list_id = localStorage.getItem('shopping_cart');

    const fetchData = async () => {
        await getProductsById(list_id).then(
            response => {
                if (response.data) {
                    setData(response.data ? response.data : []);
                }
            }
        )
    }
    const fetchData2 = async () => {
        await getCustomerById().then(
            response => {
                if (response.customer) {
                    setCustomer(response.customer ? response.customer : []);
                }
            }
        )
    }
    const fetchData3 = async () => {
        await getVouchers().then(
            response => {
                if (response.data) {
                    setVouchers(response.data ? response.data : []);
                }
            }
        )
    }
    const fetchData4 = async () => {
        await getTransports().then(
            response => {
                if (response.data) {
                    setTransports(response.data ? response.data : []);
                    setIsLoading(false);
                }
            }
        )
    }

    useEffect(() => {
        fetchData();
        fetchData2();
        fetchData3();
        fetchData4();
    }, []);

    return {data, fetchData, isLoading, customer, fetchData2, vouchers, fetchData3, transports, fetchData4}
}