
import React , {useMemo,useEffect,useState} from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Formik, Field } from 'formik'
import {useDispatch} from 'react-redux';
import * as yup from 'yup';
import { Button, Modal, TouchableOpacity, Text, View, ActivityIndicator, ScrollView} from 'react-native';
import {customersListStyle,inputModalStyle} from './style';
import CustomInput from './CustomInput';
import axios from 'axios';
import { updateCustomer } from './../redux/actions';
import { API_URL } from '../constant/http';
import moment from 'moment';
import Loader from './Loader';
const UpdateCustomerModal = ({modalVisible,setModalVisible,setUpdatedReceiver,customerData})=>  {

    // pass the close function to child
    const handleCloseModal = () =>{
        setModalVisible(false);
    }
    //console.log(customerData);

    //==================================================================================================
    // intialization of values
    // useState Hook and Yup as formik validation
    const dispatch = useDispatch();
    const [isInitialValid, setIsInitialValid] = useState(false);
    const [customer, setCustomer] = useState(null);
    const [isLoading, setLoading] = useState(false);


    //added custom date validator
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
            .required("DOB is Required")
            .test('Date of Birth', 'Should be greather than 18', function(value) {
                return moment().diff(moment(value), 'years') >= 18;
              }),
        address: yup
            .string()
            .required('Address is required'),
      });

      //useMemo for Formik and yup issue in isValid always false 
      const initialValues = {
            firstName: customerData.firstName,
            lastName: customerData.lastName,
            dob: customerData.dob,
            email: customerData.email,
            phone:customerData.phone,
            address:customerData.address
        };

      //on save customer
      const onSubmitCustomer = (obj) => {
        let url = API_URL+"/"+customerData._id;
        axios.put(url, obj)
            .then(res => res.data)
            .then(data => {
                //save to redux store
                dispatch(updateCustomer(obj));

                //show success alert
                alert("Customer updated successfully.");
                
                //send success response
                setUpdatedReceiver();
                //setLoading(false)
            })
            .catch(error => {
                alert(error.message)
            }).finally(()=>setLoading(false))

      }

      const generateID = () => {
            let d = new Date().getTime();
            let id = 'xxxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
                let r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(5);
            });

            return id;
        };

    return (
        <>    
            {isLoading?
                <View style={{flex : 1, justifyContent: 'center', alignItems: 'center',}}>
                    <Loader />
                </View>
                :
                null
            }
            
            <Modal 
                visible={modalVisible} 
                animationType="slide"
                onRequestClose={handleCloseModal}>
                    <ScrollView>
                        <View style={inputModalStyle.modalContainer}>
                            <View style={inputModalStyle.modalHeaderContainer}>
                                <Text style={inputModalStyle.modalTitle}>Edit Customer</Text>
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
                                    let _id = customerData.id;
                                    let newObj = {...values,id:_id};
                                    setLoading(true)
                                    setCustomer(newObj);
                                    setTimeout(() => {
                                        onSubmitCustomer(newObj);
                                    }, 3000);
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
                                        setFieldValue={props.setFieldValue}
                                    />
                                    <Field
                                        component={CustomInput}
                                        name="dob"
                                        label="Date of birth"
                                        inputType="date"
                                        placeholder="ex: 01/10/1010"
                                        setFieldValue={props.setFieldValue}
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

export default UpdateCustomerModal;