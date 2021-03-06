$(function() {
    var table = $('table#search-output tbody');
    var wordGame = new WordGame(table);
    var noWordsbadge = $('span#noWords');

    var timerId;
    var timeDiv = $('#timeTaken');
    var time = 0;

    $('button#generate').click(function() {
        table.html('');
        table.removeClass('notgame');

        wordGame.generator.options.width = parseInt($('#tableWidth').find(":selected").text());
        wordGame.generator.options.height = parseInt($('#tableHeight').find(":selected").text());

        wordGame.maxNumberWords = parseInt($('#maxWords').val());

        var charTable = wordGame.newGame();
        var wordList = wordGame.generator.currentWordList;

        var list = $('#word-list > ul');
        var emptyMsg = $('#word-list > ul > li.disabled');
        $("#word-list > ul > li:not(:first-child)").remove();
        emptyMsg.show();
        for (i = 0; i < wordList.length; i++) {
            var word = wordList[i];
            var item = $('<li class="list-group-item"></i>');
            var spanWord = $('<span class="word">' + word.toUpperCase() + '</span>');
            item.attr('data-word', word.toUpperCase()).append(spanWord);
            list.append(item);
            emptyMsg.hide();
        }

        noWordsbadge.html(wordList.length);

        for (var y = 0; y < wordGame.generator.options.height; y++) {
            var row = $('<tr></tr>');
            for (var x = 0; x < wordGame.generator.options.width; x++) {
                var cell = $('<td></td>');
                cell.html(charTable[y][x]).attr('data-cords', String.format('{0}-{1}', y, x)).data('x', x).data('y', y).click(function(e) {
                    var toggle = !$(this).hasClass('marked');
                    if (toggle) $(this).addClass('marked');
                    else $(this).removeClass('marked');
                    $(this).data('marked', toggle);

                    wordGame.checkCell($(this).data('x'), $(this).data('y'), toggle);
                });
                row.append(cell);
            }
            table.append(row);
        }
        updateProgress();
        time = -1;
        if (timerId != undefined) clearInterval(timerId);
        timerId = setInterval(updateTime, 1000);
        updateProgress();
    });

    wordGame.foundCallback = function(word, dataList) {
        for (i = 0; i < dataList.length; i++) {
            var data = dataList[i];
            var cell = table.find(String.format("td[data-cords='{0}-{1}']", data.y, data.x));
            cell.addClass('word');
            cell.removeClass('marked');
        }
        noWordsbadge.html(parseInt(noWordsbadge.html()) - 1);
        $('#word-list > ul').find(String.format("li[data-word='{0}']", word)).addClass("strike").addClass('disabled');

        updateProgress();
    };

    function updateTime() {
        time++;
        var minutes = Math.floor(time / 60);
        var seconds = time - minutes * 60;
        timeDiv.html(String.format('{0} Minutes {1} Seconds', minutes, seconds));
    }

    function updateProgress() {
        var progress = Math.floor((wordGame.foundWords.length / wordGame.generator.currentWordList.length) * 100);
        if (progress == Infinity) progress = 0;
        var progressbar = $('#progressComplete');
        progressbar.find('.progress-bar').css({ width: progress + '%'}).attr('aria-valuenow', progress);
        progressbar.find('.sr-only').html(progress + '% Complete');
        if (progress == 100) clearInterval(timerId);
    }
});
