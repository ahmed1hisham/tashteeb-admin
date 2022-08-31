import I18n from 'i18n-js';
import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  I18nManager,
  TouchableOpacity,
} from 'react-native';
import {black, lightBg, mint} from '../../../theme/colors';
import StatusTag from '../../kit/StatusTag/StatusTag';
import RatingRow from '../RatingRow/RatingRow';

const AdminRequestCard = ({request, onPress}) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  };
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View>
        <Text style={styles.titleStyle}>{request.requesterName}</Text>
        <Text style={[styles.subtitleStyle]}>
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
    </TouchableOpacity>
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
  subtitleStyle: {
    fontSize: 14,
    color: mint,
    textAlign: 'left',
    width: '90%',
  },
  dateStyle: {
    fontSize: 14,
    color: black,
    textAlign: 'left',
    marginTop: 10,
  },
});

export default AdminRequestCard;
