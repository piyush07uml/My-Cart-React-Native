import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Card, CardItem, Form, Item, Picker, Icon, Label, Button } from 'native-base'
import { connect } from 'react-redux';
import { removeItemAction, updateSizeAction, updateQuantityAction } from '../redux/actions/Action';
import { Entypo, Ionicons, FontAwesome } from '@expo/vector-icons';




class CartList extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: "Cart",
            headerRight: (
                <TouchableOpacity
                    onPress={() => navigation.navigate('Bill')}
                    style={{ flexDirection: 'row', marginEnd: 20 }}
                >

                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white', marginEnd: 10 }}>Checkout</Text>
                    <FontAwesome name="chevron-circle-right" size={23} color="white"
                        style={{ alignSelf: 'center' }} />
                </TouchableOpacity>
            ),
            headerLeft: (
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Home')

                    }}
                    style={{ marginStart: 10 }}
                >

                    <FontAwesome name="chevron-left" size={18} color="white" />
                </TouchableOpacity>
            )
        }
    }






    render() {
        const { cartBill } = this.props
        if (this.props.cartList.length === 0) {
            return (
                <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                    <Text style={{ fontSize: 25 }}>Your Cart Is Empty</Text>
                    <View>
                        <Button primary
                            style={{ padding: 15, marginTop: 10, borderRadius: 5 }}
                            onPress={() => {
                                this.props.navigation.navigate('Home')
                            }}
                        >
                            <Text>Go Back</Text>
                        </Button>
                    </View>
                </View>
            )
        }
        return (

            <View style={styles.container}>
                <FlatList
                    data={this.props.cartList}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {

                        return (
                            <Card style={styles.card} >
                                <View style={styles.infoView}>
                                    <View style={styles.imgView}>
                                        <Image
                                            source={item.img}
                                            style={styles.img}
                                        />
                                    </View>
                                    <View style={styles.sizeQuantityView}>
                                        <Text style={styles.bigText}>{item.name}</Text>


                                        <Form>
                                            <Item picker >

                                                <Label>
                                                    S:
                                                   </Label>
                                                <Picker
                                                    mode="dropdown"
                                                    iosIcon={<Icon name="arrow-down" />}
                                                    style={styles.picker}
                                                    placeholder="S"
                                                    placeholderStyle={{ color: "#bfc6ea" }}
                                                    placeholderIconColor="#007aff"
                                                    selectedValue={item.size}
                                                    onValueChange={(value) => this.props.updateSizeAction(value, item.id)}
                                                >
                                                    <Picker.Item label="Small" value="S" />
                                                    <Picker.Item label="Medium" value="M" />
                                                    <Picker.Item label="Large" value="L" />
                                                    <Picker.Item label="Xtra Large" value="XL" />

                                                </Picker>
                                            </Item>

                                            <Item picker >

                                                <Label>
                                                    Q:
                                                   </Label>

                                                <Picker
                                                    mode="dropdown"
                                                    iosIcon={<Icon name="arrow-down" />}
                                                    style={styles.picker}
                                                    placeholder="Q"
                                                    placeholderStyle={{ color: "#bfc6ea" }}
                                                    placeholderIconColor="#007aff"
                                                    selectedValue={item.quantity}
                                                    onValueChange={(value) => this.props.updateQuantityAction(value, item.id)}
                                                >
                                                    <Picker.Item label="1" value="1" />
                                                    <Picker.Item label="2" value="2" />
                                                    <Picker.Item label="3" value="3" />
                                                    <Picker.Item label="4" value="4" />

                                                </Picker>
                                            </Item>
                                        </Form>


                                    </View>
                                    <View style={styles.iconView}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                this.props.removeItemAction(item)
                                            }}
                                        >

                                            <FontAwesome name="trash" size={35} color="gray" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <CardItem footer bordered style={styles.priceItem}>
                                    <Text style={styles.bigText}>Total: {item.price} {'\u20B9'} {<FontAwesome name="times" size={15} color="green" />} {item.quantity} = {item.totalPrice} {'\u20B9'}</Text>
                                </CardItem>
                            </Card>
                        )
                    }}
                >

                </FlatList>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cartList: state.data.cartList,
        cartBill: state.data.cartBill
    }
}


export default connect(mapStateToProps, { removeItemAction, updateSizeAction, updateQuantityAction })(CartList);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ccc'
    },
    card: {
        marginHorizontal: 40,
        marginTop: 20
    },
    infoView: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    imgView: {
        flex: 1,
        justifyContent: 'center'
    },
    img: {
        width: 100,
        height: 100,
        marginVertical: 10
    },
    sizeQuantityView: {

        flex: 1,
        justifyContent: 'center',
        alignSelf: 'flex-start',
        marginTop: 15
    },
    bigText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#30336B'
    },
    priceItem: { flex: 1, justifyContent: "center" },
    iconView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingEnd: 20
    },
    picker: {
        width: 10

    }

})