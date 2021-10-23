import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, FlatList, Image, } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { selectQuantityAction, selectSizeAction, cartUpdateAction, refresh } from '../redux/actions/Action';
import { Badge } from 'react-native-elements';
import { Card, CardItem, Button, Drawer, Container, Header, Content, Form, Item, Picker, Label } from 'native-base';
import Products from './Products';


class HomeScreen extends React.Component {


    static navigationOptions = ({ navigation }) => {


        const cartList = navigation.getParam('cartList');
        console.log("getp", cartList)
        return {
            headerTitle: "Products",
            headerRight: (<TouchableOpacity
                style={{ marginEnd: 10 }}
                onPress={() => {
                    navigation.navigate('CartList')
                }}
            >
                <Badge value={cartList} status="success" />
                <FontAwesome name="shopping-cart" size={35} color="white" />
            </TouchableOpacity>),

            headerLeft: (<TouchableOpacity
                style={{ marginStart: 10 }}
                onPress={() => {
                    navigation.navigate('Home')
                }}
            >
                <FontAwesome name="home" size={35} color="white" />
            </TouchableOpacity>)


        }


    }

    componentWillMount() {
        const { navigation } = this.props
        navigation.addListener('willFocus', () => {
            navigation.setParams({
                cartList: this.props.cartList.length

            });
        })
    }




    render() {

        return (
            <View style={styles.container}>

                <FlatList
                    style={{ marginTop: 15 }}
                    data={this.props.products}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                        return <Products item={item} navigation={this.props.navigation} />
                    }}
                >
                </FlatList>
            </View>
        );
    }
}


const mapStateToProps = state => {
    return {
        products: state.data.products,
        cartList: state.data.cartList
    }
}

export default connect(mapStateToProps, { refresh })(HomeScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'gray',
        alignItems: 'center',
        justifyContent: 'center',

    }
});
