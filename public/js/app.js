$(document).ready(function() {
    var $document = $(document);
    var selector = '[data-rangeslider]';
    var $element = $(selector);
    var textContent = ('textContent' in document) ? 'textContent' : 'innerText';
    var gameID;

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
                console.log(data.players[0].hand[0].Suit + data.players[0].hand[0].Value);
                //$("p1c1").html();

            });
        });
    });



        $.getJSON('./public/js/coords.json', function(data) {
            console.log(data.positions.S1);
        });


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



    function valueOutput(element) {
        var value = element.value;
        var output = element.parentNode.getElementsByTagName('output')[0] || element.parentNode.parentNode.getElementsByTagName('output')[0];
        output[textContent] = value;
        //console.log(value);
    }

    $document.on('input', 'input[type="range"], ' + selector, function(e) {
        valueOutput(e.target);
    });

    var currentX = cards.positions.back.X;
    var currentY = cards.positions.back.Y;
    //console.log(`X:${currentX} -  Y:${currentY}`)

    //$('#p1c1').css('background', 'url("./public/images/cards.png")' + '240px -340px');
    $('#p1c1').css('background', `url("./public/images/cards.png") ${currentX}px ${currentY}px`);

    // //chips validation on raise
    // function playerBet(){

    // };

});
