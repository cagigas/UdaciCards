import React, { PureComponent } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { black, white, gray } from '../utils/colors'

class FormButtons extends PureComponent {
  render() {
    const {onSubmit, onCancel, submitBtnText, cancelBtnText} = this.props
    return (
      <View style={styles.row}>
        <TouchableOpacity style={[styles.btn, styles.cancelBtn]} onPress={onCancel}>
          <Text style={styles.btnText}>{cancelBtnText || 'Return'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn]} onPress={onSubmit}>
          <Text style={styles.btnText}>{submitBtnText || 'Submit'}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default FormButtons

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  btn: {
    flex: 1,
    backgroundColor: black,
    padding: 10,
    height: 45,
    margin: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        borderRadius: 7
      },
      android: {
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 2
      }
    })
  },
  cancelBtn: {
    backgroundColor: gray
  },
  btnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center'
  }
})
