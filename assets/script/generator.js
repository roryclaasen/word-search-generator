// http://jsfiddle.net/joquery/9KYaQ/
String.format = function() {
    var theString = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
        var regEx = new RegExp("\\{" + (i - 1) + "\\}", "gm");
        theString = theString.replace(regEx, arguments[i]);
    }
    return theString;
}

var Generator = function() {
    var randomChar = function() {
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        return possible.charAt(Math.floor(Math.random() * possible.length));
    }

    // https://stackoverflow.com/a/2450976/4498839
    var shuffle = function(array) {
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

    var fillEmpty = function(table, width, height) {
        for (var i = 0; i < height; i++) {
            for (var x = 0; x < width; x++) {
                if (table[i][x] == undefined) table[i][x] = randomChar();
            }
        }
        return table;
    }

    var wordList = [];
    this.missingWords = [];

    this.options = {
        width: 12,
        height: 12,
        debug: false
    }

    this.log = function(text) {
        if (this.options.debug) console.log(text);
    }

    this.addWord = function(word) {
        wordList.push(word);
        this.log(String.format('Added word "{0}"', word));
    }

    this.removeWord = function(word) {
        wordList.splice(wordList.indexOf(word), 1);
        this.log(String.format('Removed word "{0}"', word));
    }

    this.make = function() {
        this.missingWords = [];
        var width = this.options.width;
        var height = this.options.height;
        var charTable = [];

        this.log(String.format('Generating Word Search ({0}x{1})', width, height));

        for (var i = 0; i < height; i++) {
            charTable[i] = new Array(width);
        }
        if (wordList.length > 0) {
            wordList = shuffle(wordList);
            for (var w = 0; w < wordList.length; w++) {
                if (wordList[w] == undefined || wordList[w].length == 0) continue;
                var attempt = 0;
                var placed = false;
                var sWord = wordList[w];
                var sLength = sWord.length;
                while (attempt < 5 && !placed) {
                    attempt++;
                    this.log(String.format('Attempt {0} to place "{1}"', attempt, sWord));
                    try {
                        var x = Math.floor(Math.random() * width);
                        var y = Math.floor(Math.random() * height);

                        // Set to false if you don't want thr program to place in the direction
                        var direction = {
                            vertical: true,
                            horizontal: true,
                            diagonal: true
                        }

                        var tx = x, ty = y;

                        if (direction.vertical) {
                            if (y + sLength >= height) ty = height - sLength;
                            if (ty < 0) direction.vertical = false;
                            else {
                                for (var i = 0; i < sLength; i++) {
                                    if (charTable[ty + i][tx] == undefined) continue;
                                    if (charTable[ty + i][tx] == sWord[i]) continue;
                                    direction.vertical = false;
                                }
                            }
                        }
                        if (direction.horizontal) {
                            if (x + sLength >= width) tx = width - sLength;
                            if (tx < 0) direction.horizontal = false;
                            else {
                                for (var i = 0; i < sLength; i++) {
                                    if (charTable[ty][tx + i] == undefined) continue;
                                    if (charTable[ty][tx + i] == sWord[i]) continue;
                                    direction.horizontal = false;
                                }
                            }
                        }
                        if (direction.diagonal) {
                            if (y + sLength >= height) ty = height - sLength;
                            if (x + sLength >= width) tx = width - sLength;
                            if (ty < 0 || tx < 0) direction.diagonal = false;
                            else {
                                for (var i = 0; i < sLength; i++) {
                                    if (charTable[ty + i][tx + i] == undefined) continue;
                                    if (charTable[ty + i][tx + i] == sWord[i]) continue;
                                    direction.diagonal = false;
                                }
                            }
                        }

                        var finalOptions = {}
                        if (direction.vertical) finalOptions['vertical'] = true;
                        if (direction.horizontal) finalOptions['horizontal'] = true;
                        if (direction.diagonal) finalOptions['diagonal'] = true;

                        var obj_keys = Object.keys(finalOptions);
                        var ran_key = obj_keys[Math.floor(Math.random() * obj_keys.length)];

                        if (ran_key == 'vertical') {
                            if (y + sLength >= height) y = height - sLength;
                            for (var i = 0; i < sLength; i++) {
                                charTable[y + i][x] = sWord[i];
                            }
                            placed = true;
                        } else if (ran_key == 'horizontal') {
                            if (x + sLength >= width) x = width - sLength;
                            for (var i = 0; i < sLength; i++) {
                                charTable[y][x + i] = sWord[i];
                            }
                            placed = true;
                        } else if (ran_key == 'diagonal') {
                            if (y + sLength >= height) y = height - sLength;
                            if (x + sLength >= width) x = width - sLength;
                            for (var i = 0; i < sLength; i++) {
                                charTable[y + i][x + i] = sWord[i];
                            }
                            placed = true;
                        }
                        if (placed) this.log(String.format('Placed "{0}" on attempt {1} ({2})@[{3}, {4}]', sWord, attempt, ran_key, x, y));
                    } catch (err) {
                        console.log(err);
                    }
                }
                if (!placed) {
                    this.log(String.format('Failed to place "{0}" after {1} attempt(s)', sWord, attempt));
                    this.missingWords.push(sWord);
                }
            }
        }
        charTable = fillEmpty(charTable, width, height);
        return charTable;
    }
}
