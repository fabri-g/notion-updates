// src/pages/_app.js
import '../styles/globals.css';

function NotionApp({ Component, PageProps }) {
  return <Component {...PageProps} />;
}

export default NotionApp;
