$(function() {
    function randomChar() {
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        return possible.charAt(Math.floor(Math.random() * possible.length));
    }

    // https://stackoverflow.com/a/2450976/4498839
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    $('form#addword').on('submit', function(e) {
        e.preventDefault();
        var newWord = $('#word').val();
        if (newWord.length > 0) {
            var emptyMsg = $('#word-list > ul > li.disabled');
            emptyMsg.hide();

            var list = $('#word-list > ul');
            var item = $('<li class="list-group-item"></i>')
            var remove = $('<i class="fa fa-times" aria-hidden="true"></i>');
            remove.click(function() {
                $(this).parent().remove();
                if ($('#word-list > ul > li').length == 1) emptyMsg.show();
            });
            var spanWord = $('<span class="word">' + newWord.toUpperCase() + '</span>');
            item.append(spanWord);
            item.append(remove);
            list.append(item);
            $('#word').val("");
        }
    });

    function fillEmpty(table, width, height) {
        for (var i = 0; i < height; i++) {
            for (var x = 0; x < width; x++) {
                if (table[i][x] == undefined) table[i][x] = randomChar();
            }
        }
        return table;
    }

    function makeEmptyTable(table, width, height) {
        for (var y = 0; y < height; y++) {
            var row = $('<tr></tr>');
            for (var x = 0; x < width; x++) {
                var cell = $('<td></td>');
                row.append(cell);
            }
            table.append(row);
        }
    }

    $('button#generate').click(function() {
        var width = parseInt($('#tableWidth').find(":selected").text());
        var height =  parseInt($('#tableHeight').find(":selected").text());
        var table = $('table#search-output tbody');
        table.html('');


        console.log("Generating Word Search (" + width + "x" + height + ")");

        var charTable = [];
        for (var i = 0; i < height; i++) {
            charTable[i] = new Array(width);
        }
        if ($('#word-list > ul > li').length > 1) {
            var wordList = [];
            $('#word-list > ul > li').each(function() {
                wordList.push($(this).children('span.word').text());
            });
            wordList = shuffle(wordList);
            for (var w = 0; w < wordList.length; w++) {
                if (wordList[w] == undefined || wordList[w].length == 0) continue;
                var attempt = 0;
                var placed = false;
                var sWord = wordList[w];
                var sLength = sWord.length;
                while (attempt < 5 && !placed) {
                    attempt++;
                    console.log("Attempt " + attempt + " to place '" + sWord + "'");
                    var x = Math.floor(Math.random() * width);
                    var y = Math.floor(Math.random() * height);

                    // TODO Change gen to support multiple directions
                    if (x + sLength >= width) x = width - sLength;

                    var canPlace = true;
                    for (var i = 0; i < sLength; i++) {
                        if (charTable[y][x + i] == undefined) continue;
                        if (charTable[y][x + i] == sWord[i]) continue;
                        canPlace = false;
                    }

                    if (canPlace) {
                        for (var i = 0; i < sLength; i++) {
                            charTable[y][x + i] = sWord[i];
                        }
                        placed = true;
                    }
                }
                if (!placed) {
                    // TODO Show missing words in UI
                    console.log("Failed to place '" + sWord + "' after " + attempt + " attempt(s)");
                }
            }
        }
        charTable = fillEmpty(charTable, width, height);

        for (var y = 0; y < height; y++) {
            var row = $('<tr></tr>');
            for (var x = 0; x < width; x++) {
                var cell = $('<td></td>');
                cell.html(charTable[y][x]);
                row.append(cell);
            }
            table.append(row);
        }
    });
});
