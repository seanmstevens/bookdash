import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { withStyles, MuiThemeProvider } from '@material-ui/core/styles'

const styles = {
  root: {
    flexGrow: 1,
  },
  transparent: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    boxShadow: 'none'
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
}

const ButtonAppBar = props => {
  const { classes, transparent, title } = props
  return (
    <div className={classes.root}>
      <AppBar
        className={transparent && classes.transparent}
        position="fixed"
        color="primary"
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
  )
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ButtonAppBar)
