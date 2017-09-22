$(function() {
    function randomChar() {
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        return possible.charAt(Math.floor(Math.random() * possible.length));
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
        var width = parseInt($('#tableWidth').value());
        var height =  parseInt($('#tableHeight').value());
        var table = $('table#search-output tbody');
        table.html('');

        var charTable = [];
        for (var i = 0; i < height; i++) {
            charTable[i] = new Array(width);
        }
        if ($('#word-list > ul > li').length > 1) {
            var wordList = [];
            $('#word-list > ul > li').each(function() {
                wordList.push($(this).children('span.word').text());
            });

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

    function sizeChanged() {
        var width = parseInt($('#tableWidth').text());
        var height =  parseInt($('#tableHeight').text());
        var table = $('table#search-output tbody');
        table.html('');

        var charTable = [];
        for (var i = 0; i < height; i++) {
            charTable[i] = new Array(width);
        }
        makeEmptyTable(table, width, height);
    }

    $('#tableWidth').change(sizeChanged());
    $('#tableHeight').change(sizeChanged());
});
