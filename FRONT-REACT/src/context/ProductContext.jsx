import { createContext, useState, useEffect, useContext } from "react";
import axios from 'axios';

export const ProductContext = createContext();

const BASE_URL = 'http://localhost:3000/productos';

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getProducts = async () => {
        setLoading(true);
        try {
            const { data: responseData } = await axios.get(BASE_URL);
            console.log("Respuesta productos:", responseData);
            setProducts(Array.isArray(responseData.data) ? responseData.data : []);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    const addProduct = async (newProduct) => {
        setLoading(true);
        try {
            const { data: responseData } = await axios.post(BASE_URL, newProduct);
            const created = Array.isArray(responseData.data) ? responseData.data[0] : responseData.data || responseData;
            setProducts(prev => Array.isArray(prev) ? [...prev, created] : [created]);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    const editProduct = async (id, updated) => {
        setLoading(true);
        try {
            await axios.put(`${BASE_URL}/${id}`, updated);
            setProducts(prev =>
                prev.map(u => (u.id === id ? { ...updated, id: id } : u)));
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`${BASE_URL}/${id}`);
            setProducts(prev => prev.filter(u => u.id !== id));
        } catch (e) {
            setError(e.message);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <ProductContext.Provider
            value={{
                products,
                loading,
                error,
                getProducts,
                addProduct,
                editProduct,
                deleteProduct
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};

export const useProductContext = () => {
    return useContext(ProductContext);
};
