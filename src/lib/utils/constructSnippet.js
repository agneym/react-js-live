/**
 * Constructs snippet from individual html, css and js code.
 * @param {object} snippet
 * @param {string} snippet.html
 * @param {string} snippet.css
 * @param {string} snippet.js
 * @param {string} id - unique ID for message propagation
 * @returns {string}
 */
function constructSnippet({ html, css, js }) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
      <title>Document</title>
      <style>${css}</style>
    </head>
    <body>
      ${html}
      <span></span>
      <script>
        var _privateLog = console.log;
        console.log = function(...rest) {
          if(typeof window !== 'undefined') {
            window.parent.postMessage({
              source: frame-${id},
              message: rest,
            }, "*");
          }
          _privateLog.apply(console, arguments);
        }
      </script>
      <script>
        ${js}
      </script>
    </body>
    </html>
  `;
}

export default constructSnippet;
