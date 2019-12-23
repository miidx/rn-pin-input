/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
} from 'react-native';

import PinInput from '@miidx/rn-pin-input';

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <PinInput
          value="123456"
          onTextChanged={input => { console.log(input); }}
          pinExpirationDate="2019-12-19T17:32+07:00"
          onPinExpired={() => { console.log('Time is up!'); }}
          countdownLabel={'PIN will expire in'}
        />
        </SafeAreaView>
    </>
  );
};

export default App;
