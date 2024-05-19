var fieldWidth;
var fieldHeight;
var interval;

var re1=/^-|^0/
var re2=/^$/

$(document).ready(function (){
    $("#start").click(function(){
        if(!re1.test($("#interval").val()) && !re2.test($("#interval").val())){
            interval = parseInt($("#interval").val());
        } else{
            $("#interval").val("");
            $("#err").show();
            return false;
        }
        $("#startCont").hide();
        $("#counter").show();
        $("#figuresCont").show();
        createFly();
        $("#figuresCont div").each(function () {
            animateDiv($(this));
        });
        setInterval(function (){
            createFly();
            $("#figuresCont div").each(function () {
                animateDiv($(this));
            });
        }, interval*1000);
    });
});

function getRandom(min, max) {
    return parseInt(Math.random() * (max - min + 1)) + min;
}

function createFly() {
    fieldWidth = $('#figuresCont').width();
    fieldHeight = $('#figuresCont').height();
    const figure = $('<div>').addClass('fly').css({left: getRandom(150, fieldWidth),
        top: getRandom(170, fieldHeight)});
    $("#figuresCont").prepend(figure);
}


function animateDiv($target){
    fieldWidth = $('#figuresCont').width();
    fieldHeight = $('#figuresCont').height();
    // $target.click(function (){
    //     $target.remove();
    //     $("#counter").text(parseInt($("#counter").text()) + 1);
    // })
    if ($target.css('opacity') === '0'){
        $target.remove();
        $("#counter").text(parseInt($("#counter").text()) + 1);
    }
    if($target.length){
        $target.animate({ top: getRandom(170, fieldHeight+30), left: getRandom(150, fieldWidth+5),
            opacity: $target.css('opacity')-getRandom(0.2, 0.9) }, getRandom(1000, 5000), function (){
            animateDiv($target);
        });
    }
}