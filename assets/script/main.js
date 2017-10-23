$(function() {
    var wordGenerator = new Generator();

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
                    wordGenerator.removeWord($(this.text));
                    $(this).parent().remove();
                    if ($('#word-list > ul > li').length == 1) emptyMsg.show();
                });
                var spanWord = $('<span class="word">' + newWord.toUpperCase() + '</span>');
                wordGenerator.addWord(newWord.toUpperCase());
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
        var width = parseInt($('#tableWidth').find(":selected").text());
        var height =  parseInt($('#tableHeight').find(":selected").text());
        var table = $('table#search-output tbody');
        table.html('');

        var missingWords = $('#missing-words .word-list ul');
        missingWords.html('');

        console.log(String.format("Generating Word Search ({0}x{1})", width, height));

        var charTable = wordGenerator.make();
        var missingWordList = wordGenerator.missingWords;

        for (i = 0; i < missingWordList.length; i++) {
            var word = missingWordList[i];
            var item = $('<li class="list-group-item"></i>');
            var spanWord = $('<span class="word">' + word.toUpperCase() + '</span>');
            item.append(spanWord);
            missingWords.append(item);
            console.log(String.format("Failed to place '{0}' after {1} attempt(s)", word, attempt));
            $('#missing-words').show();
        }

        for (var y = 0; y < wordGenerator.options.height; y++) {
            var row = $('<tr></tr>');
            for (var x = 0; x < wordGenerator.options.width; x++) {
                var cell = $('<td></td>');
                cell.html(charTable[y][x]);
                row.append(cell);
            }
            table.append(row);
        }
    });
});
