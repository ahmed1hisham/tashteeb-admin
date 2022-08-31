import React, {useState} from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import {Icon} from 'react-native-elements';
import Modal from 'react-native-modal';
import BlueWideButton from '../WideButton/WideButton';
import I18n from '../../../utils/I18n/I18n';

const {width, height} = Dimensions.get('window');
const SuccessModal = props => {
  const [value, setValue] = useState('');
  return (
    <View style={styles.container}>
      <Modal isVisible={props.visible} onBackdropPress={props.onClose}>
        <View style={[styles.modalView, {width: width - 40}]}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: 90,
              marginBottom: 30,
            }}>
            <View
              style={{
                width: 90,
                height: 90,
                overflow: 'hidden',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#08CA3E',
                borderRadius: 45,
              }}>
              <Icon name="check" size={50} color="white" />
            </View>
          </View>
          <View style={{width: '100%', alignItems: 'center'}}>
            <Text style={{marginBottom: 30, fontSize: 22, fontWeight: '700'}}>
              {I18n.t('popUps.success')}
            </Text>
            {props.description ? (
              <Text
                style={{
                  color: 'rgba(21, 25, 32, 0.5)',
                  fontSize: 16,
                  textAlign: 'center',
                  marginBottom: 30,
                }}>
                {props.description}
              </Text>
            ) : null}
          </View>
          <BlueWideButton
            style={{width: '100%'}}
            title="OK"
            onPress={() => {
              props.onConfirm();
            }}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: 'space-between',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  modalText: {
    width: '100%',
    marginBottom: 20,
    textAlign: 'left',
    fontSize: 26,
  },
});

export default SuccessModal;
