import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { openModal, signoutUser } from '../../redux/actions'

const styles = {
  root: {
    flexGrow: 1,
  },
  transparent: {
    backgroundColor: 'rgba(78, 81, 89, 0.5)',
    boxShadow: 'none'
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  }
}

const theme = createMuiTheme({
  palette: {
    type: 'dark'
  }
})

const ButtonAppBar = (props) => {
  const { classes, transparent, title, dark, loggedIn, csrfToken } = props

  const handleFormSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    
    console.log(data)
  }
  
  return (
    <MuiThemeProvider theme={dark && theme}>
      <div className={classes.root}>
        <AppBar
          className={transparent && classes.transparent}
          position="fixed"
          color="secondary"
        >
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.flex}>
              {title !== 'none' && 'Bookdash'}
            </Typography>
            { loggedIn ? 
              <form
                method="POST"
                action="/auth/signout"
                noValidate
                // onSubmit={this.handleFormSubmit}
              >
                <input type="hidden" name="_csrf" value={csrfToken} />
                <Button
                  type="submit"
                  // onClick={loggedIn ? props.signoutUser : props.openModal}
                  color="inherit"
                >
                  Sign Out
                </Button>
              </form> :
              <Button onClick={props.openModal} color="inherit">
                Sign In
              </Button>
            }
          </Toolbar>
        </AppBar>
      </div>
    </MuiThemeProvider>
  )
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  csrfToken: state.session.csrfToken,
  loggedIn: state.session.user
})

export default withStyles(styles)(
  connect(
    mapStateToProps,
    { openModal, signoutUser }
  )(ButtonAppBar)
)
