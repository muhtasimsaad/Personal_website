const functions = require('@google-cloud/functions-framework');

/**
 * HTTP function that supports CORS requests.
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */
functions.http('generatePuzzle', (req, res) => {
  // Set CORS headers for preflight requests
  // Allows GETs from any origin with the Content-Type header
  // and caches preflight response for 3600s
  res.set('Access-Control-Allow-Origin', '*');

  // Send response to OPTIONS requests
  res.set('Access-Control-Allow-Methods', 'GET');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  res.set('Access-Control-Max-Age', '3600');

  // Get the name variable from query parameters
  const mainArray = [
        [
          ["6", "", "", "8", "", "", "2", "7", ""],
          ["", "3", "", "", "", "", "9", "4", ""],
          ["", "", "", "", "", "", "6", "3", ""],
          ["4", "", "6", "", "7", "", "", "", "3"],
          ["2", "1", "8", "", "", "9", "7", "", "4"],
          ["7", "", "", "2", "", "8", "", "6", ""],
          ["", "", "2", "4", "5", "", "", "", ""],
          ["1", "", "", "", "3", "", "4", "9", ""],
          ["", "", "4", "", "", "", "5", "1", "6"],
        ],
        [
          ["1", "", "", "5", "", "", "2", "3", ""],
          ["6", "", "", "", "", "1", "8", "", ""],
          ["", "2", "", "7", "", "", "", "5", ""],
          ["", "4", "9", "", "", "", "", "", ""],
          ["5", "", "", "", "", "", "", "", "8"],
          ["", "", "", "", "", "", "7", "6", ""],
          ["", "3", "", "", "", "7", "", "1", ""],
          ["", "", "6", "8", "", "", "", "", "2"],
          ["", "1", "4", "", "", "6", "", "", "5"],
        ],
        [
          ["6", "", "", "", "", "", "", "3", "9"],
          ["2", "", "3", "", "", "4", "", "", ""],
          ["", "", "", "5", "", "", "7", "", ""],
          ["", "3", "", "", "", "8", "", "", ""],
          ["9", "", "", "", "", "", "", "", "3"],
          ["", "", "", "7", "", "", "", "4", ""],
          ["", "", "5", "", "", "1", "", "", ""],
          ["", "", "", "4", "", "", "2", "", "6"],
          ["1", "9", "", "", "", "", "", "", "7"],
        ],
      ];

  const responseData = {
    puzzle: mainArray[Math.floor(Math.random() * mainArray.length)],
  };
  res.status(200).send(responseData);
   
});
