/* Success messages */

// Message that displays after a successful ping to the database
export const handleMsgDbPingStatusOK = (database) => {
  return `Ping status: OK! Successfully connected to ${database}.`;
}

/* Info messages */

// Message that displays when the server is listening on a port
export const handleMsgServerListening = (port) => {
  return `Server listening on port ${port}.  Default port: 8080`;
}

// Message that displays when the database connection is being established
export const handleMsgDbConnectionEstablished = (database) => {
  return `Establishing database connection to ${database}...`;
}

// Message that displays when the database connection is being closed
export const handleMsgDbConnectionClosed = (database) => {
  return `Database connection to ${database} closed.`;
}

/* Error messages */

// Message that displays when the user provides an invalid MongoDB URI
export const handleMsgMongoUriError = () => `No MongoDB URI provided. Please provide a valid uri."`;

// Message that displays when there is an error connecting to the database
export const handleMsgDbConnectionError = (database, err) => {
  return `Error establishing connection to database, ${database}: \n Error: ${err}`;
}