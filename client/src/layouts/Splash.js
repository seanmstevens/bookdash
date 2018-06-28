import ButtonAppBar from '../components/Header/Header'

export default ({ children }) => (
  <div>
    <ButtonAppBar title="none" transparent dark/>
    {children}
  </div>
)