$(function() {
    var wordGame = new WordGame();

    $("a[href^='#']").on('click', function(e) {
        e.preventDefault();
        var hash = this.hash;
        $('html, body').animate({
            scrollTop: $(hash).offset().top
        }, 300, function() {
            window.location.hash = hash;
        });
    });

    $('button#generate').click(function() {
        var table = $('table#search-output tbody');
        table.html('');

        wordGame.generator.options.width = parseInt($('#tableWidth').find(":selected").text());
        wordGame.generator.options.height = parseInt($('#tableHeight').find(":selected").text());

        wordGame.maxNumberWords = parseInt($('#maxWords').val());

        var charTable = wordGame.newGame();
        var wordList = wordGame.generator.wordList;

        var list = $('#word-list > ul');
        var emptyMsg = $('#word-list > ul > li.disabled');
        $("#word-list > ul > li:not(:first-child)").remove();
        emptyMsg.show();
        for (i = 0; i < wordList.length; i++) {
            var word = wordList[i];
            var item = $('<li class="list-group-item"></i>');
            var spanWord = $('<span class="word">' + word.toUpperCase() + '</span>');
            item.append(spanWord);
            list.append(item);
            emptyMsg.hide();
        }

        for (var y = 0; y < wordGame.generator.options.height; y++) {
            var row = $('<tr></tr>');
            for (var x = 0; x < wordGame.generator.options.width; x++) {
                var cell = $('<td></td>');
                cell.html(charTable[y][x]);
                row.append(cell);
            }
            table.append(row);
        }
    });
});
