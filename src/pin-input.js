import React from 'react';
import {
  View, TextInput, Keyboard, Text,
} from 'react-native';
import PropTypes from 'prop-types';
import Countdown from '@miidx/rn-count-down';

const styles = {
  container: {
    alignSelf: 'center',
  },
  pinContainer: {
    flexDirection: 'row',
    width: 310,
    marginTop: 50,
    justifyContent: 'space-around',
  },
  pinInputContainer: {
    marginHorizontal: 5,
    flexDirection: 'column',
  },
  pinLine: {
    height: 2,
    width: 35,
    backgroundColor: '#2B2B2B',
  },
  inputStyle: {
    height: 60,
    marginVertical: 5,
    fontSize: 30,
    textAlign: 'center',
  },
  expiredInfoContainer: {
    marginBottom: 10,
    fontSize: 14,
    alignItems: 'center',
  },
};

const onChangeText = (pinOrder, pin, input, onTextChanged) => {
  const completePin = Array.from(pin);
  completePin[pinOrder] = input;
  if (pinOrder === 0 && input === '') {
    this[`pin${pinOrder}`].focus();
  } else if (pinOrder !== 0 && input === '') {
    this[`pin${pinOrder - 1}`].focus();
  } else if (pinOrder !== 5) {
    this[`pin${pinOrder + 1}`].focus();
  } else {
    Keyboard.dismiss();
  }
  const retVal = `${completePin[0]}${completePin[1]}${completePin[2]}${completePin[3]}${completePin[4]}${completePin[5]}`.replace(/undefined/g, ' ');
  onTextChanged(retVal);
};

const renderTextInput = (arr, value, onTextChanged,
  charContainerStyle, textStyle) => arr.map((item, index) => (
    <View style={[styles.pinInputContainer, charContainerStyle]} key={item}>
      <TextInput
        ref={(component) => { this[`pin${index}`] = component; }}
        onChangeText={input => onChangeText(index, value, input, onTextChanged)}
        value={value[index] === ' ' ? '' : value[index]}
        maxLength={1}
        selectTextOnFocus
        underlineColorAndroid="transparent"
        style={[styles.inputStyle, textStyle]}
        keyboardType="numeric"
      />
      <View style={styles.pinLine} />
    </View>
));

const renderCountdown = (pinExpirationDate, expiringLabel, countdownLabel, onPinExpired) => {
  if (pinExpirationDate === '') {
    return (
      <Text style={[styles.expiredInfoContainer, { marginTop: 10 }]}>
        {expiringLabel}
      </Text>
    );
  }
  return (
    <Countdown
      label={countdownLabel}
      endTime={pinExpirationDate}
      onTimeIsUp={() => onPinExpired()}
      {...props}
    />
  );
};

const PinInput = ({
  value, pinExpirationDate, expiringLabel, countdownLabel,
  onPinExpired, onTextChanged, containerStyle, charContainerStyle, textStyle,
}) => {
  const textInput = ['0', '1', '2', '3', '4', '5'];

  return (
    <View style={styles.container}>
      <View style={[styles.pinContainer, containerStyle]}>
        {renderTextInput(textInput, value, onTextChanged, charContainerStyle, textStyle)}
      </View>
      <View style={styles.expiredInfoContainer}>
        {renderCountdown(pinExpirationDate, expiringLabel, countdownLabel,onPinExpired)}
      </View>
    </View>
  );
};

const StyleShape = PropTypes.objectOf(PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number,
]));

PinInput.propTypes = {
  value: PropTypes.string.isRequired,
  pinExpirationDate: PropTypes.string.isRequired,
  expiringLabel: PropTypes.string,
  countdownLabel: PropTypes.string,
  onPinExpired: PropTypes.func.isRequired,
  onTextChanged: PropTypes.func.isRequired,
  containerStyle: StyleShape,
  charContainerStyle: StyleShape,
  textStyle: StyleShape,
};

PinInput.defaultProps = {
  expiringLabel: 'Pin has expired',
  countdownLabel: '',
  containerStyle: {},
  charContainerStyle: {},
  textStyle: {},
};

export default PinInput;
