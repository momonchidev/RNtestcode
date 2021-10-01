
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { FlatList, Text, StyleSheet, SafeAreaView,Image, View, ActivityIndicator} from 'react-native';
import CustomerItemView from './CustomerItemView';
import SearchHeader from './SearchHeader';
import {customersListStyle,BG_IMG,BG_IMG_RADIUS} from './style';
import InputModal from './InputModal';
import axios from 'axios';
import {useDispatch,useSelector } from 'react-redux';
import { addCustomer, addCustomers } from '../redux/actions';
import { API_URL } from '../constant/http';
import LottieView from 'lottie-react-native';
import store from '../store/store';



const FIXED_ITEM_HEIGHT = 100
function CustomersList(props) {
    const dispatch = useDispatch();

    const [isFetching, setIsFetching] = useState(true);
    const [modalForm, setModalForm] = useState(false);
    const [fullData, setFullData] = useState([]);
    const [dataHolder, setDataHolder] = useState([]);
    const [query, setQuery] = useState('');
    let animation = React.createRef();
    const customers = useSelector(state => state);
    // const { customers } = dataReducer;

    const setReceived = () => {
        console.log("setReceived");
        setModalForm(false);
        console.log(store.getState());
        customers = {...customers, a};
    }

    useLayoutEffect(()=>{
        if(animation?.current) {
            animation.current.play();
         }
    },[])

    //useEffect to initialize one time data fetch
   useEffect(() => {
        
         //use delay to see the animated lottie view
         //because api is too fast to response
        // setTimeout(() => {
        //     getData();
        // }, 3000);

        let obj = {
            id:"fdkjkfdshjfds",
            firstName:"mon",
            lastName:"Doe",
            dob:"10/10/10",
            phone:"93821098321",
            address:"Manila"
        }

        dispatch(addCustomer(obj));
        


    }, []);

    const getData = () => {
        setIsFetching(true);
        let url = API_URL;
        axios.get(url)
            .then(res => res.data)
            .then(data => {
                //console.log(data);
                if(data.length > 0 ){
                    dispatch(addCustomers(data))
                    console.log("after api customers");
                     console.log(customers);
                    // console.log(store.getState());
                    setDataHolder(customers);
                    setFullData(customers);
                }
            })
            .catch(error => {
                alert(error.message)
            })
            .finally(() => setIsFetching(false));
    };


    const renderItem = ({ item }) => (
        <CustomerItemView item={item} />
    );
    
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
                <SearchHeader fullData={fullData} setFilteredData={setDataHolder} query={query} setQuery={setQuery}/>
            </View>
            {dataHolder !== undefined && dataHolder.length > 0 ?
            <FlatList
                contentContainerStyle={customersListStyle.contentContainerStyle}
                data={dataHolder}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                getItemLayout={(data, index) => (
                    {length: FIXED_ITEM_HEIGHT, offset: FIXED_ITEM_HEIGHT * index, index}
                )}
            />
            :
            <View style={{alignItems:'center',alignContent:'center'}}>
                <Text>Oops! It's Empty</Text>
            </View>
            
            }
            <InputModal 
                modalVisible={modalForm}
                setModalVisible={setModalForm} 
                setReceived={setReceived}
            />
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center"
    },
    horizontal: {
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 10
    }
  });
  
export default CustomersList;