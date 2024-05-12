var fieldWidth;
var fieldHeight;
var interval;

var re=/^-|^$/

$(document).ready(function (){
    $("#start").click(function(){
        fieldWidth = $('#figuresCont').width();
        fieldHeight = $('#figuresCont').height();
        if(!re.test($("#interval").val())){
            interval = parseInt($("#interval").val());
        } else{
            $("#interval").val("");
            $("#err").show();
            return false;
        }
        $("#startCont").hide();
        $("#counter").show();
        $("#figuresCont").show();
        animateDiv();
    });
});

// function getRandom(min, max) {
//     return parseInt(Math.random() * (max - min + 1)) + min;
// }
//
// function StartHunt(){
//     $("#fly").animate({top: getRandom(10, fieldHeight-10), left: getRandom(10, fieldWidth-10)},
//         3000)
//         .animate({top: "300", left: "200"},
//             3000)
//         .animate({top: "100", left: "400"},
//             3000);
//     return false;
// }

function makeNewPosition(){

    // Get viewport dimensions (remove the dimension of the div)
    var h = fieldHeight - 50;
    var w = fieldWidth - 50;

    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);

    return [nh,nw];

}

function animateDiv(){
    var newq = makeNewPosition();
    var oldq = $('#fly').offset();
    var speed = calcSpeed([oldq.top, oldq.left], newq);

    $('#fly').animate({ top: newq[0], left: newq[1] }, speed, function(){
        animateDiv();
    });

};

function calcSpeed(prev, next) {

    var x = Math.abs(prev[1] - next[1]);
    var y = Math.abs(prev[0] - next[0]);

    var greatest = x > y ? x : y;

    var speedModifier = 0.1;

    var speed = Math.ceil(greatest/speedModifier);

    return speed;

}