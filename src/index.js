import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css'
import configureStore from './store/configureStore';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react';
import "antd/dist/antd.css";

require('dotenv').config()


const { persistor, store } = configureStore()
const routerContext = React.createContext('light');

ReactDOM.render(
    (<Provider store={store} context={routerContext}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
