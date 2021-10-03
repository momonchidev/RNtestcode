import React from 'react';
import renderer from 'react-test-renderer';
import { Platform } from 'react-native';
import MainScreen from '../screen/MainScreen';
import { Provider } from 'react-redux';
import store from './../store/store';

jest.useFakeTimers()
//test jest
test('it works', () => {
    expect(true).toBeTruthy();
});

//test if platform is available
if (Platform.OS !== 'web') {
        console.log(`Everything is great! 😁`)
} else {
    throw new Error(`Oppps! 😭`);
}

//test provider redux is working
test('renders correctly', () => {
    const tree = renderer.create(<Provider store={store}><MainScreen /></Provider>).toJSON();
    expect(tree).toMatchSnapshot();
});