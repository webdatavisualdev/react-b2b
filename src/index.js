import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, useSelector } from 'react-redux';
import { hot } from 'react-hot-loader';
import { IntlProvider } from 'react-intl';
import { PersistGate } from 'redux-persist/integration/react';
import { ConnectedRouter } from 'connected-react-router';
import i18nMessages from './i18n';
import { getCore } from 'store/core/selectors';
import ReactGA from 'react-ga';

import Routes from 'routes';
import { store, history, persistor } from 'store';
import * as serviceWorker from 'serviceWorker';
import 'font-awesome/scss/font-awesome.scss';
import 'helpers/api/api-interceptor';
import 'index.scss';

function AppContainer() {
  const { locale } = useSelector(getCore);
  const messages = i18nMessages[locale] || i18nMessages.en;
  ReactGA.initialize('G-GGWYFC69QC');
  ReactGA.pageview(window.location.pathname + window.location.search);

  return (
    <IntlProvider locale={locale} messages={messages}>
      <ConnectedRouter history={history}>
        <Routes />
      </ConnectedRouter>
    </IntlProvider>
  );
}

const AppContainerHot = hot(module)(AppContainer);

const App = (
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppContainerHot />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

ReactDOM.render(App, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
