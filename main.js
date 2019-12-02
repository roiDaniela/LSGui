// let p2Status={pa: true, pb: false, pc: true};
let p2Status={};

function UpdateTable(){
    Object.entries(p2Status).forEach(([key, value], index) => {
        console.log(`${index}: ${key} = ${value}`);
        if(value){
            $('#tbl-body').append('<tr><th scope="row">'+index+'</th><td>'+key+'</td><td><div class="led-box"><div class="led-red"></div></div></td></tr>');
        }
        else{
            $('#tbl-body').append('<tr><th scope="row">'+index+'</th><td>'+key+'</td><td><div class="led-box"><div class="led-green"></div></div></td></tr>');
        }
    });
}

$(document).ready(function () {
    UpdateTable();
    // $('#tbl-body').after('<tr><th scope="row">1</th><td>Mark</td><td>Otto</td><td>@mdo</td></tr>');
});

setInterval(function() {
    $.ajax('http://api.wunderground.com/api/c6dc8e785d943109/conditions/q/AZ/Chandler.json', {
        dataType: 'jsonp',
        success: function(json) {
            // $('div#city strong').text(json.current_observation.display_location.full)
            // $('div#icon').html('<img src=' + json.current_observation.icon_url + '>')
            // $('div#weather').text(json.current_observation.temperature_string + " " + json.current_observation.weather);
            // $('div#time').text(json.current_observation.observation_time_rfc822);
        }
    });
}, 1000 ); // every second