
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
  STRIPE_KEY: "pk_test_6pRNASCoBOKtIshFeQd4XMUh",
};

const prod = {
  s3: {
    REGION: "",
    BUCKET: ""
  },
  apiGateway: {
    REGION: "",
    URL: ""
  },
  cognito: {
    REGION: "",
    USER_POOL_ID: "",
    APP_CLIENT_ID: "",
    IDENTITY_POOL_ID: "",
  },
  STRIPE_KEY: "",
};

const config = process.env.REACT_APP_STAGE === 'prod' ? prod : dev;

// eslint-disable-next-line
export default {
  ...config,
  MAX_ATTACHMENT_SIZE: 5000000,
}