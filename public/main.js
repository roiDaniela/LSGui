// let p2Status={pa: true, pb: false, pc: true};
let p2Status={};

function UpdateTable(){
    $('#tbl-body').empty();
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
    let d = new Date();
    let n = d.getTime();
    $("#time").val(n);
    $("#batch").val(n);
    $("#rID").val(Math.floor((Math.random() * 100) + 1));
    UpdateTable();
    // $('#tbl-body').after('<tr><th scope="row">1</th><td>Mark</td><td>Otto</td><td>@mdo</td></tr>');
});

setInterval(function() {
    let time = $("#time").val();
    let batch = $("#batch").val();
    let rID = $("#rID").val();

    $.ajax('/api/getIoc', {
        method: "GET",
        data: {
            time: time,
            batchTime: batch,
            runID: rID
        },
        success: function(data) {
            console.log(data);
            try {
                p2Status = JSON.parse(data);
            } catch (e) {
                p2Status = data;
            }
            UpdateTable();
        },
        error: function(data) {
            console.log('Error: ' + data);
        }
    });
}, 1000 ); // every second