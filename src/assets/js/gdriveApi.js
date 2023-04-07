const { GoogleAuth } = window.google.auth;


let gdriveApiLoaded = false;
const CLIENT_ID = '830042434681-96p23o3fm7to4vejl103d2hr5oi2s38f.apps.googleusercontent.com';
const REDIRECT_URI = 'http://localhost:8080/mriForm';
const FILE_ID = '1tkW2QEB_CVLz0iJqR3iKn6BKnY6AHfUO2VuDkvZegHk';
const IFRAME_ID = 'pdf-iframe';
const PARENT_FOLDER_ID = '10XCaaS_hQrXJR21frN9kmqTVIfxYtOLf';


function loadGDriveApi() {
  console.log('Loading GDrive API...');

  return new Promise((resolve, reject) => {
    // Load the Google API client library asynchronously
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    document.body.appendChild(script);

    // Listen for the API library to load
    script.onload = () => {
      console.log('Google API client library loaded.');

      // Initialize the Google API client with your OAuth 2.0 client ID and API key
      gapi.load('client:auth2', () => {
        gapi.client.init({
          clientId: CLIENT_ID,
          discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
          scope: 'https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.install',
          redirectUri: REDIRECT_URI
        }).then(() => {
          console.log('Google API client initialized.');
          gdriveApiLoaded = true;
          resolve();
        }).catch((error) => {
          console.error('Error initializing Google API client:', error);
          reject(error);
        });
      });
    };
  });
}

async function displayFileInIframe(fileId) {
  console.log('Inside displayFileInIframe function');
  const iframe = document.getElementById(IFRAME_ID);

  if (!iframe) {
    console.log('Iframe not found');
    return;
  }

  const iframeSrc = await getIframeContentUrl(fileId);

  iframe.src = iframeSrc;
}

function getIframeContentUrl(fileId) {
  return new Promise((resolve, reject) => {
    const request = gapi.client.drive.files.get({
      fileId,
      fields: 'webViewLink',
    });

    request.execute((response) => {
      if (response.error) {
        console.error('Error getting file URL:', response.error);
        reject(response.error);
        return;
      }
      const webViewLink = response.webViewLink;
      resolve(webViewLink.replace('/view', '/preview'));
    });
  });
}

async function copyAndDisplayFile() {
  console.log('Inside copyAndDisplayFile function');

  if (!gdriveApiLoaded) {
    console.error('GDrive API not loaded.');
    return;
  }

  try {
    // Create a new instance of GoogleAuth
    const auth = await new GoogleAuth({
      clientId: CLIENT_ID,
      scopes: ['https://www.googleapis.com/auth/drive.file'] // or no file
    });

    // Get authorization from the user
    const {tokens} = await auth.getClient();

    // Set the access token for the Google API client
    gapi.auth.setToken(tokens);

    // Copy the file
    const response = await gapi.client.drive.files.copy({
      fileId: FILE_ID,
      resource: {
        'name': 'Copy of MRI Patient Form',
        'parents': [PARENT_FOLDER_ID]
      }
    });
    console.log('File copied successfully:', response);

    // Update the src attribute of the iframe with the URL of the copied file
    const pdfIframe = document.getElementById(IFRAME_ID);
    pdfIframe.src = await getIframeContentUrl(response.result.id);
  } catch (error) {
    console.error('Error copying or displaying file:', error);
  }
}


function init() {
  console.log('Initializing...');

  // Load the Google Drive API
  loadGDriveApi().then(() => {
    console.log('Google Drive API loaded.');

    // Add event listener to the copy button
    const copyButton = document.getElementById('auth-button');
    copyButton.addEventListener('click', copyAndDisplayFile);

    // Add event listener to the iframe to automatically resize its height
    const iframe = document.getElementById('pdf-iframe');
    iframe.addEventListener('load', () => {
      iframe.style.height = `${iframe.contentWindow.document.body.scrollHeight}px`;
    });
  }).catch((error) => {
    console.error('Error loading Google Drive API:', error);
  });
}

init();