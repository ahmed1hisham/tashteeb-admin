import React from 'react';
import {View, StyleSheet, Text, I18nManager} from 'react-native';
import {lightBg} from '../../../theme/colors';

const StatusTag = ({status, large}) => {
  const textColorMap = {
    pending: '#EA9000',
    done: '#0BAC6E',
    cancelled: '#E62C40',
  };
  const bgColorMap = {
    pending: '#EA90001A',
    done: '#0BAC6E1A',
    cancelled: '#E62C401A',
  };

  const statusNameMap = {
    pending: {en: 'Pending', ar: 'جاري التنفيذ'},
    done: {en: 'Done', ar: 'تم'},
    cancelled: {en: 'Cancelled', ar: 'تم الإلغاء'},
  };
  return (
    <View
      style={[
        styles.container,
        large && {borderRadius: 20},
        {backgroundColor: bgColorMap[status]},
      ]}>
      <Text
        style={[
          {fontSize: 12, color: textColorMap[status]},
          large && {fontSize: 14},
        ]}>
        {I18nManager.isRTL
          ? statusNameMap[status].ar
          : statusNameMap[status].en}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: lightBg,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginEnd: 3,
    marginBottom: 2,
  },
});

export default StatusTag;
