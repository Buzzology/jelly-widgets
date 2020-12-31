import React from 'react';
import './App.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline'
import { blue, pink } from '@material-ui/core/colors';
import store from './redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from "react-router-dom";
import RouteManagerCustom from './routes';

// Initialisation info
console.log(`Environment Name: ${process.env.REACT_APP_ENV_DISPLAY_NAME}`);
console.log(`Cognito Endpoint: ${process.env.REACT_APP_COGNITO_ENDPOINT}`);
console.log(`Configuration: ${JSON.stringify(process.env, null, '    ')}`)

const theme = createMuiTheme({
	palette: {
		primary: blue,
		secondary: pink,
		background: {
			default: '#FFFFFF',
		}
	},
});


function App() {
  return (
		<>
			<MuiThemeProvider theme={theme} key="app">
				<CssBaseline />
				<Provider store={store}>
					<Router>
						<RouteManagerCustom />
					</Router>
				</Provider>
			</MuiThemeProvider>,
		</>
	);
}


export default App;
