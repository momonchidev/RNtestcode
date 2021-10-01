
import React from 'react';
import store from './src/store/store';
import { Provider } from 'react-redux';
import MainScreen from './src/screen/MainScreen';
import { addCustomer } from './src/redux/actions';


export default function App() {
  //console.log(store.getState());


  // let obj = {
  //   id:"fdkjkfdshjfds",
  //   firstName:"mon",
  //   lastName:"Doe",
  //   dob:"10/10/10",
  //   phone:"93821098321",
  //   address:"Manila"
  // }
  // store.dispatch(addCustomer(obj));
  // //console.log(store.getState());

  // let x = {...obj, address:"Cebu"}
  // store.dispatch(updateCustomer(1,x));
  // //console.log(store.getState());

  // store.dispatch(addCustomer(obj));
  // //console.log(store.getState());

  // //store.dispatch(deleteCustomer(1));
  // //console.log(store.getState());





  return (
    <Provider store={store}>
      <MainScreen />
    </Provider>
  );
}
