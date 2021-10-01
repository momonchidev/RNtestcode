
import React from 'react';
import store from './src/store/store';
import { Provider } from 'react-redux';
import MainScreen from './src/screen/MainScreen';
import { addCustomer } from './src/redux/actions';


export default function App() {
  return (
    <Provider store={store}>
      <MainScreen />
    </Provider>
  );
}
