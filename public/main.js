// let p2Status={pa: true, pb: false, pc: true};
let p2Status={};

function updateAccordingToVal(key, value, index){
    if(value){
        $('#tbl-body').append('<tr><th scope="row">'+index+'</th><td>'+key+'</td><td><div class="led-box"><div class="led-red"></div></div></td></tr>');
        $("#logger").append($( "<div>"+ "<strong>Phenomena: </strong>" +  key +  " <strong>ID: " + "</strong>" + $("#rID").val() + " <strong>Time: " + "</strong>" + $("#time").val() + " <strong>Batch time: </strong>" + $("#batch").val() + "</div>" ) )
        // $("#logger").append($( "<br><strong>Phenomena: </strong>" +  key +  " <strong>ID: " + "</strong>" + $("#rID").val() + " <strong>Time: " + "</strong>" + $("#time").val() + " <strong>Batch time: </strong>" + $("#batch").val()) )
    }
    else{
        $('#tbl-body').append('<tr><th scope="row">'+index+'</th><td>'+key+'</td><td><div class="led-box"><div class="led-green"></div></div></td></tr>');
    }
}
function UpdateTable(){
    $('#tbl-body').empty();
    try {
        Object.entries(p2Status).forEach(([key, value], index) => {
            console.log(`${index}: ${key} = ${value}`);
            updateAccordingToVal(key, value, index);
        });
    }catch (e) {
        jQuery.each(p2Status, function(key, val) {
           let index = Object.keys(p2Status).indexOf(key);
           updateAccordingToVal(key, val, index);
        });
    }
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

$("#startNewMission").click(function () {
    let  srcRepo = $("#srcRepo").val();
    let playingMode = $("#srcRepo").val();
    let startTime = $("#startTime").val();
    let endTime = $("#endTime").val();
    let selectedParticipants = $("#selectedParticipants").val();
    let runData = $("#runData").val();
    let algVersion = $("#algVersion").val();
    let operatorID = $("#operatorID").val();

    $.ajax('/api/startnewofflinesession', {
        method: "GET",
        data: {
            srcRepo: srcRepo,
            playingMode: playingMode,
            startTime: startTime,
            endTime: endTime,
            selectedParticipants: selectedParticipants,
            runData: runData,
            algVersion: algVersion,
            operatorID: operatorID
        },
        success: function(data) {
            console.log(data);
        },
        error: function(data) {
            console.log('Error: ' + data);
        }
    });
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