$(document).ready(function() {
  $('#search').click(function() {
    let brand = $('#manufacturer').val();
    $('#manufacturer').val("");

    let request = new XMLHttpRequest();
    let url = `https://bikeindex.org:443/api/v3/search?page=1&per_page=25&manufacturer=${brand}&location=IP&distance=10&stolenness=stolen`;


    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      } else if (this.readyState === 4 && this.status !== 200){
        $(".errors").text("Uh oh! Something went wrong!");
      }
    }

    request.open("GET", url, true);
    request.send();

    const getElements = function(response) {

      if (response.bikes != "") {
      $('.showBike').text(`These are the lost bikes with the brand ${brand}:`);
      response.bikes.forEach(function(bikeInfo) {
        let dateStolen = new Date(`${bikeInfo.date_stolen}`*1000);
        $('.showBike').append(`<ul><li>${bikeInfo.title}</li> <ul><li>${bikeInfo.id}</li> <li>${bikeInfo.serial}</li> <li>${bikeInfo.manufacturer_name}</li> <li>${bikeInfo.frame_model}</li> <li>${bikeInfo.year}</li> <li>${bikeInfo.frame_colors}</li> <li>${bikeInfo.stolen_location}</li> <li>${dateStolen}</li></ul></ul>`);
      })
      } else {
        $('.showBike').text('There are no manufactures that match your search.')
      }
    }
  });
});
