/* global $ */
$(document).ready(function () {
  // Dictionary to store Amenity IDs
  const amenityIDs = {};

  // Function to update the h4 tag with the list of Amenities checked
  function updateAmenities() {
    const checkedAmenities = Object.values(amenityIDs);
    let amenitiesHTML = '';
    for (const amenityName of checkedAmenities) {
      amenitiesHTML += `<li>${amenityName}</li>`;
    }
    $('div.Amenities > ul').html(amenitiesHTML);
  }

  // Listen for changes on each input checkbox tag
  $('input[type="checkbox"]').change(function () {
    const amenityID = $(this).data('id');
    const amenityName = $(this).data('name');

    // If the checkbox is checked, store the Amenity ID in the dictionary
    if ($(this).is(':checked')) {
      amenityIDs[amenityID] = amenityName;
    } else {
      // If the checkbox is unchecked, remove the Amenity ID from the dictionary
      delete amenityIDs[amenityID];
    }

    // Update the h4 tag inside the div Amenities with the list of Amenities checked
    updateAmenities();
  });
  function checkAPIStatus () {
    // Send GET request to API
    $.get('http://0.0.0.0:5001/api/v1/status/', function (data, status) {
      // If status is "OK", add class "available" to div#api_status
      if (data.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        // Otherwise, remove class "available"
        $('#api_status').removeClass('available');
      }
    });
  }

  // Call checkAPIStatus function initially
  checkAPIStatus();

  // Call checkAPIStatus function every 5000 ms (5 seconds)
  setInterval(checkAPIStatus, 5000);
});
