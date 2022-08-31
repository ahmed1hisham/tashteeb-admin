// import React, {useEffect} from 'react';
// import {View, StyleSheet} from 'react-native';
// import Auth, {AuthEventEmitter, AuthEvents} from 'react-native-firebaseui-auth';

// const Login = props => {
//   useEffect(() => {
//     const eventListener = AuthEventEmitter.addListener(
//       AuthEvents.AUTH_STATE_CHANGED,
//       event => {
//         console.log('user:', event.user);
//       },
//     );

//     return () => {
//       eventListener.remove();
//     };
//   }, []);

//   return <View style={styles.container}></View>;
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default Login;
