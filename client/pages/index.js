import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Link from 'next/link'
import classNames from 'classnames'

import Page from '../src/layouts/Splash'
import Hero from '../src/components/Hero/Hero'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import AuthModal from '../src/components/AuthModal/AuthModal'

const styles = theme => ({
  root: {
    padding: 0,
    margin: 0
  },
  heroDisplay: {
    color: '#ffffff',
    textShadow: '1px 0 10px rgb(90, 86, 80)',
  },
  title: {
    fontSize: 'calc(80px + 31 * ((100vw - 375px) / 1065))'
  },
  heroMain: {
    position: 'relative',
    marginBottom: 28
  },
  getStartedButton: {
    borderRadius: 3,
    border: 0,
    color: 'rgba(0, 0, 0, 0.67)',
    height: 48,
    padding: '0 30px'
  },
})

class Index extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  }

  render () {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <Page>
          <AuthModal />
          <Grid container>
            <Hero size="fullscreen" src="static/images/mainpage-splash--16-9-blurred.jpg">
              <Grid className={classes.heroMain}>
                <Grid item>
                  <Typography variant="display4" className={classNames(classes.heroDisplay, classes.title)}>
                    Bookdash
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="headline" className={classes.heroDisplay}>
                    Put some snappy subtitle here... later
                  </Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Link prefetch href="/get-started">
                  <Button 
                    classes={{
                      root: classes.getStartedButton
                    }}
                    variant="contained"
                    size="large"
                    color="secondary">
                    Get Started
                  </Button>
                </Link>
              </Grid>
            </Hero>
          </Grid>
        </Page>
      </div>
    )
  }
}

export default withStyles(styles)(Index)