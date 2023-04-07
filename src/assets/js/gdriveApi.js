let gapiLoaded = false;

function initGoogleDrive() {
  if (!gapiLoaded) {
    gapiLoaded = true;
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/api.js";
    script.defer = true;
    script.async = true;
    document.body.appendChild(script);
    script.onload = () => {
      gapi.load("client:auth2", initClient);
    };
    
  } else {
    initClient();
  }
}

function initClient() {
  const isAuthorizedOrigin = window.location.origin === 'http://localhost:8080';
  const isAuthorizedRedirectUri = window.location.pathname === 'http://localhost:8080/mriForm';

  if (!isAuthorizedOrigin || !isAuthorizedRedirectUri) {
    console.log('Unauthorized origin or redirect URI');
    return;
  }

  return gapi.client.init({
    apiKey: "AIzaSyBU9xNLl6-KMOtcOrjQ0rf6B9uxnN5w31A",
    clientId: "830042434681-96p23o3fm7to4vejl103d2hr5oi2s38f.apps.googleusercontent.com",
    scope: "https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.install",
    discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],
    cookie_policy: "single_host_origin"
  }).then(() => loadDriveApi())
    .then(() => getFile())
    .then(() => copyFile())
    .then((response) => {
      const webViewLink = response.webViewLink;
      console.log(webViewLink);
      // generate iframe with webViewLink as src
    })
    .catch((err) => console.log(err));
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

async function displayFileInIframe(fileId) {
  console.log('inside displayFileInIframe function');
  const iframe = document.getElementById('pdf-iframe');

  if (!iframe) {
    console.log('Iframe not found');
    return;
  }

  const iframeSrc = await getIframeContentUrl(fileId);

  iframe.src = iframeSrc;
}

async function copyFileAndDisplayInIframe() {
  try {
    const response = await copyFile();
    const fileId = response.id;
    await displayFileInIframe(fileId);
  } catch (error) {
    console.error('Error copying file and displaying in iframe:', error);
  }
}


function loadDriveApi() {
  return gapi.client.load("drive", "v3");
}

function getFile() {
  console.log('inside getFile Function');

  const fileId = '1tkW2QEB_CVLz0iJqR3iKn6BKnY6AHfUO2VuDkvZegHk';

  return new Promise((resolve, reject) => {
    const request = gapi.client.drive.files.get({
      fileId,
      alt: 'media'
    });

    request.execute((response) => {
      if (response.error) {
        console.error('Error getting file:', response.error);
        reject(response.error);
        return;
      }
      console.log('File fetched successfully:', response);
      resolve(response);
    });
  });
}

function copyFile() {
  console.log('inside copyFile Function');

  const fileId = '1tkW2QEB_CVLz0iJqR3iKn6BKnY6AHfUO2VuDkvZegHk';
  const copyTitle = 'Copy of MRI Patient Form';
  const copyMetadata = {
      'name': copyTitle,
      'parents': ['10XCaaS_hQrXJR21frN9kmqTVIfxYtOLf']
  };

  return new Promise((resolve, reject) => {
      const request = gapi.client.drive.files.copy({
          fileId,
          resource: copyMetadata
      });
      request.execute((response) => {
          if (response.error) {
              console.error('Error copying file:', response.error);
              reject(response.error);
              return;
          }
          console.log('File copied successfully:', response);

          // Update the src attribute of the iframe with the URL of the copied file
          const pdfIframe = document.getElementById('pdf-iframe');
          pdfIframe.src = response.webContentLink;

          resolve(response);
      });
  });
}

initGoogleDrive();
copyFileAndDisplayInIframe();

