import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Link from 'next/link'
import * as actions from '../src/redux/actions'

import Page from '../src/layouts/Main'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import BookList from '../src/components/BookList/BookList'

class Books extends Component {
  static async getInitialProps ({ store, isServer }) {

    if (!store.getState().dashboard.data) {
      store.dispatch(actions.loadBooks())
    }

    return { isServer }
  }

  render () {
    return (
      <BookList books={this.props.books} />
    )
  }
}

const mapStateToProps = (state) => ({
  books: state.dashboard.data
})

export default withStyles()(connect(mapStateToProps)(Books))