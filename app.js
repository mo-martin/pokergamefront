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



// //chips validation on raise
// function playerBet(){

// };

});

