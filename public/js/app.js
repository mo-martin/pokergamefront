$(document).ready(function() {
    var $document = $(document);
    var selector = '[data-rangeslider]';
    var $element = $(selector);
    var textContent = ('textContent' in document) ? 'textContent' : 'innerText';
    var gameID;
    var card;

    $.ajax('http://localhost:3000/Deck/new', { //creates new game
        beforeSend: function(xhr) {
            return xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
        }
    }).done(function(data) { //data.id goves game id from json
        //console.log("Game Initiated: " + JSON.stringify(data.id));
        gameID = data.id;
        console.log("New Game Initiated with ID: " + gameID);
        //localStorage.setItem("gameID", data.id);
        //console.log(JSON.stringify(data.players[0].hand[0]));
        $.ajax('http://localhost:3000/Deck/' + gameID + '/shuffle', {
            beforeSend: function(xhr) {
                return xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
            }
        }).done(function(data) {
            console.log('Shuffled Game ID: ' + gameID);
            $.ajax('http://localhost:3000/Deck/' + gameID + '/deal', {
                beforeSend: function(xhr) {
                    return xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
                }
            }).done(function(data) {
                console.log('Dealt Game ID: ' + gameID);
                $("#playerOne").html(data.players[0].chips);
                $("#playerTwo").html(data.players[1].chips);
                $("#playerThree").html(data.players[2].chips);
                $("#playerFour").html(data.players[3].chips);
                $("#playerFive").html(data.players[4].chips);
                card = data.players[0].hand[0].Suit + data.players[0].hand[0].Value;
                setCards(card, 1, 1);
                card = data.players[0].hand[1].Suit + data.players[0].hand[1].Value;
                setCards(card, 1, 2);

                card = data.players[1].hand[0].Suit + data.players[1].hand[0].Value;
                setCards(card, 2, 1);
                card = data.players[1].hand[1].Suit + data.players[1].hand[1].Value;
                setCards(card, 2, 2);

                card = data.players[2].hand[0].Suit + data.players[2].hand[0].Value;
                setCards(card, 3, 1);
                card = data.players[2].hand[1].Suit + data.players[2].hand[1].Value;
                setCards(card, 3, 2);

                card = data.players[3].hand[0].Suit + data.players[3].hand[0].Value;
                setCards(card, 4, 1);
                card = data.players[3].hand[1].Suit + data.players[3].hand[1].Value;
                setCards(card, 4, 2);

                card = data.players[4].hand[0].Suit + data.players[4].hand[0].Value;
                setCards(card, 5, 1);
                card = data.players[4].hand[1].Suit + data.players[4].hand[1].Value;
                setCards(card, 5, 2);

            });
        });
    });


    function setCards(card, num1, num2) {
        $.getJSON('https://raw.githubusercontent.com/alanbonhamsky/pokergamefront/master/public/js/coords.json', function(data) {
            console.log(card);
            var currentX = data.positions[card].X;
            var currentY = data.positions[card].Y;
            $('#p'+ num1 +'c' + num2).css('background', `url("./public/images/cards.png") ${currentX}px ${currentY}px`);
        });
    }



    // //this will advance the rounds
    //     $.ajax('http://localhost:3000/Deck/' + gameID + '/deal', {
    //         beforeSend: function(xhr) {
    //             return xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    //         }
    //     }).done(function(data) {
    //         console.log('Dealt game id: ' + gameID);
    //     });



    //access game state
    // $.ajax('http://localhost:3000/Deck/' + gameID + '/cards', {
    //     beforeSend: function(xhr) {
    //         return xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    //     }
    // }).done(function(data) {

    //     console.log(JSON.stringify(data.players[0].hand[0].Suit + data.players[0].hand[0].Value + data.players[0].hand[1].Suit + data.players[0].hand[1].Value));
    // });


    //Slider///////////////////////////////////////////////////////////////////////
    function valueOutput(element) {
        var value = element.value;
        var output = element.parentNode.getElementsByTagName('output')[0] || element.parentNode.parentNode.getElementsByTagName('output')[0];
        output[textContent] = value;
        //console.log(value);
    }

    $document.on('input', 'input[type="range"], ' + selector, function(e) {
        valueOutput(e.target);
    });
    ///////////////////////////////////////////////////////////////////////////////


});
