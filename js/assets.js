// function getfilename(path) {
//     var filename = path.split(/(\\|\/)/g).pop();
//     return filename.substr(0, filename.lastIndexOf("."));
// }

// function toDataURL(url, filename, callback) {
//     var xhr = new XMLHttpRequest();
//     xhr.onload = function () {
//         var reader = new FileReader();
//         reader.onloadend = function () {
//             callback(filename, reader.result);
//         }
//         reader.readAsDataURL(xhr.response);
//     };
//     xhr.open('GET', url);
//     xhr.responseType = 'blob';
//     xhr.send();
// }

// function load_assets() {
//     var list_assets = ["assets/snake/body_bottomleft.png",
//         "assets/snake/body_bottomright.png",
//         "assets/snake/body_horizontal.png",
//         "assets/snake/body_topleft.png",
//         "assets/snake/body_topright.png",
//         "assets/snake/body_vertical.png",
//         "assets/snake/head_down.png",
//         "assets/snake/head_left.png",
//         "assets/snake/head_right.png",
//         "assets/snake/head_up.png",
//         "assets/snake/tail_down.png",
//         "assets/snake/tail_left.png",
//         "assets/snake/tail_right.png",
//         "assets/snake/tail_up.png"
//     ];

//     for (var i = 0; i < list_assets.length; i++) {
//         var filename = getfilename(list_assets[i]);
        
//         toDataURL(list_assets[i], filename, function (id, dataUrl) {
//             localStorage.setItem(id, dataUrl);
//         })
//     }
// }

function loadImages(imagefiles) {
    // Initialize variables
    // loadcount = 0;
    // loadtotal = imagefiles.length;
    // preloaded = false;

    // Load the images
    var loadedimages = [];
    for (var i = 0; i < imagefiles.length; i++) {
        // Create the image object
        var image = new Image();

        // Add onload event handler
        image.onload = function () {
            // loadcount++;
            // if (loadcount == loadtotal) {
            //     // Done loading
            //     // preloaded = true;
            // }
        };

        // Set the source url of the image
        image.src = imagefiles[i];

        // Save to the image array
        loadedimages[i] = image;
    }

    // Return an array of images
    return loadedimages;
}