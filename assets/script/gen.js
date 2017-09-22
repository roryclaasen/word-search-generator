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
                if ($('#word-list > ul > li').length == 1) {
                    emptyMsg.show();
                }
            });
            var spanWord = $('<span class="word">' + newWord.toUpperCase() + '</span>');
            item.append(spanWord);
            item.append(remove);
            list.append(item);
            $('#word').val("");
            $('span#nowords').hide();
        }
    });
    $('button#generate').click(function() {
        var width = 12;
        var height = 12;
        var noMsg = $('span#nowords');
        if ($('#word-list > ul > li').length == 1) {
            noMsg.show();
        } else {
            noMsg.hide();
            var table = $('table#search-output tbody');
            table.html('');

            var charTable = [];
            for (var i = 0; i < height; i++) {
                charTable[i] = new Array(width);
                for (var x = 0; x < width; x++) {
                    charTable[i][x] = randomChar();
                }
            }

            for (var y = 0; y < height; y++) {
                var row = $('<tr></tr>');
                for (var x = 0; x < width; x++) {
                    var cell = $('<td></td>');
                    cell.html(charTable[y][x]);
                    row.append(cell);
                }
                table.append(row);
            }
        }
    });
});
