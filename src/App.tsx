import React from 'react';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import "fontsource-roboto";
import RouterConfig from 'routes/RouterConfig';

const App: React.VFC = () => {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <RouterConfig />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
