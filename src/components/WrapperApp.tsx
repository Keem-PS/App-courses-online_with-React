
import { BrowserRouter } from 'react-router-dom'
import App from '../App'

function WrapperApp() {
  return (
    <div>
        <BrowserRouter>
        <App></App>
        </BrowserRouter>
    </div>
  )
}

export default WrapperApp