import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider, StylesProvider } from '@material-ui/styles';
import { SnackbarProvider } from 'notistack';
import theme from '@styles/theme';
import configureStore from '@redux/store';
import history from '@utils/history';
import '@assets/favicon.png';
import App from './App';

const store = configureStore();

const Main = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <ThemeProvider theme={theme}>
          <StylesProvider injectFirst>
            <CssBaseline />
            <SnackbarProvider
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'center'
              }}
            >
              <App />
            </SnackbarProvider>
          </StylesProvider>
        </ThemeProvider>
      </Router>
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
