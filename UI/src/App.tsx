import React from 'react';
import './App.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { blue, pink } from '@material-ui/core/colors';
import store from './redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from "react-router-dom";
import RouteManagerCustom from './routes';
import { MsalProvider } from "@azure/msal-react";
import { Configuration as MsalConfiguration, PublicClientApplication } from "@azure/msal-browser";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

// Initialisation info
console.log(`Environment Name: ${process.env.REACT_APP_ENV_DISPLAY_NAME}`);
console.log(`Cognito Endpoint: ${process.env.REACT_APP_COGNITO_ENDPOINT}`);
console.log(`Configuration: ${JSON.stringify(process.env, null, '    ')}`);

// MSAL configuration
const msalConfiguration: MsalConfiguration = {
	auth: {
		clientId: process.env.REACT_APP_AUTH_CLIENT_ID || '',
		authority: process.env.REACT_APP_AUTH_AUTHORITY,
		knownAuthorities: [process.env.REACT_APP_AUTH_AUTHORITY || ''],
		cloudDiscoveryMetadata: "",
		redirectUri: process.env.REACT_APP_AUTH_REDIRECT_URI,
		postLogoutRedirectUri: process.env.REACT_APP_AUTH_POST_LOGOUT_REDIRECT_URI,
		//navigateToLoginRequestUrl: true,
		//clientCapabilities: ["CP1"],
		// clientId: "dbacd06f-c66f-4eae-8502-dae3f528fb0d",
		// authority: "https://topicbeacon.b2clogin.com/topicbeacon.onmicrosoft.com/B2C_1_signupsignin1",
		// knownAuthorities: ["https://topicbeacon.b2clogin.com/topicbeacon.onmicrosoft.com/B2C_1_signupsignin1"],
		// cloudDiscoveryMetadata: "",
		// redirectUri: "https://localhost:3000",
		// postLogoutRedirectUri: "https://localhost:3000",
		// navigateToLoginRequestUrl: true,
	}
};

const pca = new PublicClientApplication(msalConfiguration);

// Material-UI settings
const theme = createMuiTheme({
	palette: {
		primary: blue,
		secondary: pink,
		background: {
			default: '#FFFFFF',
		},
	},
	typography: {
		fontFamily: `font-family: 'Lato', sans-serif;`,
	},
});

// Stripe settings: https://github.com/stripe/react-stripe-js/tree/9fe1a5473cd1125fcda4e01adb6d6242a9bae731
const stripePromise = loadStripe('pk_test_51IARDTB2aL3FzklyP4M7sYaJ1QwcF3t8xLwZwfOSDgEUxLF07SEAQFeYyIw6V7GNeLYEH6b3DuKslPea6XExx64T004ghHTsgU');

function App() {
	return (
		<>
			<MuiThemeProvider theme={theme} key="app">
				<CssBaseline />
				<Provider store={store}>
					<Router>
						<MsalProvider instance={pca}>
							<Elements stripe={stripePromise}>
								<RouteManagerCustom />
							</Elements>
						</MsalProvider>
					</Router>
				</Provider>
			</MuiThemeProvider>,
		</>
	);
}


export default App;
