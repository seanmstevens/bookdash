import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

const styles = theme => ({
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
})

const theme = createMuiTheme({
  palette: {
    type: 'dark'
  }
})

const ButtonAppBar = props => {
  const { classes, transparent, title, dark } = props
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
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </div>
    </MuiThemeProvider>
  )
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ButtonAppBar)
