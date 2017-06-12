const request = require("request");

var geocodeAddress = (address) => {
  return new Promise((resolve, reject) => {
    var encodedAddress = encodeURIComponent(address);
    request({
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
      json: true
    }, (err, res, body) => {
      if (err){
        reject('Something went wrong. Unable to connect to google api');
      } else if (body.status === 'ZERO_RESULTS') {
        reject("Unable to find the address.")
      } else if (body.status === 'OK') {
        resolve({
          address: body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longitude: body.results[0].geometry.location.lng
        })
      }
    });
  })
};

geocodeAddress('19146fsafae').then((location) => {
  console.log(JSON.stringify(location, undefined, 2))
}, (errorMessage) => {
  console.log(errorMessage);
});