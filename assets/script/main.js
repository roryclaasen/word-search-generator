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
                    wordGame.removeWord($(this.text));
                    $(this).parent().remove();
                    if ($('#word-list > ul > li').length == 1) emptyMsg.show();
                });
                var spanWord = $('<span class="word">' + newWord.toUpperCase() + '</span>');
                wordGame.addWord(newWord.toUpperCase());
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

    $('button#generate').click(function() {
        var table = $('table#search-output tbody');
        table.html('');

        wordGame.generator.options.width = parseInt($('#tableWidth').find(":selected").text());
        wordGame.generator.options.height = parseInt($('#tableHeight').find(":selected").text());

        var charTable = wordGame.newGame();
        var wordList = wordGame.generator.wordList;
        console.log(wordList);
        
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
