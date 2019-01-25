    export default class Canvas {
        constructor(canvasNode, context, mousex, mousey ) {
            this.canvasNode = document.getElementById('canvas');
            this.context = canvas.getContext('2d');
            this.mousex = 0;
            this.mousey = 0;

        };

          window.onresize = resizeCanvas;
          resizeCanvas();

          function download(dataURL, filename) {
            var blob = dataURLToBlob(dataURL);
            var url = window.URL.createObjectURL(blob);

            var a = document.createElement("a");
            a.style = "display: none";
            a.href = url;
            a.download = filename;

            document.body.appendChild(a);
            a.click();

            window.URL.revokeObjectURL(url);
          };

          function dataURLToBlob(dataURL) {
            // Code taken from https://github.com/ebidel/filer.js
            var parts = dataURL.split(';base64,');
            var contentType = parts[0].split(":")[1];
            var raw = window.atob(parts[1]);
            var rawLength = raw.length;
            var uInt8Array = new Uint8Array(rawLength);

            for (var i = 0; i < rawLength; ++i) {
              uInt8Array[i] = raw.charCodeAt(i);
            };

            return new Blob([uInt8Array], { type: contentType });
          };

          clearButton.addEventListener("click", function (event) {
            signaturePad.clear();
          });

          undoButton.addEventListener("click", function (event) {
            var data = signaturePad.toData();

            if (data) {
              data.pop(); // remove the last dot or line
              signaturePad.fromData(data);
            }
          });

          changeColorButton.addEventListener("click", function (event) {
            var r = Math.round(Math.random() * 255);
            var g = Math.round(Math.random() * 255);
            var b = Math.round(Math.random() * 255);
            var color = "rgb(" + r + "," + g + "," + b +")";

            signaturePad.penColor = color;
          });

          savePNGButton.addEventListener("click", function (event) {
            if (signaturePad.isEmpty()) {
              alert("Please provide a signature first.");
            } else {
              var dataURL = signaturePad.toDataURL();
              download(dataURL, "signature.png");
            }
          });

          saveJPGButton.addEventListener("click", function (event) {
            if (signaturePad.isEmpty()) {
              alert("Please provide a signature first.");
            } else {
              var dataURL = signaturePad.toDataURL("image/jpeg");
              download(dataURL, "signature.jpg");
            }
          });

          saveSVGButton.addEventListener("click", function (event) {
            if (signaturePad.isEmpty()) {
              alert("Please provide a signature first.");
            } else {
              var dataURL = signaturePad.toDataURL('image/svg+xml');
              download(dataURL, "signature.svg");
            }
          });
}
