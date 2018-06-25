import App, { Container } from 'next/app'
import React from 'react'
import { Provider } from 'react-redux'
import withRedux, { setPromise } from 'next-redux-wrapper'
import withReduxSaga from 'next-redux-saga'
import * as actions from '../src/redux/actions'

import createStore from '../src/redux/store'

class Bookdash extends App {
  static async getInitialProps ({ Component, ctx }) {
    // Get session info upon every request
    ctx.store.dispatch(actions.retrieveSession(ctx.req))

    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render () {
    const { Component, pageProps, store } = this.props

    return (
      <Container>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    )
  }
}

export default withRedux(createStore)(
  withReduxSaga({
    async: false
  })(Bookdash))