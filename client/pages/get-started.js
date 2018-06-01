import React from 'react'
import PropTypes from 'prop-types'
import withRoot from '../src/withRoot'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'

import Page from '../src/layouts/Main'
import Grid from '@material-ui/core/Grid'
import SignupForm from '../src/components/Form/SignupForm'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 80,
    flex: '1 1 100%',
    maxWidth: '100%',
    margin: '0 auto',
  }),
  [theme.breakpoints.up('lg')]: {
    root: {
      maxWidth: theme.breakpoints.values.lg
    },
    formContainer: {
      maxWidth: '40%',
      margin: 'auto'
    }
  },
  formContainer: {
    padding: 24
  }
})

const GetStarted = props => {
  const { classes } = props

  return (
    <Page>
      <Grid className={classes.root} container direction="column">
        <Grid item>
          <Typography variant="display1" component='h4'>
            Register for an account
          </Typography>
        </Grid>
        <Grid item className={classes.formContainer}>
          <SignupForm />
        </Grid>
      </Grid>
    </Page>
  )
}

GetStarted.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withRoot(withStyles(styles)(GetStarted))