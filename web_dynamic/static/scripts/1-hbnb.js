/* gloabl $ */
$(document).ready(function() {
    // Dictionary to store Amenity IDs
    var amenityIDs = {};

    // Function to update the h4 tag with the list of Amenities checked
    function updateAmenities() {
        var checkedAmenities = Object.values(amenityIDs);
        $('div.Amenities > h4').text(checkedAmenities.join(', '));
    }

    // Listen for changes on each input checkbox tag
    $('input[type="checkbox"]').change(function() {
        var amenityID = $(this).data('id');
        var amenityName = $(this).data('name');

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
});
