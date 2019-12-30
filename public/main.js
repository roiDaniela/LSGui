// let p2Status={pa: true, pb: false, pc: true};
// import _ from "./lodash.min"
let p2Status={};

chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
};

MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

COLORS = [
    '#4dc9f6',
    '#f67019',
    '#f53794',
    '#537bc4',
    '#acc236',
    '#166a8f',
    '#00a950',
    '#58595b',
    '#8549ba'
];

// Samples = global.Samples || (global.Samples = {});
// Color = global.Color;

utils = {
    // Adapted from http://indiegamr.com/generate-repeatable-random-numbers-in-js/
    srand: function(seed) {
        this._seed = seed;
    },

    rand: function(min, max) {
        var seed = this._seed;
        min = min === undefined ? 0 : min;
        max = max === undefined ? 1 : max;
        this._seed = (seed * 9301 + 49297) % 233280;
        return min + (this._seed / 233280) * (max - min);
    },

    numbers: function(config) {
        var cfg = config || {};
        var min = cfg.min || 0;
        var max = cfg.max || 1;
        var from = cfg.from || [];
        var count = cfg.count || 8;
        var decimals = cfg.decimals || 8;
        var continuity = cfg.continuity || 1;
        var dfactor = Math.pow(10, decimals) || 0;
        var data = [];
        var i, value;

        for (i = 0; i < count; ++i) {
            value = (from[i] || 0) + this.rand(min, max);
            if (this.rand() <= continuity) {
                data.push(Math.round(dfactor * value) / dfactor);
            } else {
                data.push(null);
            }
        }

        return data;
    },

    labels: function(config) {
        var cfg = config || {};
        var min = cfg.min || 0;
        var max = cfg.max || 100;
        var count = cfg.count || 8;
        var step = (max - min) / count;
        var decimals = cfg.decimals || 8;
        var dfactor = Math.pow(10, decimals) || 0;
        var prefix = cfg.prefix || '';
        var values = [];
        var i;

        for (i = min; i < max; i += step) {
            values.push(prefix + Math.round(dfactor * i) / dfactor);
        }

        return values;
    },

    months: function(config) {
        var cfg = config || {};
        var count = cfg.count || 12;
        var section = cfg.section;
        var values = [];
        var i, value;

        for (i = 0; i < count; ++i) {
            value = MONTHS[Math.ceil(i) % 12];
            values.push(value.substring(0, section));
        }

        return values;
    },

    color: function(index) {
        return COLORS[index % COLORS.length];
    },

    transparentize: function(color, opacity) {
        var alpha = opacity === undefined ? 0.5 : 1 - opacity;
        return Color(color).alpha(alpha).rgbString();
    }
};

function randomScalingFactor() {
    return Math.round(utils.rand(-100, 100));
}

function createConfig(labels, details, data) {
    return {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'steppedLine: ' + details.steppedLine,
                steppedLine: details.steppedLine,
                data: data,
                borderColor: details.color,
                fill: false,
            }]
        },
        options: {
            responsive: true,
            title: {
                display: false,
                text: details.label,
            }
        }
    };
}

function updateAccordingToVal(key, value, index){
        let details = {
            steppedLine: 'middle',
            label: '',
            color: window.chartColors.blue
        };

        let data = [
            randomScalingFactor()
        ];


        let time = $("#time").val();
        let date = new Date(parseInt(time));
        let b_time = $("#batch").val();
        let b_date = new Date(parseInt(b_time));

        // let jqr_p = $('<tr><th scope="row">'+index+'</th><td>'+key+'</td><td><div class="led-box"><div class="led-red"></div></div></td><td><div class="container"><canvas class="form-control"></canvas></div></td></tr>');
        // let ctx = jqr_p.find("canvas")[0].getContext('2d');
        // let config = createConfig(_.range(parseInt(time) - 10, parseInt(time)), details, data);
        // new Chart(ctx, config);
        // let jqr_p = $('<tr><th scope="row">'+index+'</th><td>'+key+'</td><td><div class="led-box"><div class="led-red"></div></div></td><td>something</td></tr>');
        // $('#tbl-body').append(jqr_p);

        // let jqr_str = '<tr><th scope="row">'+index+'</th><td>'+key+'</td><td>';
        let len = 100 / Object.keys(value).length;
        // let jqr_str = '<tr><th scope="row">'+index+'</th><td>'+key+'</td><td><div class="led-box"><div class="led-red" style="display: inline-block;"></div></div><div class="led-box" style="display: inline-block;"><div class="led-red"></div></div><div class="led-box"><div class="led-red"display: inline-block;"></div></div></td></tr>';
        let jqr_str = '<tr><th scope="row">'+index+'</th><td>'+key+'</td>';
        jQuery.each(value, (t, status)=> {
            if(status){
                jqr_str+= '<td><div class="led-box"><div class="led-green"></div></div></td>';
            } else{
                jqr_str+= '<td><div class="led-box"><div class="led-red"></div></div></td>';
                // jqr_str+= '<div class="led-box" style="display: inline-block; float: left; width:';
                // jqr_str += len + '%"';
                // jqr_str +='"><div class="led-red">';
            }
        });
        jqr_str+='</tr>';
        $('#tbl-body').append($(jqr_str));
        $("#logger").append($( "<div></div><small>"+ "<strong>Ph: </strong>" +  key +  " <strong>ID: " + "</strong>" + $("#rID").val() + " <strong>Time: " + "</strong>" + date.toLocaleString() + " <strong>B_time: </strong>" + b_date.toLocaleString() + "</small></div>" ) )
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