import { ScrollView, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../API';
import { setProducts } from '../store/productSlice';
import ProductCard from '../components/ProductCard';
import Filter from '../components/Filter';
import Loading from '../components/Loading';

export default function ProductListScreen({ navigation }) {
    const [ loading, setLoading ] = useState(true);

    const dispatch = useDispatch();
    const { products } = useSelector((store) => store.product);

    const [ searchValue, setSearchValue ] = useState("")
    const [ filterSendCount, setFilterSendCount ] = useState(0)

    useEffect(() => {
        async function getProducts() {
            await axiosInstance.get(`/receivers/?status=1&title=${searchValue}`)
                .then((response) => dispatch(setProducts(response?.data.Receivers)));
        }

        getProducts().then(() => {
            setLoading(false)
        }).catch((error) => {
            console.log(error)
            setLoading(false)
        });

    }, [dispatch, filterSendCount]);

    return (
        !loading ?
        <ScrollView>
            <Filter
                search={searchValue}
                setSearch={setSearchValue}
                send={setFilterSendCount}
            />
            <View style={styles.page}>
                {!!products &&
                    products.map((product, index) => <ProductCard key={index} {...product} navigation={navigation} />)}
            </View>
        </ScrollView>
        : <Loading />
    );
}

const styles = StyleSheet.create({
    page: {
        backgroundColor: '#ffffff',
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});