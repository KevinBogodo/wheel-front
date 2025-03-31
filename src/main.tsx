import React from 'react'
import App from './App.tsx'
import ReactDOM from 'react-dom/client'
// import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from "react-redux"
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './slice'
import './index.css'

const store = configureStore({ reducer: rootReducer, devTools: true})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <Provider store={store}>
    <React.Fragment>
      <BrowserRouter basename={""}>
        {/* <StrictMode> */}
          <App />
        {/* </StrictMode> */}
      </BrowserRouter>
    </React.Fragment>
  </Provider>
)
