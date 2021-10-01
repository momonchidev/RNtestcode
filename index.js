import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from './app.json';
import { Provider } from "react-redux";

import configStore from './src/store/store'

const store = configStore;

const CrmApp = () =>
    <Provider store={store}>
        <App />
    </Provider>

AppRegistry.registerComponent(appName,()=> CrmApp);