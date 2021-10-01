
import React , {useMemo,useEffect,useState} from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Formik, Field } from 'formik'
import {useDispatch} from 'react-redux';
import * as yup from 'yup';
import { Button, Modal, TouchableOpacity, Text, View,TextInput, StyleSheet, KeyboardAvoidingView, ScrollView} from 'react-native';
import {customersListStyle,inputModalStyle} from './style';
import CustomInput from './CustomInput';
import DatePicker from 'react-native-date-picker'
import axios from 'axios';
import { addCustomer } from './../redux/actions';
import { API_URL } from '../constant/http';
import store from './../store/store'


const InputModal = ({modalVisible,setModalVisible,setReceived})=>  {

    // pass the close function to child
    const handleCloseModal = () =>{
        setModalVisible(false);
    }

    //==================================================================================================
    // intialization of values
    // useState Hook and Yup as formik validation
    const dispatch = useDispatch();
    const [isInitialValid, setIsInitialValid] = useState(false);
    const [customer, setCustomer] = useState(null);

      const formSchema = yup.object().shape({
        firstName: yup
          .string()
          .required('First name is required'),
        lastName: yup
            .string()
            .required('Last name is required'),
        phone: yup
          .string()
          .matches(/(01)(\d){8}\b/, 'Enter a valid phone number')
          .required('Phone number is required'),
        email: yup
            .string()
            .email("Please enter valid email")
            .required('Email is required'),
        dob: yup
            .string()
            .required('dob is required'),
        address: yup
            .string()
            .required('Address is required'),
      });

      //useMemo for Formik and yup issue in isValid always false 
      const initialValues = useMemo(() => {
        return {
            firstName: '',
            lastName: '',
            dob:'',
            email:'',
            phone:'',
            address:''
        }
      }, []);


      //useEffect to run 1 time the initialValues
      useEffect(() => {
        formSchema
          .validate(initialValues)
          .then((res) => setIsInitialValid(true))
          .catch((err) => setIsInitialValid(false));
      }, [initialValues]);



      //on save customer
      const onSubmitCustomer = (obj) => {


        let url = API_URL;
        axios.post(url, obj)
            .then(res => res.data)
            .then(data => {
                //save to redux store
                dispatch(addCustomer(obj));

                //show success alert
                alert("Customer successfully added.");
                
                //send success response
                setReceived();
            })
            .catch(error => {
                alert(error.message)
            })

      }

      const generateID = () => {
            let d = new Date().getTime();
            let id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                let r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(5);
            });

            return id;
        };

    return (
        <>    
            <TouchableOpacity onPress={() => setModalVisible(true)} style={customersListStyle.fab}>
                <Text style={customersListStyle.fabIcon}>+</Text>
            </TouchableOpacity>
            <Modal 
                visible={modalVisible} 
                animationType="slide"
                onRequestClose={handleCloseModal}>
                    <ScrollView>
                        <View style={inputModalStyle.modalContainer}>
                            <View style={inputModalStyle.modalHeaderContainer}>
                                <Text style={inputModalStyle.modalTitle}>Add new Customer</Text>
                                <TouchableOpacity onPress={() => setModalVisible(false)}  style={inputModalStyle.modalCloseBtn}>
                                    <AntDesign name="closecircleo" size={24} color="black" />
                                </TouchableOpacity>
                            </View>
                            <View style={inputModalStyle.formContainer}>
                                <Formik
                                initialValues={initialValues}
                                validateOnMount={true} 
                                validationSchema={formSchema}
                                onSubmit={(values,actions) => {
                                    //add generated id 
                                    let _id = generateID();
                                    let newObj = {...values,id:_id};
                                    setCustomer(newObj);
                                    onSubmitCustomer(newObj);
                                }}
                            >
                                {(props) => (
                                <>
                                    <Field
                                        component={CustomInput}
                                        name="firstName"
                                        label="First name"
                                        placeholder="Enter your first name ..."
                                    />
                                    <Field
                                        component={CustomInput}
                                        name="lastName"
                                        label="Last name"
                                        placeholder="Enter your last name ..."
                                    />
                                    <Field
                                        component={CustomInput}
                                        name="dob"
                                        label="Date of birth"
                                        placeholder="ex: 01/10/1010"
                                    />
                                    <Field
                                        component={CustomInput}
                                        name="email"
                                        label="Email"
                                        placeholder="ex: johndoe@email.com"
                                    />
                                    <Field
                                        component={CustomInput}
                                        name="phone"
                                        label="Phone Number"
                                        placeholder="ex: 0112345678"
                                    />
                                    <Field
                                        component={CustomInput}
                                        name="address"
                                        label="Address"
                                        placeholder="Enter your address here."
                                        multiline
                                        numberOfLines={3}
                                    />
                                    <Button
                                        onPress={props.handleSubmit}
                                        title="Submit"
                                        disabled={!props.isValid}
                                    />
                                </>
                                )}
                            </Formik>
                            </View>
                        </View>
                    </ScrollView>
            </Modal>
        </>
    );
}

export default InputModal;