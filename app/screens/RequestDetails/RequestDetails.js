import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Alert,
  ScrollView,
  Dimensions,
  Text,
  I18nManager,
  TouchableOpacity,
  Linking,
  Platform,
  ActivityIndicator,
} from 'react-native';
import ScreenTitle from '../../components/kit/ScreenTitle/ScreenTitle';
import {black, blue, mint, primary} from '../../theme/colors';
import WideButton from '../../components/kit/WideButton/WideButton';
import I18n from 'i18n-js';
import StatusTag from '../../components/kit/StatusTag/StatusTag';
import {Icon} from 'react-native-elements';
import {changeRequestStatus} from '../../services/RequestsService';

const {width, height} = Dimensions.get('window');
export default RequestDetails = props => {
  const [isLoading, setIsLoading] = useState(false);

  const [request, setRequest] = useState(props.route.params.request);

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
  const acceptOrRejectRequest = isAccepted => {
    Alert.alert(
      isAccepted ? 'Marking as Done' : 'Rejecting Request',
      `Are you sure you want to ${
        isAccepted ? 'mark request as done' : 'reject request'
      }`,
      [
        {
          text: 'Cancel',
          onPress: () => {
            console.log('');
          },
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            updateRequestStatus(isAccepted ? 'done' : 'cancelled');
          },
        },
      ],
      {cancelable: false},
    );
  };

  const callNumber = phone => {
    Linking.openURL(`tel:${phone}`);
  };

  const updateRequestStatus = async status => {
    setIsLoading(true);
    await changeRequestStatus(request.id, status)
      .then(res => {
        // console.log(res);
        setRequest(old => ({...old, status: status}));
        Alert.alert('Success');
      })
      .catch(err => {
        console.log(err);
        // Alert.alert(err);
      });
    setIsLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* {isLoading && (
        <View
          style={{
            position: 'absolute',
            backgroundColor: '#0000001A',
            flex: 1,
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10,
          }}>
          <ActivityIndicator color={'white'} size={'small'} />
        </View>
      )} */}
      <ScreenTitle
        title={I18n.t('profile.requestDetails')}
        backButton={true}
        onBackPress={() => props.navigation.goBack()}
      />
      <ScrollView
        contentContainerStyle={{padding: 20}}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <View style={{marginBottom: 15}}>
          <Text style={styles.name}>{'#' + request.id}</Text>
          <StatusTag status={request.status} large />
        </View>
        <View
          style={{
            width: '100%',
            height: 1,
            backgroundColor: '#d3d3d3',
            marginVertical: 10,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'flex-end',
          }}>
          <Text style={styles.dateStyle}>
            {new Date(request.createdAt.toDate()).toLocaleDateString(
              I18nManager.isRTL ? 'ar' : 'en-GB',
              options,
            )}
          </Text>
        </View>
        <View style={styles.headerContainer}>
          <View>
            <Text style={styles.titleStyle}>{request.requesterName}</Text>
            <TouchableOpacity
              hitSlop={{top: 10, left: 10, right: 10, bottom: 10}}
              onPress={() => {
                callNumber(request.mobileNumber);
              }}>
              <Text style={styles.info}>{request.mobileNumber}</Text>
            </TouchableOpacity>
            <Text style={[styles.titleStyle, {marginTop: 10}]}>
              {request.workerName[I18nManager.isRTL ? 'ar' : 'en'] +
                ' - ' +
                I18n.t('home.' + request.serviceKey)}
            </Text>
            <TouchableOpacity
              hitSlop={{top: 10, left: 10, right: 10, bottom: 10}}
              onPress={() =>
                request.workerMobileNumber
                  ? callNumber(request.workerMobileNumber)
                  : null
              }>
              <Text style={styles.info}>
                {request.workerMobileNumber
                  ? request.workerMobileNumber
                  : 'No Worker Number in DB'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            width: '100%',
            height: 1,
            backgroundColor: '#d3d3d3',
            marginVertical: 10,
          }}
        />
        <View style={styles.bodyContent}>
          <View style={styles.sectionStyle}>
            <Text style={styles.bodyTitleStyle}>Unit Info</Text>
            <Text
              style={
                styles.bodyTextStyle
              }>{`${request.unitType} - ${request.noOfRooms} Rooms - ${request.unitArea} m2`}</Text>
          </View>
          <View style={styles.sectionStyle}>
            <Text style={styles.bodyTitleStyle}>
              {I18n.t('bookingForm.address')}
            </Text>
            <Text style={styles.bodyTextStyle}>{request.address}</Text>
          </View>
          <View style={styles.sectionStyle}>
            <Text style={styles.bodyTitleStyle}>
              {I18n.t('home.inspectionDate')}
            </Text>
            <Text style={styles.bodyTextStyle}>
              {new Date(request.dateOfInspection.toDate()).toLocaleDateString(
                I18nManager.isRTL ? 'ar' : 'en-GB',
                options,
              )}
            </Text>
          </View>
          <View style={styles.sectionStyle}>
            <Text style={styles.bodyTitleStyle}>More Details</Text>
            <Text style={styles.bodyTextStyle}>{request.description}</Text>
          </View>
        </View>
      </ScrollView>
      {/* <TouchableOpacity
        style={{
          backgroundColor: primary,
          flexDirection: 'row',
          padding: 15,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 30,
        }}>
        <Icon name="phone" size={24} color="white" />
        <Text style={{fontSize: 16, color: 'white'}}>Call Client</Text>
      </TouchableOpacity> */}
      <View
        style={{
          width: width,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 5,
        }}>
        <WideButton
          style={{
            width: 150,
            paddingVertical: 15,
            alignSelf: 'center',
            marginRight: 10,
            backgroundColor: '#E62C40',
          }}
          title={I18n.t('profile.reject')}
          onPress={() => {
            acceptOrRejectRequest(false);
          }}
        />
        <WideButton
          style={{
            width: 150,
            paddingVertical: 15,
            alignSelf: 'center',
            marginRight: 10,
            backgroundColor: '#0BAC6E',
          }}
          title={I18n.t('profile.markAsDone')}
          onPress={() => {
            acceptOrRejectRequest(true);
          }}
          isLoading={isLoading}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    width: '100%',
    padding: 15,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: black,
    marginBottom: 5,
    textAlign: 'left',
  },
  subtitleStyle: {
    fontSize: 18,
    color: black,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  dateStyle: {
    fontSize: 14,
    color: black,
    textAlign: 'left',
  },
  bodyTextStyle: {
    fontSize: 15,
    color: black,
    textAlign: 'left',
    marginTop: 10,
  },
  sectionStyle: {
    marginBottom: 15,
  },
  bodyTitleStyle: {
    fontSize: 15,
    color: black,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 63,
    alignSelf: 'center',
  },
  tagsContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 5,
    marginBottom: 20,
  },
  headerContent: {
    alignItems: 'center',
  },
  bodyContent: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  name: {
    fontSize: 18,
    color: black,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  info: {
    fontSize: 18,
    color: blue,
  },
  description: {
    width: '100%',
    textAlign: 'left',
    fontSize: 14,
    color: '#A4ACAD',
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 16,
    color: black,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 8,
  },
  ratingNumberStyle: {
    fontSize: 16,
    fontWeight: '700',
    color: black,
    marginRight: 10,
  },
  ratingSectionTitleStyle: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
});
