import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Image, } from 'react-native';

import { connect } from 'react-redux';
import { cartUpdateAction } from '../redux/actions/Action';
import { Card, CardItem, Button, Form, Item, Picker, Icon, Label } from 'native-base';


class Products extends React.Component {



    state = {
        size: 'S',
        quantity: 1,
        isInCart: false
    };

    static navigationOptions = {
        title: "Products"
    }




    componentWillMount() {
        const { navigation } = this.props
        navigation.addListener('willFocus', () => {
            this.updateCartStatus();

        })
    }


    updateCartStatus = () => {
        const { item } = this.props;

        const { cartList } = this.props;

        let status = false

        if (cartList.length === 0) {
            return this.setState({
                isInCart: false
            })
        }
        cartList.map((product) => {
            product.id === item.id ? status = true : product
            return product
        });



        this.setState({
            isInCart: status
        })

    }








    selectSize(value) {
        this.setState({
            size: value
        });
    }

    selectQuantity(value) {

        this.setState({
            quantity: value
        });
    }

    cartUpdate = (item) => {

        if (this.state.isInCart) {
            return this.props.navigation.navigate('CartList');

        }

        const { size, quantity } = this.state;
        const cartItem = {
            item,
            size,
            quantity
        };

        this.props.cartUpdateAction(cartItem);

        this.setState({
            isInCart: true
        }, () => {
            const { navigation } = this.props
            navigation.setParams({
                cartList: this.props.cartList.length

            })
        }
        )

    }


    render() {
        const { item } = this.props;
        return (
            <Card style={{ marginBottom: 20 }}>
                <CardItem header bordered style={styles.headerItem}>
                    <Image
                        source={item.img}
                        style={styles.img}

                    />

                    <Text style={styles.nameText}>{item.name}</Text>
                </CardItem>


                <Form>
                    <Item picker >

                        <Label style={{ marginStart: 10, color: '#3498DB' }}>Select Size: </Label>

                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down" />}
                            style={styles.picker}
                            placeholder="Select Size"
                            placeholderStyle={{ color: "#bfc6ea" }}
                            placeholderIconColor="#007aff"
                            selectedValue={this.state.size}
                            onValueChange={(value) => this.selectSize(value)}
                        >
                            <Picker.Item label="Small" value="S" />
                            <Picker.Item label="Medium" value="M" />
                            <Picker.Item label="Large" value="L" />
                            <Picker.Item label="Xtra Large" value="XL" />

                        </Picker>
                    </Item>

                    <Item picker >

                        <Label style={{ marginStart: 10, color: '#3498DB' }}>Select Quantity: </Label>

                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down" />}
                            style={styles.picker}
                            placeholder="Select Size"
                            placeholderStyle={{ color: "#bfc6ea" }}
                            placeholderIconColor="#007aff"
                            selectedValue={this.state.quantity}
                            onValueChange={(value) => this.selectQuantity(value)}
                        >
                            <Picker.Item label="1" value="1" />
                            <Picker.Item label="2" value="2" />
                            <Picker.Item label="3" value="3" />
                            <Picker.Item label="4" value="4" />

                        </Picker>
                    </Item>
                </Form>


                <CardItem bordered style={styles.cardItem}>
                    <Text style={styles.text}>Price: {item.price} {'\u20B9'}</Text>
                </CardItem>

                <CardItem style={styles.cardItem}
                    footer bordered
                >

                    <TouchableOpacity>
                        <Button full success
                            style={styles.btn}
                            onPress={() => this.cartUpdate(item)}
                        >
                            {this.state.isInCart ? <Text style={styles.btnText}>Go To Cart</Text> :
                                <Text style={styles.btnText}>Add To Cart</Text>
                            }

                        </Button>
                    </TouchableOpacity>
                </CardItem>

            </Card>
        )

    }
}


const mapStateToProps = state => {
    return {
        products: state.data.products,
        cartList: state.data.cartList
    }
}

export default connect(mapStateToProps, { cartUpdateAction })(Products)

const styles = StyleSheet.create({
    img: {
        height: 200,
        width: 300,

    },
    cardItem: {
        flex: 1,
        justifyContent: 'center'

    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',

    },
    btn: {
        padding: 15,
        borderRadius: 10
    },
    btnText: {
        color: '#fff'
    },
    headerItem: {
        flexDirection: "column"
    },
    nameText: {
        marginTop: 10,
        fontSize: 18,
        fontWeight: 'bold'
    },
    picker: {
        width: 10
    }
});
