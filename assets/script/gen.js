$(function() {
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
            var spanWord = $('<span class="word">' + newWord + '</span>');
            item.append(spanWord);
            item.append(remove);
            list.append(item);
            $('#word').val("");
        }
    });

    $('button#generate').click(function() {
        var table = $('table#search-output tbody');
        table.html('');

        var charTable = [];
        for (var i = 0; i < 10; i++) {
            charTable[i] = new Array(10);
            for (var x = 0; x < 10; x++) {
                charTable[i][x] = "a";
            }
        }

        for (var y = 0; y < 10; y++) {
            var row = $('<tr></tr>');
            for (var x = 0; x < 10; x++) {
                var cell = $('<td></td>');
                cell.html(charTable[y][x]);
                row.append(cell);
            }
            table.append(row);
        }
    });
});
