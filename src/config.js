
export default {
  s3: {
    REGION: "us_east_1",
    BUCKET: "arn:aws:s3:::demo-aws-lambda-dev-attachmentsbucket-19738emw6zr4s"
  },
  apiGateway: {
    REGION: "us_east_1",
    URL: "https://ljkwtp0nhk.execute-api.us-east-1.amazonaws.com/dev"
  },
  cognito: {
    REGION: "us_east_1",
    USER_POOL_ID: "us-east-1_WWb9WhSLl",
    APP_CLIENT_ID: "2k4a5lv6s439uu0im8cb3l8h2q",
    IDENTITY_POOL_ID: "us-east-1:aab0d4fb-3bcb-4699-9518-a9dcb01ca97f",
  },
  STRIPE_KEY: ""
};