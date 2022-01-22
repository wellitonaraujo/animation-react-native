/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  KeyboardAvoidingView,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  Keyboard
} from 'react-native';

function App() {

  const [ logo ] = useState( new Animated.ValueXY({ x: 130, y: 155}));
  const [ offset ] = useState( new Animated.ValueXY({ x: 0, y: 95}));
  const [ opacity ] = useState( new Animated.Value(0));

  useEffect(() => {

    KeyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    KeyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide);

    Animated.parallel([
      Animated.spring(offset.y, {
        toValue: 0,
        speed: 4,
        bounciness: 20,
        useNativeDriver: false
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false
      })
      
    ]).start()


  }, []);

  function keyboardDidShow() {

    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 55,
        duration: 100,
        useNativeDriver: false,
      }),
      Animated.timing(logo.y, {
        toValue: 65,
        duration: 100,
        useNativeDriver: false,
      }),
    ]).start();

  }

  function keyboardDidHide() {

    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 130,
        duration: 100,
        useNativeDriver: false,
      }),
      Animated.timing(logo.y, {
        toValue: 150,
        duration: 100,
        useNativeDriver: false,
      }),
    ]).start();

  }

  return(
    <KeyboardAvoidingView style={styles.background}>
      <View style={styles.containerLogo}>
        <Animated.Image 
        style={{
         width: logo.x,
         height: logo.y,
        }}
        source={require('./src/assets/logo.png')}
        />
      </View>

      <Animated.View
      style={[
        styles.container,
        {
          opacity: opacity,
          transform: [
            { translateY: offset.y }
          ]
        }
        ]}
      >

        <TextInput
          style={styles.input}
          placeholder='Email'
          autoCorrect={false}
          onChangeText={() => {}}
        />

        <TextInput
          style={styles.input}
          placeholder='Senha'
          autoCorrect={false}
          onChangeText={() => {}}
        />

        <TouchableOpacity style={styles.btnSubmit}>
          <Text style={styles.btnText}>Acessar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnRegister}>
          <Text style={styles.registerText}>Criar conta</Text>
        </TouchableOpacity>

      </Animated.View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#191919'
  },

  containerLogo: {
    justifyContent: 'center',
    flex: 1,
  },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    paddingBottom: 50
  },

  input: {
    backgroundColor: '#fff',
    width: '90%',
    marginBottom: 15,
    color: '#222',
    fontSize: 20,
    borderRadius: 7,
    padding: 10
  },

  btnSubmit: {
    backgroundColor: '#35AAFF',
    width: '90%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7
  },

  btnText: {
    color: '#fff',
    fontSize: 20
  },

  btnRegister: {
    marginTop: 10
  },

  registerText: {
    color: '#fff',
    fontSize: 16
  }
  

})

export default App;
