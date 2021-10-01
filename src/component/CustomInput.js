import React from 'react'
import { Text, TextInput, StyleSheet, View } from 'react-native'

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