import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider, StylesProvider } from '@material-ui/styles';
import theme from '@styles/theme';
import configureStore from '@redux/store';
import App from './App';

const store = configureStore();

const Main = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <StylesProvider injectFirst>
            <CssBaseline />
            <App />
          </StylesProvider>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
};

export default App;

if (process.env.NODE_ENV === 'development') {
  const render = () => {
    ReactDOM.render(
      <AppContainer>
        <Main />
      </AppContainer>,
      document.getElementById('root')
    );
  };

  render();
  if (module.hot) {
    module.hot.accept('./App', render());
  }
} else {
  ReactDOM.render(<Main />, document.getElementById('root'));
}
