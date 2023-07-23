import { useState } from 'react'
import { useRoutes, BrowserRouter } from 'react-router-dom'
import { ShoppingCarProvider } from '../../Context'
import Home from '../Home'
import MyAccount from '../MyAccount'
import MyOrder from '../MyOrder'
import MyOrders from '../MyOrders'
import NotFound from '../NotFound'
import SingIn from '../SingIn'
import Navbar from '../../Components/Navbar'
import CheckoutSideMenu from '../../Components/CheckoutSideMenu'
import './App.css'


const AppRoutes = () => {
  let routes = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/clothes', element: <Home /> },
    { path: '/electronics', element: <Home /> },
    { path: '/furnitures', element: <Home /> },
    { path: '/toys', element: <Home /> },
    { path: '/others', element: <Home /> },
    { path: '/my-account', element: <MyAccount /> },
    { path: '/my-orders/last', element: <MyOrder /> },
    { path: '/my-orders/:id', element: <MyOrder /> },
    { path: '/my-orders', element: <MyOrders /> },
    { path: '/sing-in', element: <SingIn /> },
    { path: '/*', element: <NotFound /> }
  ])

  return routes
}

function App() {


  return (  
        <ShoppingCarProvider>
          <BrowserRouter>
            <AppRoutes/>
            <Navbar />
            <CheckoutSideMenu/>
          </BrowserRouter>
        </ShoppingCarProvider>
  )
}

export default App
