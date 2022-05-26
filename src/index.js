import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { Amplify, Auth } from 'aws-amplify';
import config from './config';
import { initSentry } from './libs/errorLib';

initSentry();

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID,
  },
  Storage: {
    region: config.s3.REGION,
    bucket: config.s3.BUCKET,
    identityPoolId: config.cognito.IDENTITY_POOL_ID
  },
  API: {
    endpoints: [
      {
        name: "notes",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION
      },
    ]
  }
});

Auth.configure({
  oauth: {
    domain: 'isacrdev-notes.auth.us-east-1.amazoncognito.com',
    scope: ['email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
    redirectSignIn: 'https://main--isacrodriguesdev-notes.netlify.app',
    redirectSignOut: 'https://main--isacrodriguesdev-notes.netlify.app',
    responseType: 'token',
  },
  region: config.cognito.REGION,
  userPoolId: config.cognito.USER_POOL_ID,
  userPoolWebClientId: config.cognito.APP_CLIENT_ID,
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <App />
  </Router>
);

// https://isacrdev-notes.auth.us-east-1.amazoncognito.com/oauth2/authorize?redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F&response_type=token&client_id=6gj5t94o8hjs22mo19krdgbij9&identity_provider=facebook&scope=&state=5pxkGY1bB1YMeROMQRDIG585ldzvemeM

// https://-isacrdev-notes.auth.us-east-1.amazoncognito.com/oauth2/authorize?redirect_uri=localhost%3A3000&response_type=token&client_id=6gj5t94o8hjs22mo19krdgbij9&identity_provider=facebook&scope=phone%20email%20profile%20openid%20aws.cognito.signin.user.admin&state=Og4LHofc13hohRVjiJoOoNzIUB24WaXm
