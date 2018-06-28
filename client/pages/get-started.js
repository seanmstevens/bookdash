import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Link from 'next/link'
import classNames from 'classnames'

import Grid from '@material-ui/core/Grid'
import SignupCard from '../src/components/Form/Signup/SignupCard'
import WelcomeBox from '../src/components/WelcomeBox/WelcomeBox'
import IconButton from '@material-ui/core/IconButton'
import NavigateBefore from '@material-ui/icons/NavigateBefore'

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
    minHeight: 488
  },
  [theme.breakpoints.up('lg')]: {
    formContainer: {
      padding: 24
    }
  },
  backButton: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.08)'
  },
  welcomeBox: {
    background: theme.palette.secondary.main
  },
  signupBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'url("static/images/get-started-bookstack.jpg")',
    backgroundSize: 'cover'
  },
})

const GetStarted = props => {
  const { classes } = props

  return (
    <Grid className={classes.root} container direction="row">
      <Grid
        xs={12}
        md={7}
        item
        className={classNames(classes.section, classes.welcomeBox)}
        component="section"
      >
        <Link prefetch href="/">
          <IconButton className={classes.backButton}>
            <NavigateBefore />
          </IconButton>
        </Link>
        <WelcomeBox />
      </Grid>
      <Grid
        xs={12}
        md={5}
        item
        className={classNames(classes.section, classes.signupBox)}
        component="section"
      >
        <Grid container spacing={16} className={classes.formContainer} justify="center">
          <Grid item xs={12} md={9}>
            <SignupCard />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

GetStarted.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(GetStarted)