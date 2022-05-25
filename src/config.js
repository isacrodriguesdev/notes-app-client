
const dev = {
  s3: {
    REGION: "us-east-1",
    BUCKET: "dev-notes-uploads"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://3txrfwx5ni.execute-api.us-east-1.amazonaws.com/dev"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_Kildr8Wh2",
    APP_CLIENT_ID: "6gj5t94o8hjs22mo19krdgbij9",
    IDENTITY_POOL_ID: "us-east-1:47933944-e3cc-4d31-b1aa-695c18890b77",
  },
};

const prod = {
  s3: {
    REGION: "us-east-1",
    BUCKET: "prod-notes-uploads"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://nfb4havzoa.execute-api.us-east-1.amazonaws.com/prod"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_j879e3fSf",
    APP_CLIENT_ID: "7ru7v8e4s9inlke4prb2sji1n",
    IDENTITY_POOL_ID: "us-east-1:84c7bb1c-97ba-4da5-bf01-4dcec6bdbded",
  },
};

const config = process.env.REACT_APP_STAGE === 'prod' ? prod : dev;

// eslint-disable-next-line
export default {
  ...config,
  MAX_ATTACHMENT_SIZE: 5000000,
}