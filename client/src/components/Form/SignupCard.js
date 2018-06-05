import React from 'react'
import PropTypes from 'prop-types'
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import Refresh from '@material-ui/icons/Refresh'
import Tooltip from '@material-ui/core/Tooltip'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import blue from '@material-ui/core/colors/blue'

const styles = theme => ({
  header: {
    paddingBottom: 0
  },
  content: {
    paddingTop: 8
  }
})

const theme = outerTheme => createMuiTheme({
  ...outerTheme,
  palette: {
    type: 'light',
    primary: blue
  }
})

class SignupForm extends React.Component {
  state = {
    email: '',
    password: '',
    showPassword: false,
    touched: false,
    errors: []
  }

  componentDidUpdate (prevProps, prevState) {
    const touched = (this.state.email || this.state.password) ? true : false
    if (this.state.touched !== touched) {
      this.setState({
        touched
      })
    }
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  }

  handleMouseDownPassword = event => {
    event.preventDefault();
  }

  handleClickShowPassword = () => {
    this.setState({
      showPassword: !this.state.showPassword
    })
  }

  handleResetForm = () => {
    this.setState({
      email: '',
      password: '',
      showPassword: false
    })
  }

  render () {
    const { classes } = this.props

    return (
      <MuiThemeProvider theme={theme}>
        <Card>
          <CardHeader className={classes.header} title="Sign up" subheader="Enter your email and password"/>
          <form noValidate autoComplete="off">
            <CardContent className={classes.content}>
              <FormControl margin="dense" fullWidth>
                <InputLabel
                  htmlFor="email"
                  FormLabelClasses={{
                    root: classes.cssLabel,
                    focused: classes.cssFocused,
                  }}
                >
                  Email
                </InputLabel>
                <Input
                  classes={{
                    underline: classes.cssUnderline,
                  }}
                  id="email"
                  type="text"
                  placeholder="jane@example.com"
                  value={this.state.email}
                  onChange={this.handleChange('email')}
                />
              </FormControl>
              <FormControl margin="dense" fullWidth aria-describedby="password-helper-text">
                <InputLabel
                  htmlFor="password"
                  FormLabelClasses={{
                    root: classes.cssLabel,
                    focused: classes.cssFocused,
                  }}
                >
                  Password
                </InputLabel>
                <Input
                  classes={{
                    underline: classes.cssUnderline,
                  }}
                  id="password"
                  type={this.state.showPassword ? 'text' : 'password'}
                  placeholder="c0mpl3xP455w0rd"
                  value={this.state.password}
                  onChange={this.handleChange('password')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Toggle password visibility"
                        onClick={this.handleClickShowPassword}
                        onMouseDown={this.handleMouseDownPassword}
                      >
                        {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText id="password-helper-text">
                  Must be at least 8 characters, and not a commonly used password
                </FormHelperText>
              </FormControl>
            </CardContent>
            <Divider />
            <CardActions>
              <Button
                variant="text"
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
                <IconButton
                  aria-label="Reset form"
                  onClick={this.handleResetForm}
                  className={classes.resetButton}
                  >
                  <Refresh />
                </IconButton>
              </Tooltip>
            </CardActions>
          </form>
        </Card>
      </MuiThemeProvider>
    )
  }
}

export default withStyles(styles)(SignupForm)