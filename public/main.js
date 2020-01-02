// let p2Status={pa: true, pb: false, pc: true};
// import _ from "./lodash.min"
let p2Status={};

function updateAccordingToVal(key, value, index){
        let time = $("#time").val();
        let date = new Date(parseInt(time));
        let b_time = $("#batch").val();
        let b_date = new Date(parseInt(b_time));

        let jqr_str = '<tr><th scope="row">'+index+'</th><td>'+key+'</td>';
        jQuery.each(value, (t, status)=> {
            if(status){
                jqr_str+= '<td><div class="led-box"><div class="led-green"></div></div></td>';
            } else{
                jqr_str+= '<td><div class="led-box"><div class="led-red"></div></div></td>';
                $("#logger").append($( "<div></div><small>"+ "<strong>Phenomena: </strong>" +  key +  " <strong>ID: " + "</strong>" + $("#rID").val() + " <strong>Time: " + "</strong>" + date.toLocaleString() /*+ " <strong>B_time: </strong>" + b_date.toLocaleString() */+ "</small></div>" ) )
            }
        });
        jqr_str+='</tr>';
        $('#tbl-body').append($(jqr_str));
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
    // $("#rID").val(Math.floor((Math.random() * 100) + 1));
    $("#runID").val('_' + Math.random().toString(36).substr(2, 9));
    UpdateTable();
    // $('#tbl-body').after('<tr><th scope="row">1</th><td>Mark</td><td>Otto</td><td>@mdo</td></tr>');
});

$("#startNewOnlineMission").click(function () {
    let runID = $("#runID").val();
    let algVersion = $("#algVersion").val();

    $.ajax('/api/startNewRealTimeSession', {
        method: "GET",
        data: {
            runId: runID,
            algVersion: algVersion
        },
        success: function(data) {
            console.log(data);
            $("#runID").val('_' + Math.random().toString(36).substr(2, 9));
        },
        error: function(data) {
            console.log('Error: ' + data);
            $("#runID").val('_' + Math.random().toString(36).substr(2, 9));
        }
    });
});

$("#startNewOfflineMission").click(function () {
    let  srcRepo = $("#srcRepo").val();
    let playingMode = $("#srcRepo").val();
    let startTime = $("#startTime").val();
    let endTime = $("#endTime").val();
    let selectedParticipants = $("#selectedParticipants").val();
    // let runData = $("#runData").val();
    let runData = "offline";
    let runID = $("#runID").val();
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
            runId: runID,
            algVersion: algVersion,
            operatorID: operatorID
        },
        success: function(data) {
            console.log(data);
            $("#runID").val('_' + Math.random().toString(36).substr(2, 9));
        },
        error: function(data) {
            console.log('Error: ' + data);
            $("#runID").val('_' + Math.random().toString(36).substr(2, 9));
        }
    });
});

setInterval(function() {
    let endTime = $("#time").val();
    let startTime = endTime - 10;
    let batch = $("#batch").val();
    let rID = $("#rID").val();

    $.ajax('/api/getIoc', {
        method: "GET",
        data: {
            startTime: startTime,
            endTime: endTime,
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
    }).then(()=>{
        let d = new Date();
        let n = d.getTime();
        $("#time").val(n);
        $("#batch").val(n);
    });
}, 1000 ); // every second