import I18n from 'i18n-js';
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
} from 'react-native';
import ProfessionalCard from '../../components/common/ProfessionalCard/ProfessionalCard';
import ScreenTitle from '../../components/kit/ScreenTitle/ScreenTitle';
import {getProfessionals} from '../../services/ProfessionalsService';
import {blue} from '../../theme/colors';

const ProfessionalsList = props => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setIsLoading(true);
    await getProfessionals(props.route.params.categoryKey)
      .then(res => {
        setItems(res);
        console.log(JSON.stringify(res));
      })
      .catch(err => {
        console.log(err);
      });

    setIsLoading(false);
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScreenTitle
        title={props.route.params.categoryName}
        backButton={true}
        onBackPress={() => {
          props.navigation.goBack();
        }}
      />
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color={blue} size={'large'} />
        </View>
      ) : (
        <FlatList
          data={items}
          renderItem={({item}) => {
            return (
              <ProfessionalCard
                navigation={props.navigation}
                professional={item}
                category={props.route.params.categoryKey}
              />
            );
          }}
          keyExtractor={item => item.id}
          style={{width: '100%'}}
          contentContainerStyle={{paddingVertical: 20}}
          ItemSeparatorComponent={() => <View style={{height: 15}} />}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default ProfessionalsList;
