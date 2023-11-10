import axios from 'axios'
import {useEffect} from 'react'
import {createContext, useState} from 'react'
export let StoreContext = createContext(0)
export default function StoreContextProvider(props) {
  const [count, setCount] = useState(0)
  const [categoryList, setCategoryList] = useState([])

  // get Categories fun
  async function getAllCategories() {
    let {data} = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories`,
    )
    setCategoryList(data.data)
  }
  useEffect(() => {
    getAllCategories()
  }, [])

  // add to cart fun
  function addTOCart(token, productId) {
    return axios
      .post(
        'https://ecommerce.routemisr.com/api/v1/cart',
        {productId},
        {headers: {token}},
      )
      .then(data => data)
      .catch(error => error)
  }
  // get cards fun
  function getUserCart(token) {
    return axios
      .get('https://ecommerce.routemisr.com/api/v1/cart', {headers: {token}})
      .then(data => data)
      .catch(error => error)
  }
  function deleteCart(token, productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers: {token},
      })
      .then(data => data)
      .catch(error => error)
  }
  function updateQty(token, productId, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {count},
        {headers: {token}},
      )
      .then(data => data)
      .catch(error => error)
  }
  function getCartCount(token) {
    axios
      .get('https://ecommerce.routemisr.com/api/v1/cart', {headers: {token}})
      .then(data => {
        setCount(data.data.numOfCartItems)
      })
      .catch(error => {
        console.log(error)
      })
  }
  useEffect(() => {
    let token = localStorage.getItem('token')
    getCartCount(token)
  }, [])

  return (
    <StoreContext.Provider
      value={{
        categoryList,
        addTOCart,
        getUserCart,
        getCartCount,
        count,
        deleteCart,
        updateQty,
      }}
    >
      {props.children}
    </StoreContext.Provider>
  )
}
