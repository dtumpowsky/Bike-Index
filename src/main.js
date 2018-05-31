$(document).ready(function() {
  $('#search').click(function() {
    let brand = $('#manufacturer').val();
    $('#manufacturer').val("");

    let request = new XMLHttpRequest();
    let url = `https://bikeindex.org:443/api/v3/manufacturers/${brand}`;


    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
    }

    request.open("GET", url, true);
    request.send();

    const getElements = function(response) {
      $('.showBike').text(`These are the lost bikes with this ${brand} are ${response.manufacturer.name} and an id of ${response.manufacturer.id}`);
    }
  });
});
