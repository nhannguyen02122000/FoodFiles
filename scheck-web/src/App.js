import { SnackbarProvider } from 'notistack'
import ScrollReset from './components/ScrollReset'
import routes, { renderRoutes } from "./routes"
import { Router, BrowserRouter } from 'react-router-dom'
import history from "./history"
import { AuthProvider } from "./contexts/FirebaseAuthContext"

const App = () => {
  return (
    <SnackbarProvider
      dense
      maxSnack={3}
    >
      <Router history={history}>
        <AuthProvider>
          <BrowserRouter>
            <ScrollReset />
            {renderRoutes(routes)}
          </BrowserRouter>
        </AuthProvider>
      </Router>
    </SnackbarProvider>
  )
}

export default App;
