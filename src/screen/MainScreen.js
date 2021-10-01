import React from 'react';
import {Text,View,StyleSheet} from 'react-native';
import CustomersList from '../component/CustomersList';


function MainScreen(props) {
    return (
        <View style={styles.container}>
            <CustomersList />
        </View>
    );
}

export default MainScreen;




const styles = StyleSheet.create({
    container: {
      flex: 1
    },
  });