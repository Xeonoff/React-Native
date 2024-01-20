import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { resetProduct, setProduct } from '../store/productSlice';
import { axiosInstance } from '../API';
import Loading from '../components/Loading';

export default function ProductScreen({ route }) {
    const [ loading, setLoading ] = useState(true);

    const { id } = route.params;
    const dispatch = useDispatch();
    const { product } = useSelector((store) => store.product);
    const [ parameters, setParameters ] = useState([]);

    const getParams = (source) => {
        let params = []
        source.bdate && params.push({key: "День рождения", value: source.bdate})
        source.email && params.push({key: "Email", value: source.email})
        source.phone && params.push({key: "Тел. номер", value: source.phone})
        return params
    }

    useEffect(() => {
        async function getProduct() {
            await axiosInstance.get(`/receivers/${id}`).then((response) => {
                dispatch(setProduct(response?.data));
                setParameters(getParams(response?.data));
            });
        }
        getProduct().then(() => {
            setLoading(false)
        }).catch((error) => {
            console.log(error)
            setLoading(false)
        });

        return () => {
            dispatch(resetProduct());
        };
    }, [dispatch]);

    return (
        !loading ?
        <ScrollView>
            <View style={styles.page}>
                <Text style={styles.full_name}>{product.full_name}</Text>
                <Image style={styles.image} source={{ uri: product.img }} resizeMode='contain'/>
                <Text style={styles.param_full_name}>Описание получателя</Text>
                <View style={styles.container}>
                    {parameters.map((parameter, index) => (
                        <View key={index} style={styles.row}>
                            <View style={styles.column}>
                                <Text style={styles.param_text}>{parameter.key}</Text>
                                <View style={styles.param_dots}></View>
                            </View>
                            <View style={styles.column}>
                                <Text style={styles.param_text}>{parameter.value}</Text>
                            </View>
                        </View>
                    ))}
                </View>
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
        height: '100%',
        justifyContent: 'center',
    },
    full_name: {
        color: '#006bd5',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        fontSize: 20,
        textAlign: 'center',
    },
    image: {
        height: 250,
        width: 250,
        borderRadius: 125,
        alignSelf: 'stretch',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    param_full_name: {
        marginTop: 25,
        padding: 4,
        backgroundColor: '#00b90e',
        fontWeight: '500',
        fontSize: 22,
        color: '#ffffff',
        marginLeft: 20,
        marginRight: 20,
        textAlign: 'center',
    },
    param_text: {
        fontSize: 16,
    },
    param_dots: {
        flex: 1,
        position: 'relative',
        marginHorizontal: 3,
        top: -3,
        height: '100%',
        borderStyle: 'dotted',
        borderBottomWidth: 2,
        borderBottomColor: '#777777',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },
    row: {
        flexDirection: 'row',
    },
    column: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        paddingBottom: 10,
    },
  });