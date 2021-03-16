import React, { useState } from 'react'
import { View, Text, TextInput } from 'react-native'
import { color } from '../constants/color'
import { Input } from 'react-native-elements'

const FloatingLabelInput = (props) => {
  const [isFocused, setIsFocused] = useState(false)
  const handleFocus = () => setIsFocused(true)
  const handleBlur = () => setIsFocused(false)

  return (
    <Input
      label={isFocused ? props.label : ' '}
      labelStyle={props.labelStyle}
      placeholder={!isFocused ? props.placeholder : null}
      inputStyle={props.inputStyle}
      inputContainerStyle={props.inputCon2tainerStyle}
      containerStyle={props.containerStyle}
      onChangeText={props.onChangeText}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  )
}
export default FloatingLabelInput