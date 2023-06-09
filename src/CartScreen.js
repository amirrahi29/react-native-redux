import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import RazorpayCheckout from 'react-native-razorpay';
import { REMOVE_CART } from './redux/actions/action';

const CartScreen = () => {

    const [price, setPrice] = useState(0);
    const getCartData = useSelector((state) => state.cartReducer.carts);
    const dispatch = useDispatch();

    const getTotal = () => {
        let p = 0;
        getCartData.map((e, k) => {
            p = parseInt(e.price) + p;
        });
        setPrice(p);
    }

    useEffect(() => {
        getTotal();
    }, [getTotal]);

    return (
        <View style={{ flex: 1, backgroundColor: 'pink' }}>

            {
                getCartData.length > 0 ?
                    <FlatList
                        data={getCartData}
                        renderItem={({ item, index }) => {
                            return (
                                <>
                                    <View style={{ flexDirection: 'row', backgroundColor: 'green', margin: 8, borderRadius: 8, padding: 8 }}>
                                        <Image source={{ uri: item.image }} style={{ height: 50, width: 50, borderRadius: 100 }} />
                                        <Text style={{ flex: 1, margin: 8 }}>{item.title}</Text>
                                        <Text style={{ flex: 1, margin: 8 }}>Rs. {item.price}</Text>

                                        <TouchableOpacity
                                            onPress={() => dispatch(REMOVE_CART(item))}>
                                            <Text style={{ color: 'white', fontSize: 24 }}>X</Text>
                                        </TouchableOpacity>
                                    </View>
                                </>
                            );
                        }}
                    /> : <View style={{
                        flex: 1, justifyContent: 'center', alignItems: 'center'
                    }}>
                        <Text style={{ color: 'red', fontSize: 24, fontWeight: 'bold' }}>No Items!</Text>
                    </View>
            }

            <View
                style={{ backgroundColor: 'red', borderRadius: 8, position: 'absolute', bottom: 8, left: 8, padding: 16 }}>
                <Text style={{ color: 'white', fontSize: 16 }}>Total Items: {getCartData.length}</Text>
                <Text style={{ color: 'white', fontSize: 16 }}>Total Price: Rs.{price}</Text>
                <TouchableOpacity
                onPress={() => {
                    var options = {
                      description: 'product description',
                      image: 'https://rojkharido.com/static/media/logo.30546a93.png',
                      currency: 'INR',
                      key: 'rzp_test_MjbySASEFjNhn1', // Your api key
                      amount: parseInt(price*100),
                      name: 'Amir',
                      prefill: {
                        email: 'void@razorpay.com',
                        contact: '9191919191',
                        name: 'Razorpay Software'
                      },
                      theme: {color: '#F37254'}
                    }
                    RazorpayCheckout.open(options).then((data) => {
                      // handle success
                      alert(`Success: ${data.razorpay_payment_id}`);
                    }).catch((error) => {
                      // handle failure
                      alert(`Error: ${error.code} | ${error.description}`);
                    });
                  }}>
                    <Text style={{
                        backgroundColor: 'blue', padding: 8,
                        fontSize: 20,
                        borderRadius: 8, marginTop: 8, color: 'white'
                    }}>Checkout</Text>
                </TouchableOpacity>
            </View>


        </View>
    )
}

export default CartScreen