import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import SignupInputs from '../Form/SignupInputs'
import * as actions from '../../redux/actions'
import withMobileDialog from '@material-ui/core/withMobileDialog'
import lightBlue from '@material-ui/core/colors/lightBlue'

const theme = outerTheme => createMuiTheme({
  ...outerTheme,
  palette: {
    type: 'light',
    primary: lightBlue
  }
})

class AuthModal extends Component {
  static async getInitialProps ({ store, isServer }) {
    return { store }
  }

  static propTypes = {
    classes: PropTypes.object,
    fullScreen: PropTypes.bool.isRequired
  }

  state = {
    email: '',
    password: ''
  }

  render () {
    const { fullScreen, classes, open } = this.props

    return (
      <MuiThemeProvider theme={theme}>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={this.props.closeModal}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Sign in to continue</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To proceed to Bookdash, please log in with your email and password below, or use one of your other accounts.
            </DialogContentText>
            <SignupInputs />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.closeModal} color="primary">
              Cancel
            </Button>
            <Button onClick={this.props.closeModal} color="primary">
              Sign in
            </Button>
          </DialogActions>
        </Dialog>
      </MuiThemeProvider>
    )
  }
}

const mapStateToProps = (state) => ({
  open: state.authModals.open
})

export default withMobileDialog()(
  connect(mapStateToProps, actions)(AuthModal)
)