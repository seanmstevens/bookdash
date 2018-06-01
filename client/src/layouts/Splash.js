import ButtonAppBar from '../components/Header/Header'
import { createMuiTheme } from '@material-ui/core/styles'

export default ({ children }) => (
  <div>
    <ButtonAppBar title="none" transparent />
    {children}
  </div>
)