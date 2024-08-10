fetch(`https://maps.googleapis.com/maps/api/timezone/json?location=39.6034810,-119.6822510&timestamp=1331161200&key=YOUR_API_KEY`)
  .then(response => response.json())
  .then(data => {
    console.log(data.timeZoneName);
  });
