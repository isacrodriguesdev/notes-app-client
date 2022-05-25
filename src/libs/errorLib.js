import * as Sentry from "@sentry/browser";

export function onError(error) {

  let errorInfo = {};
  let message = error.toString();

  // Auth errors
  if (!(error instanceof Error) && error.message) {

    errorInfo = error;
    message = error.message;
    error = new Error(message);
    // API errors
  }
  else if (error.config && error.config.url) {
    errorInfo.url = error.config.url;
  }

  logError(error, errorInfo);
  alert(message);
}

export function initSentry() {
  Sentry.init({ dsn: "https://8c8329d480254d41be07ede91e17a006@o1262190.ingest.sentry.io/6440739" });
}

export function logError(error, errorInfo = null) {

  Sentry.withScope((scope) => {
    errorInfo && scope.setExtras(errorInfo);
    Sentry.captureException(error);
  });

}