import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css'   // 👈 Tailwind styles
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import counterReducer  from './redux/counterSlice.js'
import { CartProvider } from "./Hooks/UseCart.jsx"

let store = configureStore({
  reducer: { counterReducer }
})


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="778796572839-sjdgv0d8vv1rbt4snnbb914bpl6odbqj.apps.googleusercontent.com">
      <Provider store={store}>
        <CartProvider>
        <App />
        </CartProvider>
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
)

"use client"


