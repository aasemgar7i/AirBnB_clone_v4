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

  // Listen for click event on the Search button
  $('button').click(function () {
    // Make a POST request to places_search with the list of Amenities checked
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      contentType: 'application/json',
      data: JSON.stringify({ amenities: Object.keys(amenityIDs) }),
      success: function (response) {
        // Clear existing places
        $('.places').empty();
        // Loop through the places data and create article tags
        response.forEach(function (place) {
          const article = '<article>' +
                          '<div class="title_box">' +
                            '<h2>' + place.name + '</h2>' +
                            '<div class="price_by_night">$' + place.price_by_night + '</div>' +
                          '</div>' +
                          '<div class="information">' +
                            '<div class="max_guest">' + place.max_guest + ' Guest' + (place.max_guest !== 1 ? 's' : '') + '</div>' +
                            '<div class="number_rooms">' + place.number_rooms + ' Bedroom' + (place.number_rooms !== 1 ? 's' : '') + '</div>' +
                            '<div class="number_bathrooms">' + place.number_bathrooms + ' Bathroom' + (place.number_bathrooms !== 1 ? 's' : '') + '</div>' +
                          '</div>' +
                          '<div class="description">' +
                            place.description +
                          '</div>' +
                        '</article>';
          $('.places').append(article);
        });
      }
    });
  });
});
