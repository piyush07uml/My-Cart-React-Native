
import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from './screens/HomeScreen';
import CartList from './screens/CartList';
import Bill from './screens/Bill';

import React from 'react';
import store from './redux/store';
import Products from './screens/Products';
import { Provider } from 'react-redux';

const MyNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
  CartList: { screen: CartList },
  Bill: { screen: Bill }
}, {
    defaultNavigationOptions: {
      headerTitleStyle: {
        color: '#fff'

      },
      headerStyle: {
        backgroundColor: '#3498DB'
      },
      headerTintColor: '#fff'

    }
  });

let Navigation = createAppContainer(MyNavigator);





export default class App extends React.Component {
  render() {
    return (
      <Provider store={store} >
        <Navigation />
      </Provider>
    );
  }
}


