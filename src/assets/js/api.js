  function initClient() {
    const apiKey = 'AIzaSyBU9xNLl6-KMOtcOrjQ0rf6B9uxnN5w31A';
    const clientId = '830042434681-96p23o3fm7to4vejl103d2hr5oi2s38f.apps.googleusercontent.com';
    const discoveryDocs = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];
    const scope = 'https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.install';
    
    gapi.load('client:auth2', () => {
      if (!gapi.auth2.getAuthInstance()) {
        gapi.auth2.init({
          apiKey,
          clientId,
          discoveryDocs,
          scope
        }).then(() => {
          // Auth instance is now initialized
          const authInstance = gapi.auth2.getAuthInstance();
          // Use the authInstance to make API calls
          const accessToken = authInstance.currentUser.get().getAuthResponse().access_token;
          const creds = new google.auth.Credentials(accessToken);
          const driveService = google.drive({ version: 'v3', auth: creds });
    
          const fileId = '1tkW2QEB_CVLz0iJqR3iKn6BKnY6AHfUO2VuDkvZegHk';
          const copyTitle = 'Copy of MRI Patient Form';
          const copyMetadata = {
            'name': copyTitle,
            'parents': ['10XCaaS_hQrXJR21frN9kmqTVIfxYtOLf'] 
          };
    
          driveService.files().copy({
            fileId,
            resource: copyMetadata
          }).execute(function(copiedFile) {
            const permission = {
              'type': 'anyone',
              'role': 'writer'
            };
    
            driveService.permissions().create({
              fileId: copiedFile.id,
              resource: permission,
            }).execute();
    
            const embedUrl = driveService.files().get({
              fileId: copiedFile.id,
              fields: 'webViewLink'
            }).execute()['webViewLink'];
    
            console.log(copiedFile); 
    
            const iframe = document.getElementById('pdf-iframe');
            iframe.src = embedUrl;
            console.log(embedUrl);
          });
        });
      } else {
        // Auth instance has already been initialized
        const authInstance = gapi.auth2.getAuthInstance();
        // Use the authInstance to make API calls
        const accessToken = authInstance.currentUser.get().getAuthResponse().access_token;
        const creds = new google.auth.Credentials(accessToken);
        const driveService = google.drive({ version: 'v3', auth: creds });
    
        const fileId = '1tkW2QEB_CVLz0iJqR3iKn6BKnY6AHfUO2VuDkvZegHk';
        const copyTitle = 'Copy of MRI Patient Form';
        const copyMetadata = {
          'name': copyTitle,
          'parents': ['10XCaaS_hQrXJR21frN9kmqTVIfxYtOLf'] 
        };
    
        driveService.files().copy({
          fileId,
          resource: copyMetadata
        }).execute(function(copiedFile) {
          const permission = {
            'type': 'anyone',
            'role': 'writer'
          };
    
          driveService.permissions().create({
            fileId: copiedFile.id,
            resource: permission,
          }).execute();

          const embedUrl = driveService.files().get({
            fileId: copiedFile.id,
            fields: 'webViewLink'
          }).execute()['webViewLink'];
  
          console.log(copiedFile); 

          const iframe = document.getElementById('pdf-iframe');
          iframe.src = embedUrl;
          console.log(embedUrl);
      });
    };
  })
}

    
         
  