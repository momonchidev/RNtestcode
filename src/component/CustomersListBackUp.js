
import React, { useEffect, useState } from 'react';
import { FlatList, Text, StyleSheet, SafeAreaView,Image, View, ActivityIndicator} from 'react-native';
import CustomerItemView from './CustomerItemView';
import SearchHeader from './SearchHeader';
import {customersListStyle,BG_IMG,BG_IMG_RADIUS} from './style';
import InputModal from './InputModal';
import axios from 'axios';
import {useDispatch,useSelector } from 'react-redux';
import { addCustomers } from '../redux/actions';
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
    const {customers} = useSelector(state => state.dataReducer);

    store.subscribe(()=>{
        console.log("from subscribe");
        console.log(customers);
        console.log(store.getState());
    });
    
    //useEffect to initialize one time data fetch
   useEffect(() => {
        animation.current.play();
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
                //console.log(data);
                if(data.length > 0 ){
                    //dispatch(addCustomers(data))
                    // console.log("customers");
                     console.log(customers);
                     setTimeout(() => {
                        console.log("setTimeout");
                        console.log(customers);
                    }, 3000);
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
            <Text>Empty</Text>
            }
            <InputModal 
                modalVisible={modalForm}
                setModalVisible={setModalForm} 
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