import I18n from 'i18n-js';
import React, {useContext, useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  TextInput,
  I18nManager,
  Alert,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import InputField from '../../components/kit/InputField/InputField';
import ScreenTitle from '../../components/kit/ScreenTitle/ScreenTitle';
import WideButton from '../../components/kit/WideButton/WideButton';
import {black, darkGray} from '../../theme/colors';
import SelectDropdown from 'react-native-select-dropdown';
import {addRequest} from '../../services/RequestsService';
import SuccessModal from '../../components/kit/SuccessModal/SuccessModal';
import {Icon} from 'react-native-elements';
import DatePicker from 'react-native-date-picker';
import {UserContext} from '../../../App';

const {width, height} = Dimensions.get('window');
const BookingForm = props => {
  const {professional} = props.route.params;
  const [workerName, setWorkerName] = useState(
    I18nManager.isRTL ? professional.name.ar : professional.name.en,
  );
  const [serviceName, setServiceName] = useState(
    I18n.t(`home.${props.route.params.category}`),
  );
  const [clientName, setClientName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [address, setAddress] = useState('');
  const [unitArea, setUnitArea] = useState('');
  const [unitType, setUnitType] = useState('');
  const [noOfRooms, setNoOfRooms] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [dateOfInspection, setDateOfInspection] = useState('');
  const [open, setOpen] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {currentUser, setCurrentUser} = useContext(UserContext);
  const [error, setError] = useState('');

  const roomsDropdown = I18nManager.isRTL
    ? ['1', '2', '3', '4', 'اكثر']
    : ['1', '2', '3', '4', 'more'];
  const unitTypeDropdown = I18nManager.isRTL
    ? ['فيلا', 'شقة', 'مكتب', 'مطعم']
    : ['Villa', 'Appartment', 'Office', 'Restaurant'];

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };

  const allFilled = () => {
    return (
      clientName.trim() !== '' &&
      mobileNumber.trim() !== '' &&
      address.trim() !== '' &&
      unitArea.trim() !== '' &&
      unitType.trim() !== '' &&
      noOfRooms.trim() !== '' &&
      dateOfInspection.trim() !== '' &&
      description.trim() !== '' &&
      address.trim() !== '' &&
      address.trim() !== '' &&
      address.trim() !== ''
    );
  };

  const submitRequest = async () => {
    setError('');
    if (!allFilled()) {
      setError(I18n.t('bookingForm.missingFields'));
      return;
    }
    setIsLoading(true);
    const data = {
      mobileNumber: mobileNumber,
      workerName: professional.name,
      serviceKey: props.route.params.category,
      address: address,
      workerId: professional.id,
      status: 'pending',
      unitType: unitType,
      description: description,
      requesterName: clientName,
      requesterId: currentUser.uid,
      noOfRooms: noOfRooms,
      dateOfInspection: date,
    };
    await addRequest(data)
      .then(res => {
        setSuccessModalVisible(true);
      })
      .catch(err => {
        Alert.alert(err + '');
      });
    setIsLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScreenTitle
        title={I18n.t('bookingForm.submitRequest')}
        backButton={true}
        onBackPress={() => {
          props.navigation.goBack();
        }}
      />
      <ScrollView
        style={{
          flex: 1,
          width: '100%',
        }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1, alignItems: 'center'}}>
          <InputField
            placeholder={I18n.t('bookingForm.workerName')}
            value={workerName}
            onChangeText={text => {
              setWorkerName(text);
            }}
            editable={false}
          />
          <InputField
            placeholder={I18n.t('bookingForm.serviceName')}
            value={serviceName}
            onChangeText={text => {
              setServiceName(text);
            }}
            editable={false}
          />
          <InputField
            placeholder={I18n.t('bookingForm.userName')}
            value={clientName}
            onChangeText={text => {
              setClientName(text);
            }}
          />
          <InputField
            placeholder={I18n.t('bookingForm.mobileNumber')}
            value={mobileNumber}
            onChangeText={text => {
              setMobileNumber(text);
            }}
          />
          <InputField
            placeholder={I18n.t('bookingForm.address')}
            value={address}
            onChangeText={text => {
              setAddress(text);
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: width - 30,
            }}>
            <SelectDropdown
              data={unitTypeDropdown}
              onSelect={(selectedItem, index) => {
                setUnitType(selectedItem);
              }}
              buttonStyle={{
                width: '49%',
                borderRadius: 7,
                marginBottom: 12,
              }}
              buttonTextStyle={{textAlign: 'left'}}
              dropdownIconPosition={'right'}
              renderDropdownIcon={() => (
                <Icon name="arrow-drop-down" size={20} color={black} />
              )}
              defaultButtonText={I18n.t('bookingForm.unitType')}
              buttonTextAfterSelection={(selectedItem, index) => selectedItem}
              rowTextForSelection={(item, index) => item}
            />

            <SelectDropdown
              data={roomsDropdown}
              defaultButtonText={I18n.t('bookingForm.noOfRooms')}
              dropdownIconPosition={'right'}
              renderDropdownIcon={() => (
                <Icon name="arrow-drop-down" size={20} color={black} />
              )}
              buttonTextStyle={{textAlign: 'left', fontSize: 16}}
              buttonStyle={{
                width: '49%',
                borderRadius: 7,
                marginBottom: 12,
              }}
              onSelect={(selectedItem, index) => {
                setNoOfRooms(selectedItem);
              }}
              buttonTextAfterSelection={(selectedItem, index) => selectedItem}
              rowTextForSelection={(item, index) => item}
            />
          </View>
          <InputField
            placeholder={I18n.t('bookingForm.unitArea')}
            value={unitArea}
            onChangeText={text => {
              setUnitArea(text);
            }}
          />
          <TouchableOpacity
            style={{width: '100%'}}
            onPress={() => {
              setOpen(true);
            }}>
            <InputField
              pointerEvents="none"
              placeholder={I18n.t('bookingForm.prefInspectionDate')}
              value={dateOfInspection}
              editable={false}
              onChangeText={text => {
                setNoOfRooms(text);
              }}
            />
          </TouchableOpacity>
          <DatePicker
            modal
            open={open}
            date={date}
            onConfirm={date => {
              setOpen(false);
              setDate(date);
              setDateOfInspection(
                date.toLocaleDateString(
                  // I18nManager.isRTL ? 'ar' : 'en',
                  options,
                ),
              );
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
          <View
            style={{width: '100%', paddingHorizontal: 15, marginBottom: 30}}>
            <TextInput
              value={description}
              placeholder={I18n.t('bookingForm.detailsAboutWork')}
              onChangeText={setDescription}
              multiline={true}
              style={{
                borderWidth: 1,
                borderColor: darkGray,
                width: '100%',
                height: 100,
                padding: 15,
                textAlign: I18nManager.isRTL ? 'right' : 'left',
                fontSize: 16,
                color: darkGray,
                borderRadius: 12,
                borderColor: '#E6E9EA',
              }}
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect={false}
            />
          </View>
          {error != '' && (
            <View
              style={{
                width: '100%',
                paddingHorizontal: 15,
                marginVertical: 15,
              }}>
              <Text style={{color: 'red', textAlign: 'left', width: '100%'}}>
                {error}
              </Text>
            </View>
          )}
          <WideButton
            isLoading={isLoading}
            onPress={submitRequest}
            title={I18n.t('bookingForm.submit')}
            style={{paddingVertical: 15, marginBottom: 10}}
          />
        </KeyboardAvoidingView>
      </ScrollView>
      <SuccessModal
        visible={successModalVisible}
        description={I18n.t('bookingForm.success')}
        onConfirm={() => {
          props.navigation.navigate('Categories');
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
  },
});

export default BookingForm;
