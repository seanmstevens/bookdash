import React from 'react'
import PropTypes from 'prop-types'
import withRoot from '../src/withRoot'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'

import Grid from '@material-ui/core/Grid'
import SignupForm from '../src/components/Form/SignupForm'
import WelcomeBox from '../src/components/WelcomeBox/WelcomeBox'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  root: {
    flex: '1 1 100%',
    maxWidth: '100%',
    padding: 0,
    margin: 0,
  },
  section: {
    padding: '1rem',
    height: '100vh',
    minHeight: 440
  },
  [theme.breakpoints.up('lg')]: {
    formContainer: {
      maxWidth: '80%',
      margin: 'auto',
      padding: 24
    }
  },
  welcomeBox: {
    background: theme.palette.secondary.main
  },
  signupBox: {
    background: 'url("static/images/get-started-bookstack.jpg")',
    backgroundSize: 'cover'
  },
})

const GetStarted = props => {
  const { classes } = props

  return (
    <Grid className={classes.root} container direction="row">
      <Grid xs={12} md={7} item className={classNames(classes.section, classes.welcomeBox)} component="section">
        <WelcomeBox />
      </Grid>
      <Grid xs={12} md={5} item className={classNames(classes.section, classes.signupBox)} component="section">
        <Grid item className={classes.formContainer}>
          <SignupForm />
        </Grid>
      </Grid>
    </Grid>
  )
}

GetStarted.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withRoot(withStyles(styles)(GetStarted))