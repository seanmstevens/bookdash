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
import blue from '@material-ui/core/colors/blue'

import SignupInputs from './SignupInputs'

const styles = theme => ({
  header: {
    paddingBottom: 0
  },
  content: {
    paddingTop: 8,
    paddingBottom: 32
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

  handleFormSubmit = ({ email, password }) => {
    this.props.signupUser({ email, password })
  }

  render () {
    const { handleSubmit, pristine, reset, submitting, error, errorMessage, classes } = this.props

    return (
      <MuiThemeProvider theme={theme}>
        <Card>
          <CardHeader className={classes.header} title="Sign up" subheader="Enter your email and password"/>
          <ThirdPartyAccounts />
          <Divider />
          <form noValidate autoComplete="off"onSubmit={handleSubmit}>
            <CardContent className={classes.content}>
              <SignupInputs />
            </CardContent>
            <Divider />
            <CardActions>
              <Button
                type="submit"
                disabled={error || pristine || submitting}
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
                >
                <div>
                  <IconButton
                    disabled={pristine || submitting}
                    aria-label="Reset form"
                    onClick={reset}
                    className={classes.resetButton}
                    >
                    <Refresh />
                  </IconButton>
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