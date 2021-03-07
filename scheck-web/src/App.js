import { SnackbarProvider } from 'notistack'
import ScrollReset from './components/ScrollReset'
import routes, { renderRoutes } from "./routes"
import { Router, BrowserRouter } from 'react-router-dom'
import history from "./history"

const App = () => {
  return (
    <SnackbarProvider
      dense
      maxSnack={3}
    >
      <Router history={history}>
        <BrowserRouter>
          <ScrollReset />
          {renderRoutes(routes)}
        </BrowserRouter>
      </Router>
    </SnackbarProvider>
  )
}

export default App;
