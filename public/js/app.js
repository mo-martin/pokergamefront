    var gameID;
    var card;
    var playerBet = 0;
    var players = [];
    $(document).ready(function() {
        var $document = $(document);
        var selector = '[data-rangeslider]';
        var $element = $(selector);
        var textContent = ('textContent' in document) ? 'textContent' : 'innerText';




        $("#newGame").click(function() {
            $('#c1').css('background', `url("/images/cardsbig.png") ${0}px ${0}px`);
            $('#c2').css('background', `url("/images/cardsbig.png") ${0}px ${0}px`);
            $('#c3').css('background', `url("/images/cardsbig.png") ${0}px ${0}px`);
            $('#c4').css('background', `url("/images/cardsbig.png") ${0}px ${0}px`);
            $('#c5').css('background', `url("/images/cardsbig.png") ${0}px ${0}px`);
            $.ajax( API_URL + '/Deck/new', { //creates new game
                beforeSend: function(xhr) {
                    return xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
                }
            }).done(function(data) { //data.id goves game id from json
                //console.log("Game Initiated: " + JSON.stringify(data.id));
                gameID = data.id;
                players = data.players;
                console.log("New Game Initiated with ID: " + gameID);
                //localStorage.setItem("gameID", data.id);
                //console.log(JSON.stringify(data.players[0].hand[0]));
                $.ajax(API_URL + '/Deck/' + gameID + '/shuffle', {
                    beforeSend: function(xhr) {
                        return xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
                    }
                }).done(function(data) {
                    console.log('Shuffled Game ID: ' + gameID);
                    $.ajax(API_URL + '/Deck/' + gameID + '/deal', {
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
                    $('#p' + num1 + 'c' + num2).css('background', `url("/images/cardsbig.png") ${currentX}px ${currentY}px`);
                });
            }

        });

        // $("#nextRound").click(function() {
        //     //this will advance the rounds
        //     $.ajax(API_URL + '/Deck/' + gameID + '/deal', {
        //         beforeSend: function(xhr) {
        //             return xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
        //         }
        //     }).done(function(data) {
        //         console.log('Dealt Next Round - game id: ' + gameID);

        //         for (var i = 0; i < data.boardPile.length; i++) {
        //             card = data.boardPile[i].Suit + data.boardPile[i].Value;
        //             setCards(card, i+1);
        //         }


        //         function setCards(card, num1) {
        //             $.getJSON('https://raw.githubusercontent.com/alanbonhamsky/pokergamefront/master/public/js/coords.json', function(data) {
        //                 console.log(card);
        //                 var currentX = data.positions[card].X/3;
        //                 var currentY = data.positions[card].Y/3;
        //                 $('#c' + num1).css('background', `url("/images/cards.png") ${currentX}px ${currentY}px`);
        //             });
        //         }
        //     });
        // });

       
        $('#bet').on('click', function(e) {
            e.preventDefault();
            playerBet = 100;
            
            for (var i = 0; i < players.length; i++) {
                players[i].bet = playerBet;
                $.ajax( API_URL + '/game/' + gameID + '/player/' + (i+1) + '/bet/' + playerBet, { //places a bet
                    beforeSend: function(xhr) {
                        return xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
                    }
                }).done(function(data) {

                $.ajax(API_URL + '/Deck/' + gameID + '/cards', {
                    beforeSend: function(xhr) {
                            return xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
                        }
                        }).done(function(data) {
                        $("#playerOne").html(data.players[0].chips);
                        $("#playerTwo").html(data.players[1].chips);
                        $("#playerThree").html(data.players[2].chips);
                        $("#playerFour").html(data.players[3].chips);
                        $("#playerFive").html(data.players[4].chips);
                    });
                });
            }

            $.ajax(API_URL + '/Deck/' + gameID + '/deal', {
                beforeSend: function(xhr) {
                    return xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
                }
            }).done(function(data) {
                console.log('Dealt Next Round - game id: ' + gameID);

                for (var i = 0; i < data.boardPile.length; i++) {
                    card = data.boardPile[i].Suit + data.boardPile[i].Value;
                    setCards(card, i+1);
                }


                function setCards(card, num1) {
                    $.getJSON('https://raw.githubusercontent.com/alanbonhamsky/pokergamefront/master/public/js/coords.json', function(data) {
                        console.log(card);
                        var currentX = data.positions[card].X;
                        var currentY = data.positions[card].Y;
                        $('#c' + num1).css('background', `url("/images/cardsbig.png") ${currentX}px ${currentY}px`);
                    });
                }
            });
            console.log(players);
        });
        $('#raise').on('click', function(e) {
            e.preventDefault();
            alert("You clicked raise!");
        });

        $('#fold').on('click', function(e) {
            e.preventDefault();
            alert("You dclicked fold!");
        });

        $('#call').on('click', function(e) {
            e.preventDefault();
            alert("You clicked call!");
        });

        $('#check').on('click', function(e) {
            e.preventDefault();
            alert("You clicked check!");
        });



        //access game state



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
