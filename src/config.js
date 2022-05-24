
const dev = {
  s3: {
    REGION: "us-east-1",
    BUCKET: "clickfiscal-notes-app-uploads"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://xsqk6laefj.execute-api.us-east-1.amazonaws.com/dev"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_8AO03Q25U",
    APP_CLIENT_ID: "1sjj10d8qfqsbd88ev560tobi0",
    IDENTITY_POOL_ID: "us-east-1:cdb6dd13-0e88-413e-be3b-a84e1518129d",
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