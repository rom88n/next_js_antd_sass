import App from 'next/app';
import withReduxSaga from 'next-redux-saga';
import configureStore from '../redux-base/store';

class MainApp extends App {

  static async getInitialProps ({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ctx });
    }

    return { pageProps };
  }

  render () {
    const { Component, pageProps, router } = this.props;

    return (
      <Component {...pageProps} router={router} />
    );
  }
}

export default configureStore.withRedux(withReduxSaga(MainApp));
