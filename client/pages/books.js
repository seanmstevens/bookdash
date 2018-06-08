import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import withRoot from '../src/withRoot'
import { withStyles } from '@material-ui/core/styles'
import Link from 'next/link'

import Page from '../src/layouts/Main'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import BookList from '../src/components/BookList/BookList'

const Books = props => {
  const { books } = props

  return (
    <BookList books={[{ title: 'book1', author: 'author1' }]} />
  )
}

export default withStyles()(Books)