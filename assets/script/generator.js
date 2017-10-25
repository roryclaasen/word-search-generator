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

    this.wordList = [];
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
        this.wordList.push(word);
        this.log(String.format('Added word "{0}"', word));
    }

    this.removeWord = function(word) {
        this.wordList.splice(this.wordList.indexOf(word), 1);
        this.log(String.format('Removed word "{0}"', word));
    }

    this.removeAllWords = function() {
        this.wordList = [];
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
        if (this.wordList.length > 0) {
            this.wordList = shuffle(this.wordList);
            for (var w = 0; w < this.wordList.length; w++) {
                if (this.wordList[w] == undefined || this.wordList[w].length == 0) continue;
                var attempt = 0;
                var placed = false;
                var sWord = this.wordList[w];
                var sLength = sWord.length;
                while (attempt < 5 && !placed) {
                    attempt++;
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
        for (i = 0; i < this.missingWords.length; i++) {
            this.wordList.splice(this.wordList.indexOf(this.missingWords[i]), 1);
        }
        charTable = fillEmpty(charTable, width, height);
        return charTable;
    }
}

var WordGame = function() {
    this.generator = new Generator();
    this.running = false;
    this.generator.options.debug = true;

    this.addWord = function(word) {
        this.generator.addWord(word);
    }

    this.removeWord = function(word) {
        this.generator.removeWord(word);
    }

    var charTable;

    this.maxNumberWords = 10;

    this.newGame = function() {
        running = true;
        var words = [];
        for (i = 0; i < this.maxNumberWords; i++) {
            var word = randomWord();
            var attempt = 0;
            var added = false;
            while (attempt < 5 && !added) {
                attempt++;
                if (!words.includes(word)) {
                    added = true;
                    words.push(word);
                }
            }
        }
        this.generator.removeAllWords();
        for (i = 0; i < words.length; i++) {
            this.generator.addWord(words[i].toUpperCase());
        }
        return (charTable = this.generator.make());
    }

    var checkedList = [];

    this.foundWords = [];
    this.foundCallback;

    this.checkCell = function(x, y, checked) {
        this.generator.log(String.format('{0} cell {1}, {2}', checked ? "Checked" : "Unchecked", x, y));
        var cellData = {
            'x': x,
            'y': y,
            'letter': charTable[y][x]
        };
        if (checked) {
            checkedList.push(cellData);
            var tempWord = "";
            for (i = 0; i < checkedList.length; i++) {
                tempWord += checkedList[i].letter;
            }
            if (this.generator.wordList.includes(tempWord)) {
                this.generator.log("FOUND word");
                this.foundWords.push(tempWord);
                this.foundCallback(tempWord, checkedList);
                checkedList = [];
            }
        } else checkedList.splice(checkedList.indexOf(cellData), 1);
    }
}
