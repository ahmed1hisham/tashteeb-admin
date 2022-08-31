import I18n from 'i18n-js';
import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {UserContext} from '../../../App';
import AdminRequestCard from '../../components/common/AdminRequestCard/AdminRequestCard';
import RequestCard from '../../components/common/RequestCard/RequestCard';
import ScreenTitle from '../../components/kit/ScreenTitle/ScreenTitle';
// import {AuthContext} from '../../contexts/AuthContext/AuthContext';
import {getOldRequests} from '../../services/RequestsService';
import {darkGray} from '../../theme/colors';

const Requests = props => {
  const [items, setItems] = useState([
    // {
    //   id: 1,
    //   professionalName: 'محمد رشاد',
    //   createdAt: '22-2-2022',
    //   status: 'pending',
    //   category: 'electricity',
    // },
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const {currentUser, setCurrentUser} = useContext(UserContext);

  useEffect(() => {
    console.log('User is: ' + JSON.stringify(currentUser, null, 2));
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setIsLoading(true);
    // async call here
    await getOldRequests()
      .then(res => {
        console.log(JSON.stringify(res));
        setItems(res);
      })
      .catch(err => {
        console.log(err);
      });

    setIsLoading(false);
  };

  const refreshItems = async () => {
    setIsRefreshing(true);
    await getOldRequests()
      .then(res => {
        console.log(JSON.stringify(res));
        setItems(res);
      })
      .catch(err => {
        console.log(err);
      });
    setIsRefreshing(false);
  };
  const goToRequestDetails = request => {
    props.navigation.navigate('RequestDetails', {request: request});
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScreenTitle title={I18n.t('navbar.history')} />
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color={'black'} size={'large'} />
        </View>
      ) : (
        <FlatList
          style={{flex: 1, width: '100%'}}
          contentContainerStyle={{paddingHorizontal: 20, paddingVertical: 20}}
          data={items}
          renderItem={({item}) => {
            return (
              <AdminRequestCard
                request={item}
                onPress={() => {
                  goToRequestDetails(item);
                }}
              />
            );
          }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{height: 15}} />}
          ListEmptyComponent={() => (
            <View style={{width: '100%', alignItems: 'center'}}>
              <Text style={{fontSize: 16, color: darkGray}}>No Requests</Text>
            </View>
          )}
          refreshing={isRefreshing}
          onRefresh={refreshItems}
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

export default Requests;
