

// let gdriveApiLoaded = false;
const CLIENT_ID = '830042434681-1o28e5ibcbk1k8hbumlh39rfah7a576s.apps.googleusercontent.com';
const REDIRECT_URI = 'http://localhost:8080/mriForm';
const FILE_ID = '1tkW2QEB_CVLz0iJqR3iKn6BKnY6AHfUO2VuDkvZegHk';
const IFRAME_ID = 'pdf-iframe';
const PARENT_FOLDER_ID = '10XCaaS_hQrXJR21frN9kmqTVIfxYtOLf';
const CLIENT_SECRET = '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';
const API_KEY = 'AIzaSyBU9xNLl6-KMOtcOrjQ0rf6B9uxnN5w31A';


// const cors = require('cors')
// const allowedOrigins = ['https://accounts.google.com', 'https://www.googleapis.com']
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (allowedOrigins.includes(origin)) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }
// app.use(cors(corsOptions))



function loadGDriveApi() {
    console.log('Loading GDrive API...');

      // Initialize the Google API client with your OAuth 2.0 client ID and API key
    gapi.client.init({
      clientId: CLIENT_ID,
      apiKey: API_KEY,
      discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
      scope: 'https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/docs https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.install',
      redirectUri: REDIRECT_URI
    })
      console.log('Google API client initialized.');
      // gdriveApiLoaded = true;
    // gapi.auth2.init({
    //   client_id: CLIENT_ID,
    //   scope: 'https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/docs https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.install',
    //   redirect_uri: REDIRECT_URI
    // });
  
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

async function copyAndDisplayFile(accessToken) {
  console.log('Inside copyAndDisplayFile function');

  // if (!gdriveApiLoaded) {
  //   console.error('GDrive API not loaded.');
  //   return;
  // }
  gapi.client.setToken({
    access_token: accessToken
  });

  try {
    // Set the access token for the Google API client
 

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

  console.log('Google Drive API loaded.');
   
  // }).catch((error) => {
  //   console.error('Error loading Google Drive API:', error);

}

async function embedDocIFrame() {
  const iframe = document.getElementById('pdf-iframe');

  const checkURL = setInterval(async () => {
    if (window.location.href.includes('http://localhost:8080/mriForm')) {
      // Trigger the copyAndDisplayFile method
      console.log('emb');
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      if (code) {
        const accessToken = await getAccessToken(code);
        copyAndDisplayFile(accessToken);
      } else {
        console.error('No access token found in URL query parameters');
      }

      // Stop checking the URL
      clearInterval(checkURL);
    }
  }, 100);
}

async function getAccessToken(code) {
  console.log(`code: ${code}`);
  const response = await fetch('https://www.googleapis.com/oauth2/v4/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      code,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: REDIRECT_URI,
      grant_type: 'authorization_code'
    })
});

  // if (!response.ok) {
  //   throw new Error(`Failed to retrieve access token: ${response.status}`);
  // }

  const data = await response.json();
  return data.access_token;
}


gapi.load('client:auth2', loadGDriveApi)
// init();
embedDocIFrame(); 