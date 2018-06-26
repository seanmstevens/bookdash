import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import * as mapDispatchToProps from '../../redux/actions'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Refresh from '@material-ui/icons/Refresh'
import Tooltip from '@material-ui/core/Tooltip'
import Divider from '@material-ui/core/Divider'
import ThirdPartyAccounts from './ThirdPartyAccounts'
import Grow from '@material-ui/core/Grow'
import Fade from '@material-ui/core/Fade'
import LinearProgress from '@material-ui/core/LinearProgress'
import blue from '@material-ui/core/colors/blue'

import SignupInputs from './SignupInputs'

const styles = {
  header: {
    paddingBottom: 0
  },
  card: {
    position: 'relative'
  },
  content: {
    paddingTop: 8,
    paddingBottom: 32,
    paddingLeft: 48,
    paddingRight: 48
  },
  overlay: {
    zIndex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.88)'
  }
}

const theme = outerTheme => createMuiTheme({
  ...outerTheme,
  palette: {
    type: 'light',
    primary: blue
  }
})

const LoaderOverlay = (props) => {
  return (
    <div className={props.classes} style={{ display: 'none' }}>
      <LinearProgress color="secondary" />
    </div>
  )
}

class SignupCard extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    error: PropTypes.bool,
    errorMessage: PropTypes.string
  }

  state = {
    submitting: false
  }

  handleFormSubmit = ({ name, email, password }) => {
    this.setState({
      submitting: true
    })
    this.props.registerUser({ name, email, password })
  }

  render () {
    const { handleSubmit, pristine, reset, valid, errorMessage, classes } = this.props

    return (
      <MuiThemeProvider theme={theme}>
        <Card className={classes.card}>
          <LoaderOverlay show={this.state.submitting} classes={classes.overlay} />
          <CardHeader className={classes.header} title="Sign up" subheader="Enter your email and password"/>
          <ThirdPartyAccounts />
          <Divider />
          <form
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
          >
            <CardContent className={classes.content}>
              <SignupInputs />
            </CardContent>
            <Divider />
            <CardActions>
              <Button
                type="submit"
                disabled={!valid || pristine || this.state.submitting}
                variant="contained"
                color="primary"
                size="small"
                className={classes.signupButton}
              >
                Sign up
              </Button>
              <Tooltip
                enterDelay={230}
                id="tooltip-left"
                title="Reset form"
                placement="right"
                disableHoverListener={pristine}
                disableTouchListener={pristine}
                disableFocusListener={pristine}
              >
                <div>
                  <Grow in={!pristine}>
                    <IconButton
                      disabled={pristine || this.state.submitting}
                      aria-label="Reset form"
                      onClick={reset}
                      className={classes.resetButton}
                      >
                      <Refresh />
                    </IconButton>
                  </Grow>
                </div>
              </Tooltip>
            </CardActions>
          </form>
        </Card>
      </MuiThemeProvider>
    )
  }
}

SignupCard = connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(SignupCard))

export default reduxForm({
  form: 'signup'
})(SignupCard)