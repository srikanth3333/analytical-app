import React from 'react'
import { NativeBaseProvider} from 'native-base';
import AppStack from './src/navigation/appStack/index';
import store from './src/redux/store'
import { Provider } from 'react-redux';

const App = () => {

  
  return (
    <Provider store={store}>
      <NativeBaseProvider>
          <AppStack />
      </NativeBaseProvider>
    </Provider>
  )
}

export default App;
