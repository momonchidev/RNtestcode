import React,{useEffect, useState} from 'react'
import moment from 'moment';
import { Text, TextInput, StyleSheet, View } from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DatePicker from 'react-native-datepicker'

const CustomInput = (props) => {
  const {
    field: { name, onBlur, onChange, value },
    form: { errors, touched, setFieldTouched },
    ...inputProps
  } = props

  const hasError = errors[name] && touched[name]

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.labelTxt}>{props.label}</Text>
      {props.inputType !== undefined && props.inputType == "date"?
        <View>
          <DatePicker
            style={
              hasError && styles.errorInput,{width: 200}}
            date={value}
            value={value}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            maxDate={new Date()}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            onBlur={() => {
              setFieldTouched(name)
              onBlur(name)
            }}
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36
              }
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(date) => {
              setFieldTouched(name);
              onBlur(name)
              props.setFieldValue(name,date)}}
          />
        </View>
        :
        <TextInput
          style={[
            styles.textInput,
            hasError && styles.errorInput,
            props.multiline?{height:70}:null
          ]}
          value={value}
          onChangeText={(text) => onChange(name)(text)}
          onBlur={() => {
            setFieldTouched(name)
            onBlur(name)
          }}
          {...inputProps}
        />
      }
      { hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer:{
    flexDirection:'column',
    marginBottom: 10
  },
  textInput: {
    height: 40,
    paddingLeft:8,
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 5,
  },
  labelTxt:{
    fontSize:12,
    color:'#000',
    fontWeight:'700',
    marginBottom:5,
    marginLeft:5
  },
  errorText: {
    fontSize: 10,
    color: 'red',
    marginLeft:5
  },
  errorInput: {
    borderColor: 'red',
  }
})

export default CustomInput