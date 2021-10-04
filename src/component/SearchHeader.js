import React, {useState} from 'react';
import {View,TextInput} from 'react-native';
import filter from 'lodash.filter';
import {searchHeaderStyle} from './style'

const SearchHeader = (props) => {
    return (
        <View
        style={searchHeaderStyle.header}
      >
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="always"
          value={props.query}
          onChangeText={queryText => handleSearch(props,queryText)}
          placeholder="Search"
          style={searchHeaderStyle.textInput}
        />
      </View>
    );
}
const handleSearch = (props,text,setQuery) => {
    const formattedQuery = text.toLowerCase();
    const filteredData = filter(props.fullData, user => {
      return contains(user, formattedQuery);
    });
    props.setFilteredData(filteredData);
    props.setQuery(text);
  };
  
  const contains = ({customer}, query) => {
    if (customer.lastName.toLowerCase().includes(query.toLowerCase()) || customer.firstName.toLowerCase().includes(query.toLowerCase())) {
      return true;
    }
  
    return false;
  };

export default SearchHeader;