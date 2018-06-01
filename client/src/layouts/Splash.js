import ButtonAppBar from '../structure/Header'
import { createMuiTheme } from '@material-ui/core/styles'

export default ({ children }) => (
  <div>
    <ButtonAppBar title="none" transparent />
    {children}
  </div>
)