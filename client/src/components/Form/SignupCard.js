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
import blue from '@material-ui/core/colors/blue'

import SignupInputs from './SignupInputs'

const styles = theme => ({
  header: {
    paddingBottom: 0
  },
  content: {
    paddingTop: 8,
    paddingBottom: 32,
    paddingLeft: 48,
    paddingRight: 48
  }
})

const theme = outerTheme => createMuiTheme({
  ...outerTheme,
  palette: {
    type: 'light',
    primary: blue
  }
})

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

  handleFormSubmit = ({ name, email, password }) => {
    this.props.registerUser({ name, email, password })
  }

  render () {
    const { handleSubmit, pristine, reset, submitting, valid, errorMessage, classes } = this.props

    return (
      <MuiThemeProvider theme={theme}>
        <Card>
          <CardHeader className={classes.header} title="Sign up" subheader="Enter your email and password"/>
          <ThirdPartyAccounts />
          <Divider />
          <form noValidate autoComplete="off" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            <CardContent className={classes.content}>
              <SignupInputs />
            </CardContent>
            <Divider />
            <CardActions>
              <Button
                type="submit"
                disabled={!valid || pristine || submitting}
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
                      disabled={pristine || submitting}
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