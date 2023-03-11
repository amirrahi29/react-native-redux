import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import myStyles from './css/Styles';
import { ADD_CART, REMOVE_CART } from './redux/actions/action';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {

  const navigation = useNavigation();

  const [product, setProduct] = useState([]);
  const dispatch = useDispatch();
  const getCartData = useSelector((state) => state.cartReducer.carts);

  useEffect(() => {
    getAllProduct();
  }, []);

  const getAllProduct = async () => {
    let result = await fetch("https://fakestoreapi.com/products");
    result = await result.json();
    if (result) {
      setProduct(result);
    }
  }

  return (
    <View style={myStyles.container}>
      <View style={{
        backgroundColor: 'green', width: '100%',
        marginBottom: 4,
        height: 50, justifyContent: 'center', paddingLeft: 16
      }}>
        <Text style={{ color: 'white', fontSize: 16 }}>My Home Page</Text>
      </View>
      <FlatList
        data={product}
        renderItem={({ item, index }) => {
          let isInCartlist = getCartData.find(itemm => itemm.id === item.id);
          return (
            <>
              <Image source={{ uri: item.image }} style={{ height: 200 }} />
              <Text style={{ color: 'white' }}>{item.title}</Text>
              <Text style={{ color: 'white' }}>Rs.{item.price}</Text>

              {
                isInCartlist ?
                  <TouchableOpacity
                    onPress={() => dispatch(REMOVE_CART(item))}
                    style={{
                      backgroundColor: 'red',
                      borderRadius: 8,
                      width: 150,
                      alignItems: 'center',
                      padding: 8,
                      margin: 8
                    }}>
                    <Text style={{ color: 'white' }}>Remove From Cart</Text>
                  </TouchableOpacity> :
                  <TouchableOpacity
                    onPress={() => dispatch(ADD_CART(item))}
                    style={{
                      backgroundColor: 'green',
                      borderRadius: 8,
                      width: 100,
                      alignItems: 'center',
                      padding: 8,
                      margin: 8
                    }}>
                    <Text style={{ color: 'white' }}>Add to Cart</Text>
                  </TouchableOpacity>
              }

            </>
          )
        }}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate('CartScreen')}
        style={{ backgroundColor: 'red', borderRadius: 100, position: 'absolute', top: 8, right: 8, padding: 16 }}>
        <Text style={{ color: 'white', fontSize: 20 }}>Total Items: {getCartData.length}</Text>
      </TouchableOpacity>

    </View>
  )
}

export default HomeScreen;
