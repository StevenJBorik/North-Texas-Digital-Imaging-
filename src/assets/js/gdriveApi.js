

// // let gdriveApiLoaded = false;
// const CLIENT_ID = '830042434681-1o28e5ibcbk1k8hbumlh39rfah7a576s.apps.googleusercontent.com';
// const REDIRECT_URI = 'http://localhost:8080/mriForm';
// const FILE_ID = '1tkW2QEB_CVLz0iJqR3iKn6BKnY6AHfUO2VuDkvZegHk';
// const IFRAME_ID = 'pdf-iframe';
// const PARENT_FOLDER_ID = '10XCaaS_hQrXJR21frN9kmqTVIfxYtOLf';
// const CLIENT_SECRET = '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';
// const API_KEY = 'AIzaSyBU9xNLl6-KMOtcOrjQ0rf6B9uxnN5w31A';


// // const cors = require('cors')
// // const allowedOrigins = ['https://accounts.google.com', 'https://www.googleapis.com']
// // const corsOptions = {
// //   origin: function (origin, callback) {
// //     if (allowedOrigins.includes(origin)) {
// //       callback(null, true)
// //     } else {
// //       callback(new Error('Not allowed by CORS'))
// //     }
// //   }
// // }
// // app.use(cors(corsOptions))



// function loadGDriveApi() {
//     console.log('Loading GDrive API...');

//       // Initialize the Google API client with your OAuth 2.0 client ID and API key
//     gapi.client.init({
//       clientId: CLIENT_ID,
//       apiKey: API_KEY,
//       discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
//       scope: 'https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/docs https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.install',
//       redirectUri: REDIRECT_URI
//     })
//       console.log('Google API client initialized.');
//       // gdriveApiLoaded = true;
//     // gapi.auth2.init({
//     //   client_id: CLIENT_ID,
//     //   scope: 'https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/docs https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.install',
//     //   redirect_uri: REDIRECT_URI
//     // });
  
// }

// async function displayFileInIframe(fileId) {
//   console.log('Inside displayFileInIframe function');
//   const iframe = document.getElementById(IFRAME_ID);

//   if (!iframe) {
//     console.log('Iframe not found');
//     return;
//   }

//   const iframeSrc = await getIframeContentUrl(fileId);

//   iframe.src = iframeSrc;
// }

// function getIframeContentUrl(fileId) {
//   return new Promise((resolve, reject) => {
//     const request = gapi.client.drive.files.get({
//       fileId,
//       fields: 'webViewLink',
//     });

//     request.execute((response) => {
//       if (response.error) {
//         console.error('Error getting file URL:', response.error);
//         reject(response.error);
//         return;
//       }
//       const webViewLink = response.webViewLink;
//       resolve(webViewLink.replace('/view', '/preview'));
//     });
//   });
// }

// async function copyAndDisplayFile(accessToken) {
//   console.log('Inside copyAndDisplayFile function');

//   // if (!gdriveApiLoaded) {
//   //   console.error('GDrive API not loaded.');
//   //   return;
//   // }
//   gapi.auth2.getAuthInstance().currentUser.get().reloadAuthResponse()
//   .then(response => {
//     gapi.client.setToken({
//       access_token: response.access_token
//     });
//     // Copy the file and display it in the iframe
//   })
//   .catch(error => {
//     console.error('Error refreshing access token:', error);
//   });

//   try {
//     // Set the access token for the Google API client
 

//     // Copy the file
//     const response = await gapi.client.drive.files.copy({
//       fileId: FILE_ID,
//       resource: {
//         'name': 'Copy of MRI Patient Form',
//         'parents': [PARENT_FOLDER_ID]
//       }
//     });
//     console.log('File copied successfully:', response);

//     // Update the src attribute of the iframe with the URL of the copied file
//     const pdfIframe = document.getElementById(IFRAME_ID);
//     pdfIframe.src = await getIframeContentUrl(response.result.id);
//   } catch (error) {
//     console.error('Error copying or displaying file:', error);
//   }
// }


// async function embedDocIFrame() {
//   const iframe = document.getElementById('pdf-iframe');

//   const checkURL = setInterval(async () => {
//     if (window.location.href.includes('http://localhost:8080/mriForm')) {
//       // Trigger the copyAndDisplayFile method
//       console.log('emb');
//       const urlParams = new URLSearchParams(window.location.search);
//       const code = urlParams.get('code');
//       console.log(code); 
//       if (code) {
//         const accessToken = await getAccessToken(code);
//         copyAndDisplayFile(accessToken);
//       } else {
//         console.error('No access token found in URL query parameters');
//       }

//       // Stop checking the URL
//       clearInterval(checkURL);
//     }
//   }, 100);
// }

// async function getAccessToken(code) {
//   console.log(`code: ${code}`);
//   const response = await fetch('https://www.googleapis.com/oauth2/v4/token', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded'
//     },
//     body: new URLSearchParams({
//       code,
//       client_id: CLIENT_ID,
//       client_secret: CLIENT_SECRET,
//       redirect_uri: REDIRECT_URI,
//       grant_type: 'refresh_token'
//     })
// });

//     // if (!response.ok) {
//     //   throw new Error(`Failed to retrieve access token: ${response.status}`);
//     // }

//   const data = await response.json();
//   return data.access_token;
// }
// console.log('e;ale');
// gapi.load('client:auth2', loadGDriveApi)
// // init();
// embedDocIFrame(); 





// $(document).ready(displayFile); 

// function displayFile() {
//   let gapi;
//   const CLIENT_ID = '830042434681-1o28e5ibcbk1k8hbumlh39rfah7a576s.apps.googleusercontent.com';
//   const REDIRECT_URI = 'http://localhost:8080/mriForm';
//   const FILE_ID = '1tkW2QEB_CVLz0iJqR3iKn6BKnY6AHfUO2VuDkvZegHk';
//   const IFRAME_ID = 'pdf-iframe';
//   const PARENT_FOLDER_ID = '10XCaaS_hQrXJR21frN9kmqTVIfxYtOLf';
//   const CLIENT_SECRET = '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';
//   const API_KEY = 'AIzaSyBU9xNLl6-KMOtcOrjQ0rf6B9uxnN5w31A';

//   function loadGDriveApi() {
//     console.log('Loading GDrive API...');
//     return new Promise((resolve, reject) => {
//       // Load the Google API client library
//       gapi.load('client', {
//         callback: () => {
//           // Initialize the Google API client with your OAuth 2.0 client ID and API key
//           gapi.client.init({
//             clientId: CLIENT_ID,
//             apiKey: API_KEY,
//             discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
//             scope: 'https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/docs https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.install',
//             redirectUri: REDIRECT_URI
//           })
//           .then(() => {
//             console.log('Google API client initialized.');
//             resolve();
//           })
//           .catch((error) => {
//             console.error('Error initializing Google API client:', error);
//             reject(error);
//           });
//         },
//         onerror: (error) => {
//           console.error('Error loading Google API client:', error);
//           reject(error);
//         },
//         timeout: 5000,
//         ontimeout: () => {
//           console.error('Timeout loading Google API client');
//           reject(new Error('Timeout loading Google API client'));
//         }
//       });
//     });
//   }

//   async function displayFileInIframe(fileId) {
//     console.log('Inside displayFileInIframe function');
//     const iframe = document.getElementById(IFRAME_ID);

//     if (!iframe) {
//       console.log('Iframe not found');
//       return;
//     }

//     try {
//       const iframeSrc = await getIframeContentUrl(fileId);
//       iframe.src = iframeSrc;
//     } catch (error) {
//       console.error('Error displaying file in iframe:', error);
//     }
//   }

//   function getIframeContentUrl(fileId) {
//     return new Promise((resolve, reject) => {
//       const request = gapi.client.drive.files.get({
//         fileId,
//         fields: 'webViewLink',
//       });

//       request.execute((response) => {
//         if (response.error) {
//           console.error('Error getting file URL:', response.error);
//           reject(response.error);
//           return;
//         }
//         const webViewLink = response.webViewLink;
//         resolve(webViewLink.replace('/view', '/preview'));
//       });
//     });
//   }

//   async function copyAndDisplayFile(accessToken) {
//     console.log('Inside copyAndDisplayFile function');

//     try {
//       await loadGDriveApi();
//       // Set the access token for the Google API client
//       gapi.client.setToken({
//         access_token: accessToken
//       })
//     } 
//     catch (error) {
//         console.error('Error refreshing access token:', error);
//         throw new Error('Error refreshing access token');
//         }
//     }
        
//         async function getAccessToken(code) {
//         console.log('Inside getAccessToken function');
//         const params = new URLSearchParams();
//         params.append('code', code);
//         params.append('client_id', CLIENT_ID);
//         params.append('client_secret', CLIENT_SECRET);
//         params.append('redirect_uri', REDIRECT_URI);
//         params.append('grant_type', 'authorization_code');
        
//         const tokenUrl = 'https://oauth2.googleapis.com/token';
        
//         const response = await fetch(tokenUrl, {
//         method: 'POST',
//         headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//         },
//         body: params,
//         });
        
//         if (!response.ok) {
//         console.error('Error getting access token:', response.status, response.statusText);
//         throw new Error('Error getting access token');
//         }
        
//         const body = await response.json();
//         const accessToken = body.access_token;
//         const expiresIn = body.expires_in;
//         const expiryDate = new Date(Date.now() + expiresIn * 1000);
//         console.log('Access token:', accessToken, 'Expires at:', expiryDate);
        
//         setInterval(refreshAccessToken, expiresIn * 500);
        
//         return accessToken;
//         }
        
//         async function init() {
//         console.log('Initializing...');
        
//         // Load the Google Drive API
//         await new Promise((resolve) => {
//         gapi.load('client:auth2', resolve);
//         });
        
//         console.log('Google Drive API loaded.');
        
//         // Initialize the Google API client with your OAuth 2.0 client ID and API key
//         await gapi.client.init({
//         clientId: CLIENT_ID,
//         apiKey: API_KEY,
//         discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
//         scope: 'https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/docs https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.install',
//         redirectUri: REDIRECT_URI,
//         });
        
//         console.log('Google API client initialized.');
        
//         // Check if the user is already signed in
//         const isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get();
//         console.log('Is signed in:', isSignedIn);
        
//         if (isSignedIn) {
//         const accessToken = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token;
//         console.log('Access token:', accessToken);
//         await copyAndDisplayFile(accessToken);
//         } else {
//         console.log('Not signed in.');
//         const signInButton = document.getElementById('signin-button');
//         signInButton.addEventListener('click', () => {
//         gapi.auth2.getAuthInstance().signIn();
//         });
//         }
//         }
        
//         // Main entry point
//         async function main() {
//         try {
//         await init();
//         console.log('Initialization complete.');
//         } catch (error) {
//         console.error('Error initializing application:', error);
//         }
//         }
        
//         main();

// }




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
