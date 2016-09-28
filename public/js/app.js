$(document).ready(function () {
    var $document = $(document);
    var selector = '[data-rangeslider]';
    var $element = $(selector);
    var textContent = ('textContent' in document) ? 'textContent' : 'innerText';
    var gameID;

    $.ajax('http://localhost:3000/Deck/new', {
            beforeSend: function(xhr) {
                return xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
            }
        }).done(function(data) {
            console.log(JSON.stringify(data.id));
            gameID = data.id;
            //console.log( JSON.stringify(data.players[0].hand[0]));
    });


var gameidtest = '57ebe05bb7819a19aa9cc858';

        $.ajax('http://localhost:3000/Deck/' + gameidtest + '/shuffle', {
            beforeSend: function(xhr) {
                return xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
            }
        }).done(function(data) {
            console.log('shuffled game id: ' + gameidtest)
    });

$.ajax('http://localhost:3000/Deck/' + gameidtest + '/deal', {
            beforeSend: function(xhr) {
                return xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
            }
        }).done(function(data) {
            console.log(JSON.stringify(data.players[0].hand[0].Suit + data.players[0].hand[0].Value + data.players[0].hand[1].Suit + data.players[0].hand[1].Value));
    });



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

