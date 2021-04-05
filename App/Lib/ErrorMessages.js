export default function(errorCode) {
  var message = '';
  switch(errorCode) {
    case 'SERVER_ERROR':
      message = 'We encounter a problem processing your request. Please try again later.';
      break;
    case 'TIMEOUT_ERROR':
      message = 'Your request has timeed out and try again later.';
      break;
    case 'CONNECTION_ERROR':
      message = '1 Please check your internet connection and try again.';
      break;
    case 'NETWORK_ERROR':
      message = 'Please check your internet connection and try again.';
      break;
    case 'CLIENT_ERROR':
      message = 'An error occured. Please contact our technical support.';
      break;
  }
  return message;
}
