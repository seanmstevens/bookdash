import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withRoot from '../src/withRoot'
import { withStyles } from '@material-ui/core/styles'
import Link from 'next/link'

import Page from '../src/layouts/Splash'
import Hero from '../src/components/Hero/Hero'
import ButtonAppBar from '../src/structure/Header'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  root: {
    padding: 0,
    margin: 0
  },
  heroDisplay: {
    color: '#ffffff',
    textShadow: '1px 0 10px rgb(90, 86, 80)'
  },
  heroMain: {
    position: 'relative',
    marginBottom: 28
  },
  getStartedButton: {
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px'
  },
})

class Index extends Component {
  state = {
    open: false,
  }

  handleClose = () => {
    this.setState({
      open: false,
    })
  }

  handleClick = () => {
    this.setState({
      open: true,
    })
  }

  render () {
    const { classes } = this.props
    const { open } = this.state

    return (
      <div className={classes.root}>
        <Page>
          <Grid container>
            <Hero size="fullscreen" src="/static/images/mainpage-splash--16-9-blurred.jpg">
              <Grid className={classes.heroMain}>
                <Grid item>
                  <Typography variant="display4" className={classes.heroDisplay}>
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
                    variant="raised"
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

Index.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withRoot(withStyles(styles)(Index))