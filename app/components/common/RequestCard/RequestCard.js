import I18n from 'i18n-js';
import React from 'react';
import {View, StyleSheet, Text, I18nManager} from 'react-native';
import {black, lightBg} from '../../../theme/colors';
import StatusTag from '../../kit/StatusTag/StatusTag';
import RatingRow from '../RatingRow/RatingRow';

const RequestCard = ({request}) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  };
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.titleStyle}>
          {request.workerName[I18nManager.isRTL ? 'ar' : 'en'] +
            ' - ' +
            I18n.t('home.' + request.serviceKey)}
        </Text>
        <Text style={styles.dateStyle}>
          <Text style={{fontWeight: 'bold'}}>
            {I18n.t('home.requestDate')}:{' '}
          </Text>
          {new Date(request.createdAt.toDate()).toLocaleDateString(
            I18nManager.isRTL ? 'ar' : 'en-GB',
            options,
          )}
        </Text>
        <Text style={styles.dateStyle}>
          <Text style={{fontWeight: 'bold'}}>
            {I18n.t('home.inspectionDate')}:{' '}
          </Text>
          {new Date(request.dateOfInspection.toDate()).toLocaleDateString(
            I18nManager.isRTL ? 'ar' : 'en-GB',
            options,
          )}
        </Text>
      </View>
      <StatusTag status={request.status} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: black,
    textAlign: 'left',
  },
  dateStyle: {
    fontSize: 14,
    color: black,
    textAlign: 'left',
    marginTop: 10,
  },
});

export default RequestCard;
