// http://jsfiddle.net/joquery/9KYaQ/
String.format = function() {
    var theString = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
        var regEx = new RegExp("\\{" + (i - 1) + "\\}", "gm");
        theString = theString.replace(regEx, arguments[i]);
    }
    return theString;
}

$(function() {
    $("a[href^='#']").on('click', function(e) {
        e.preventDefault();
        var hash = this.hash;
        $('html, body').animate({
            scrollTop: $(hash).offset().top
        }, 300, function() {
            window.location.hash = hash;
        });
    });

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
            var helpBlock = $('#addword .form-group span.help-block');
            var formGroup = $('#addword .form-group');
            if (!/[^a-zA-Z]/.test(newWord)) {
                var emptyMsg = $('#word-list > ul > li.disabled');
                emptyMsg.hide();
                helpBlock.hide();
                if (!formGroup.hasClass("has-error")) formGroup.removeClass("has-error");

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
            } else {
                helpBlock.show();
                if (!formGroup.hasClass("has-error")) formGroup.addClass("has-error");
            }
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

        var missingWords = $('#missing-words .word-list ul');
        missingWords.html('');

        console.log(String.format("Generating Word Search ({0}x{1})", width, height));

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
                    // console.log("Attempt " + attempt + " to place '" + sWord + "'");
                    try {
                        var x = Math.floor(Math.random() * width);
                        var y = Math.floor(Math.random() * height);

                        var options = { // Set to false if you don't want thr program to place in the direction
                            vertical: true,
                            horizontal: true,
                            diagonal: true
                        }

                        var tx = x, ty = y;

                        if (options.vertical) {
                            if (y + sLength >= height) ty = height - sLength;

                            for (var i = 0; i < sLength; i++) {
                                if (charTable[ty + i][tx] == undefined) continue;
                                if (charTable[ty + i][tx] == sWord[i]) continue;
                                options.vertical = false;
                            }
                        }

                        if (options.horizontal) {
                            if (x + sLength >= width) tx = width - sLength;

                            for (var i = 0; i < sLength; i++) {
                                if (charTable[ty][tx + i] == undefined) continue;
                                if (charTable[ty][tx + i] == sWord[i]) continue;
                                options.horizontal = false;
                            }
                        }

                        if (options.diagonal) {
                            if (y + sLength >= height) ty = height - sLength;
                            if (x + sLength >= width) tx = width - sLength;

                            for (var i = 0; i < sLength; i++) {
                                if (charTable[ty + i][tx + i] == undefined) continue;
                                if (charTable[ty + i][tx + i] == sWord[i]) continue;
                                options.diagonal = false;
                            }
                        }

                        var finalOptions = {}
                        if (options.vertical) finalOptions["vertical"] = true;
                        if (options.horizontal) finalOptions["horizontal"] = true;
                        if (options.diagonal) finalOptions["diagonal"] = true;

                        var obj_keys = Object.keys(finalOptions);
                        var ran_key = obj_keys[Math.floor(Math.random() * obj_keys.length)];

                        if (ran_key == "vertical") {
                            if (y + sLength >= height) y = height - sLength;
                            for (var i = 0; i < sLength; i++) {
                                charTable[y + i][x] = sWord[i];
                            }
                            placed = true;
                        } else if (ran_key == "horizontal") {
                            if (x + sLength >= width) x = width - sLength;
                            for (var i = 0; i < sLength; i++) {
                                charTable[y][x + i] = sWord[i];
                            }
                            placed = true;
                        } else if (ran_key == "diagonal") {
                            if (y + sLength >= height) y = height - sLength;
                            if (x + sLength >= width) x = width - sLength;
                            for (var i = 0; i < sLength; i++) {
                                charTable[y + i][x + i] = sWord[i];
                            }
                            placed = true;
                        }

                        if (placed) console.log(String.format("Placed '{0}' on attempt {1} ({2})", sWord, attempt, ran_key));
                    } catch (err) {
                        console.log(err);
                    }
                }
                if (!placed) {
                    var item = $('<li class="list-group-item"></i>');
                    var spanWord = $('<span class="word">' + sWord.toUpperCase() + '</span>');
                    item.append(spanWord);
                    missingWords.append(item);
                    console.log(String.format("Failed to place '{0}' after {1} attempt(s)", sWord, attempt));
                    $('#missing-words').show();
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
