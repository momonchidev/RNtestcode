
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { FlatList, Text, StyleSheet, SafeAreaView,Image, View, TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
import CustomerItemView from './CustomerItemView';
import SearchHeader from './SearchHeader';
import {customersListStyle,BG_IMG,BG_IMG_RADIUS} from './style';
import InputModal from './InputModal';
import axios from 'axios';
import {useDispatch,useSelector } from 'react-redux';
import { addCustomer } from '../redux/actions';
import { API_URL } from '../constant/http';
import LottieView from 'lottie-react-native';
import CustomerViewModal from './CustomerViewModal';
import UpdateCustomerModal from './UpdateCustomerModal';



const FIXED_ITEM_HEIGHT = 100
function CustomersList() {
    const customers = useSelector(state => state);
    const dispatch = useDispatch();

    const [isFetching, setIsFetching] = useState(true);
    const [modalForm, setModalForm] = useState(false);
    const [dataHolder, setDataHolder] = useState([]);
    const [query, setQuery] = useState('');

    
    const [viewCustomerModal, setViewCustomerModal] = useState(false);
    const [customerData, setCustomerData] = useState({});
    
    const [updateViewModal, setUpdateViewModal] = useState(false);

    let animation = React.createRef();

    const setReceived = () => {
        setModalForm(false);
        setDataHolder(customers);
    }

    const setUpdatedReceiver = () => {
        setUpdateViewModal(false);
        setViewCustomerModal(false);
        setDataHolder(customers);
    }
    


    //it can be done by useEffect but useLayout is triggered 1st
    useLayoutEffect(()=>{
        
    },[])

    //useEffect to initialize one time data fetch
   useEffect(() => {
        if(animation?.current) {
            animation.current.play();
        }
         //use delay to see the animated lottie view
         //because api is too fast to response
        setTimeout(() => {
            getData();
        }, 3000);

    }, []);

    const getData = () => {
        setIsFetching(true);
        let url = API_URL;
        axios.get(url)
            .then(res => res.data)
            .then(data => {
                if(data.length > 0 ){
                    data.map(customer => {
                        dispatch(addCustomer(customer))
                    });
                    setDataHolder(customers);
                }
            })
            .catch(error => {
                alert(error.message)
            })
            .finally(() =>{
                setIsFetching(false)
            }
            );
    };

    const showCustomerView = (customer) => {
        //console.log(customer);
        setCustomerData(customer)
        setViewCustomerModal(true)
    }

    const renderItem = ({index, item }) => {
        return(
                <TouchableOpacity 
                    key={index.toString()} 
                    onPress={() => showCustomerView(item.customer)}
          >
                    <CustomerItemView  item={item.customer} />
                </TouchableOpacity>
            )
    };
    
    if(isFetching){
        return (
            <SafeAreaView style={customersListStyle.container}>
                  <LottieView
                    ref={animation}
                    style={{flex:1}}
                    source={require('./../assets/lottie/lottie-airplane.json')}
                    />
            </SafeAreaView>
                
            );
    }
    return (
        <SafeAreaView style={customersListStyle.container}>
                
            <Image
                source={{uri:BG_IMG}}
                style={StyleSheet.absoluteFillObject}
                blurRadius={BG_IMG_RADIUS}
                />
                
            <View style={customersListStyle.searchHeaderContainer}>
                <SearchHeader fullData={customers} setFilteredData={setDataHolder} query={query} setQuery={setQuery}/>
            </View>
            {
            (query !== "" && dataHolder !== undefined && dataHolder.length > 0 ) || query =="" && customers !== undefined && customers.length > 0?
            <FlatList
                contentContainerStyle={customersListStyle.contentContainerStyle}
                data={query !== ""?dataHolder:customers}
                keyExtractor={item => item.customer.id}
                renderItem={renderItem}
                getItemLayout={(data, index) => (
                    {length: FIXED_ITEM_HEIGHT, offset: FIXED_ITEM_HEIGHT * index, index}
                )}
            />
            :
            <View  style={{alignItems:'center',alignContent:'center'}}>
                {query !== ""?
                    <Text> No matches found </Text>
                    :
                    <Text> Oops! It's Empty </Text>
                }
            </View>
            
            }
            <InputModal 
                modalVisible={modalForm}
                setModalVisible={setModalForm} 
                setReceived={setReceived}
            />
            <CustomerViewModal 
                modalVisible={viewCustomerModal}
                setModalVisible={setViewCustomerModal}
                showEditView={setUpdateViewModal}
                customerData={customerData} 
            />
            <UpdateCustomerModal
                modalVisible={updateViewModal}
                setModalVisible={setUpdateViewModal} 
                setUpdatedReceiver={setUpdatedReceiver}
                customerData={customerData}  
                />
        </SafeAreaView>
    );
}
  
export default CustomersList;