import './App.css';
import '@fontsource/roboto';
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { CommandBrowserComponent } from '../browser/containers/CommandBrowser/CommandBrowser';
import { CommandConsoleComponent } from '../console/containers/CommandConsole/CommandConsole';
import { AppHeader } from '../shared-components/AppHeader/AppHeader';
import teal from '@material-ui/core/colors/teal';

const darkTheme = createTheme({
  palette: {
    //type: 'light'
    type: 'dark',
    primary: teal
  },
});

const history = createBrowserHistory();

function App() {
  console.log('bootstrap');
  const routes = [
    {
      route: '/console',
      description: 'Console'
    },
    {
      route: '/browse-commands',
      description: 'Browse commands'
    },
  ];

  return (
    <div id="CommandApp">
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <BrowserRouter>
          <AppHeader routes={routes} />
          <Switch>
            <Route path="/console" component={CommandConsoleComponent} />
            <Route path="/browse-commands" component={CommandBrowserComponent} />            
            <Route path="/" component={CommandConsoleComponent} />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
