// Get the container element where the PDF will be rendered
var container = document.getElementById('pdf-container');

// Define the URL of the PDF file to load
var url = '../assets/pdfs/patientInfo.pdf';

// Use the Fetch API to load the PDF file as an ArrayBuffer
fetch(url)
  .then(response => response.arrayBuffer())
  .then(data => {
    // Load the PDF file using PDF.js
    return pdfjsLib.getDocument(data);
  })
  .then(pdf => {
    // Get the first page of the PDF
    return pdf.getPage(1);
  })
  .then(page => {
    // Set the viewport scale to 1 for full size
    var scale = 1;

    // Get the viewport of the page at the given scale
    var viewport = page.getViewport({ scale: scale });

    // Create a canvas element to render the page
    var canvas = document.createElement('canvas');
    canvas.style.display = 'block';
    canvas.style.margin = '0 auto';
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    container.appendChild(canvas);

    // Get the canvas context and set the scale
    var context = canvas.getContext('2d');
    context.scale(scale, scale);

    // Render the page on the canvas
    var renderContext = {
      canvasContext: context,
      viewport: viewport
    };
    return page.render(renderContext).promise;
  })
  .then(() => {
    console.log('Page rendered!');

    // Create a new annotation layer on the canvas
    var annotationLayer = document.createElement('div');
    annotationLayer.style.position = 'absolute';
    annotationLayer.style.top = '0';
    annotationLayer.style.left = '0';
    annotationLayer.style.width = '100%';
    annotationLayer.style.height = '100%';
    container.appendChild(annotationLayer);

    // Initialize the annotation layer using pdf-annotate
    var StoreAdapter = pdfAnnotate.StoreAdapter.LocalStorage;
    var storeAdapter = new StoreAdapter('pdfjs-demo');
    var viewer = new pdfAnnotate.Viewer({
      container: annotationLayer,
      storeAdapter: storeAdapter,
      enableEdit: true,
      enableDelete: true,
      enableCreateStamp: true,
      enablePolygon: true
    });

    // Enable checkbox annotation tool
    viewer.enableRect('Checkbox');

    // Enable line annotation tool
    viewer.enableRect('Line');

    // Add the PDF page to the annotation layer
    viewer.renderPage(1);

    // Save annotations to local storage when the user clicks the save button
    var saveButton = document.getElementById('save-button');
    saveButton.addEventListener('click', function() {
      var annotations = viewer.getAnnotations(1);
      storeAdapter.setAnnotations('patientInfo.pdf', 1, annotations);
      alert('Annotations saved!');
    });
  })
  .catch(error => {
    // Handle any errors that occur during the fetch or PDF loading process
    console.error(error);
  });
