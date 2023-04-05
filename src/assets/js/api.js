
// creds = Credentials.from_authorized_user_info(info)
// drive_service = build('drive', 'v3', credentials=creds)

// file_id = '1tkW2QEB_CVLz0iJqR3iKn6BKnY6AHfUO2VuDkvZegHk'
// copy_title = 'Copy of MRI Patient Form'

// copy_metadata = {
//     'name': copy_title,
//     'parents': ['10XCaaS_hQrXJR21frN9kmqTVIfxYtOLf'] 
// }

// copied_file = drive_service.files().copy(fileId=file_id, body=copy_metadata).execute()

// permission = {
//     'type': 'anyone',
//     'role': 'writer',
// }

// drive_service.permissions().create(fileId=copied_file['id'], body=permission).execute()

// embed_url = drive_service.files().get(fileId=copied_file['id'], fields='webViewLink').execute()['webViewLink']

// const iframe = document.getElementById('pdf-iframe');
// iframe.src = embed_url;


// Replace 'info' with your authorized user info
// Replace 'YOUR_API_KEY' with your actual Google API key
gapi.load('client', function() {
    gapi.client.init({
      apiKey: 'AIzaSyBU9xNLl6-KMOtcOrjQ0rf6B9uxnN5w31A',
      clientId: '830042434681-96p23o3fm7to4vejl103d2hr5oi2s38f.apps.googleusercontent.com',
      scope: 'https://www.googleapis.com/auth/drive'
    }).then(function() {
      // Retrieve the access token from the authorized user info
      const accessToken = info.access_token;
      
      // Use the access token to create a new instance of the Drive API client
      const drive_service = gapi.client.drive({
        'access_token': accessToken
      });
  
      const file_id = '1tkW2QEB_CVLz0iJqR3iKn6BKnY6AHfUO2VuDkvZegHk';
      const copy_title = 'Copy of MRI Patient Form';
  
      const copy_metadata = {
        'name': copy_title,
        'parents': ['10XCaaS_hQrXJR21frN9kmqTVIfxYtOLf'] 
      };
  
      drive_service.files().copy({
        fileId: file_id,
        resource: copy_metadata
      }).execute(function(copied_file) {
  
        const permission = {
          'type': 'anyone',
          'role': 'writer'
        };
  
        drive_service.permissions().create({
          fileId: copied_file.id,
          resource: permission
        }).execute();
  
        const embed_url = drive_service.files().get({
          fileId: copied_file.id,
          fields: 'webViewLink'
        }).execute()['webViewLink'];
  
        const iframe = document.getElementById('pdf-iframe');
        iframe.src = embed_url;
      });
    });
  });
  