import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { applyCouponAction } from '../redux/actions/Action';
import { Card, CardItem, Button } from 'native-base';
import { Entypo, Ionicons, FontAwesome } from '@expo/vector-icons';



class Bill extends Component {


    state = {
        text: null
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Bill',
            headerRight: (<TouchableOpacity
                style={{ marginEnd: 10 }}
                onPress={() => {
                    navigation.navigate('Home')
                }}
            >
                <FontAwesome name="home" size={35} color="white" />
            </TouchableOpacity>)
        }


    }



    render() {
        const { cartBill, cartList } = this.props


        if (this.props.cartList.length === 0) {
            return (
                <View style={styles.emptyBillContainer}>
                    <Text style={styles.emptyBillText}>Add Items To The Cart First</Text>
                    <View>
                        <Button primary
                            style={styles.emptyBillBtn}
                            onPress={() => {
                                this.props.navigation.navigate('Home')
                            }}
                        >
                            <Text>Go To Home</Text>
                        </Button>
                    </View>
                </View>
            )
        }






        return (
            <ScrollView>
                <View style={styles.container}>

                    <View style={{ marginBottom: 40 }}>

                        <View>
                            <Text style={styles.textCoupon}>Have A Coupon?</Text>
                        </View>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={(text) => this.setState({ text })}
                            value={this.state.text}
                        />

                        {cartBill.isCouponApplied ?
                            (<View style={{ flexDirection: 'row' }}>
                                <Text style={{ color: 'green', marginEnd: 5 }}>Coupon Is Applied</Text>
                                <FontAwesome name="check-circle" size={20} color="green" />
                            </View>)

                            : null}
                        <TouchableOpacity >
                            <Button
                                full
                                primary
                                onPress={() => this.props.applyCouponAction(this.state.text)}
                            ><Text style={styles.btnCoupon}>Apply Coupon</Text>
                            </Button>
                        </TouchableOpacity>
                    </View>


                    <Card  >

                        <CardItem bordered style={styles.itemCard}>
                            <Text style={styles.textBillingHeader}>Billing</Text>
                        </CardItem>

                        <CardItem bordered>
                            <View style={styles.billInfo}><Text style={styles.text}>No. Of Items:-</Text></View>
                            <View style={styles.billDetails}><Text style={styles.text}>{cartList.length}</Text></View>
                        </CardItem>
                        <CardItem bordered>
                            <View style={styles.billInfo}><Text style={styles.text}>Total Amount:-</Text></View>
                            <View style={styles.billDetails}><Text style={styles.text}>{cartBill.billAmount.toFixed(2)} {'\u20B9'}</Text></View>
                        </CardItem>

                        <CardItem bordered>
                            <View style={styles.billInfo}><Text style={styles.text}>GST(18%):-</Text></View>
                            <View style={styles.billDetails}><Text style={styles.text}>{cartBill.billGST.toFixed(2)} {'\u20B9'}</Text></View>
                        </CardItem>

                        <CardItem bordered>
                            <View style={styles.billInfo}><Text style={styles.text}>Discount Applied:-</Text></View>
                            <View style={styles.billDetails}><Text style={styles.text}>{cartBill.billDiscount.toFixed(2)} {'\u20B9'}</Text></View>
                        </CardItem>

                        <CardItem bordered footer>
                            <View style={styles.billInfo}><Text style={styles.textBig}>Total</Text></View>
                            <View style={styles.billDetails}><Text style={styles.text}>{cartBill.billTotal.toFixed(2)} {'\u20B9'}</Text></View>
                        </CardItem>

                    </Card>

                    <Button
                        full

                        style={styles.btnProceed}
                    >
                        <Text style={styles.textProceed}>Proceed To Pay</Text>
                        <FontAwesome name="chevron-circle-right" size={30} color="white" />
                    </Button>
                </View>
            </ScrollView>
        )
    }
}




const mapStateToProps = (state) => {
    return {
        cartBill: state.data.cartBill,
        cartList: state.data.cartList
    }
}


export default connect(mapStateToProps, { applyCouponAction })(Bill);





const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: "flex-start",
        margin: 20

    },
    emptyBillContainer: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemCard: {
        flex: 1,
        justifyContent: 'center'
    },
    text: {
        fontSize: 15,
        color: '#3498DB',
        fontWeight: 'bold'

    },
    textBig: {
        fontSize: 18,
        color: '#3498DB',
        fontWeight: 'bold'

    },
    emptyBillText: { fontSize: 25 },

    emptyBillBtn: {
        padding: 15,
        marginTop: 10,
        borderRadius: 5
    },

    textBillingHeader: {
        textAlign: "center",
        fontSize: 25,
        color: '#3498DB',
        fontWeight: 'bold'
    },
    textInput: {
        height: 40,
        borderColor: '#758AA2',
        borderWidth: 2,
        marginBottom: 5
    },
    textCoupon: {
        fontSize: 18,
        padding: 10,
        fontWeight: 'bold',
        color: '#EA7773'
    },
    billInfo: {
        flex: 2
    },
    billDetails: {
        flex: 1
    },
    btnCoupon: {
        color: 'white',
        fontSize: 15
    },
    btnProceed: {
        backgroundColor: '#3498DB',
        borderRadius: 10,
        marginTop: 40
    },
    textProceed: {
        color: 'white',
        fontSize: 17,
        marginEnd: 10
    }
})