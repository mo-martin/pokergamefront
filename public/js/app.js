$(document).ready(function () {
    var $document = $(document);
    var selector = '[data-rangeslider]';
    var $element = $(selector);
    var textContent = ('textContent' in document) ? 'textContent' : 'innerText';

    function valueOutput(element) {
        var value = element.value;
        var output = element.parentNode.getElementsByTagName('output')[0] || element.parentNode.parentNode.getElementsByTagName('output')[0];
        output[textContent] = value;
        console.log(value);
    }

    $document.on('input', 'input[type="range"], ' + selector, function(e) {
        valueOutput(e.target);
    });

    var currentX = cards.positions.back.X;
    var currentY = cards.positions.back.Y;
    console.log(`X:${currentX} -  Y:${currentY}`)

    //$('#p1c1').css('background', 'url("./public/images/cards.png")' + '240px -340px');
    $('#p1c1').css('background', `url("./public/images/cards.png") ${currentX}px ${currentY}px`);

// //chips validation on raise
// function playerBet(){

// };

});

