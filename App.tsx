import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import BouncyCheckbox from "react-native-bouncy-checkbox";

const passwordSchema = Yup.object().shape({
  length: Yup.number()
  .min(8, 'Password should be minumum 8 character')
  .max(16, 'Password should be max 8 character')
  .required('This field is required'),
});

export default function App() {
  const [password, setPassword] = useState('');
  const [isPasswordGenerated, setIsPasswordGenerated] = useState(false);
  const [lowerCase, setLowerCase] = useState(false);
  const [upperCase, setUpperCase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);

  const generatedPasswordString = (length: number) =>{
    let charList = '';
    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const digitChars = '0123456789';
    const specialChars = '!@#$%&*';
    if(upperCase){
      charList += upperCaseChars;
    }
    if(lowerCase){
      charList += lowerCaseChars;
    }
    if(numbers){
      charList += digitChars;
    }
    if(symbols){
      charList += specialChars;
    }

    const passwordResult = createPassword(length, charList);
    setPassword(passwordResult);
    setIsPasswordGenerated(true);
  };

  const createPassword = (length: number, characters: string) =>{
    let result = '';
    for(let i = 0; i < length; i++){
      const characterIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(characterIndex);
    }
    return result;
  };

  const resetPasswordString = () =>{
    setPassword('');
    setIsPasswordGenerated(false);
    setUpperCase(false);
    setLowerCase(true);
    setNumbers(false);
    setSymbols(false);
  };

  return (
    <ScrollView keyboardShouldPersistTaps={'handled'}>
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Generate Password</Text>
          <Formik
          initialValues={{  length: '' }}
          validationSchema={passwordSchema}
          onSubmit={(values)=>{
            generatedPasswordString(Number(values.length));
          }}
        >
          {({
            values,
            errors,
            touched,
            isValid,
            handleChange,
            handleBlur,
            handleSubmit,
            handleReset,
          }) => (
            <>
            <View style={styles.inputWrapper}>
              <View style={styles.inputColumn}>
                <Text style={styles.heading}>Password length</Text>
                {touched.length && errors.length && (
                  <Text style={styles.errorText}>{errors.length}</Text>
                )}
              </View>
              <TextInput
                style = {styles.inputStyle}
                value = {values.length}
                onChangeText = {handleChange('length')}
                keyboardType = "numeric"
                placeholder= "Ex. 8"
                />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.heading}>Include LowerCase</Text>
              <View>
              <BouncyCheckbox
              size={25}
              fillColor="#29AB87"
              unFillColor="#FFFFFF"
              isChecked={lowerCase}
              onPress={()=> setLowerCase(!lowerCase)}
              />
              </View>
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.heading}>Include UpperCase</Text>
              <View>
              <BouncyCheckbox
              size={25}
              fillColor="#29AB87"
              unFillColor="#FFFFFF"
              isChecked={upperCase}
              onPress={()=> setUpperCase(!upperCase)}
              />
              </View>
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.heading}>Include Numbers</Text>
              <View>
              <BouncyCheckbox
              size={25}
              fillColor="#29AB87"
              unFillColor="#FFFFFF"
              isChecked={numbers}
              onPress={()=> setNumbers(!numbers)}
              />
              </View>
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.heading}>Include Special Characters</Text>
              <View>
              <BouncyCheckbox
              size={25}
              fillColor="#29AB87"
              unFillColor="#FFFFFF"
              isChecked={symbols}
              onPress={()=> setSymbols(!symbols)}
              />
              </View>
            </View>
            <View style={styles.formActions}>
              <TouchableOpacity 
              disabled={!isValid}
              onPress={handleSubmit}
              style={styles.primaryBtn}
              >
                <Text  style={styles.primaryBtnTxt}>Generate Password</Text>
              </TouchableOpacity>
              <TouchableOpacity
              disabled={!isValid}
              onPress={()=>{
                handleReset();
                resetPasswordString();
              }}
              style={styles.secondaryBtn}
              >
                <Text  style={styles.secondaryBtnTxt}>Reset Password</Text>
              </TouchableOpacity>
            </View>
            </>
          )}
          </Formik>
          {isPasswordGenerated ? (
            <Text style={styles.generatedPassword}>{password}</Text>
          )
          :
          (
            <Text style={styles.generatedPassword}>No password</Text>
          )
          }
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#E8F5FF', // Light blue background
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },
  formContainer: {
    margin: 16,
    padding: 16,
    backgroundColor: '#FFFFFF', // White card background
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    marginBottom: 20,
    color: '#34495E',
    textAlign: 'center',
  },
  heading: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2C3E50',
  },
  inputWrapper: {
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    padding: 10,
    width: '40%',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#BDC3C7',
    backgroundColor: '#ECF0F1',
  },
  errorText: {
    fontSize: 14,
    color: '#E74C3C',
    marginTop: 4,
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryBtn: {
    width: 140,
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 10,
    backgroundColor: '#3498DB',
  },
  primaryBtnTxt: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
  secondaryBtn: {
    width: 140,
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 10,
    backgroundColor: '#BDC3C7',
  },
  secondaryBtnTxt: {
    textAlign: 'center',
    color: '#34495E',
    fontWeight: '600',
    fontSize: 16,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginTop: 20,
    color: '#2ECC71',
    fontWeight: '700',
  },
});
