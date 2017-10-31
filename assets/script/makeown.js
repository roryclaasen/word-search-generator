$(function() {
    var wordGenerator = new Generator();
    wordGenerator.options.debug = true;

    var table = $('table#search-output');

    initToggleButtons();

    function getShuffle() {
        return $('div#shuffleWords').find('button.active').html() == "ON";
    }

    function addWord(newWord) {
        if (newWord.length > 0) {
            var noWordsbadge = $('span#noWords');
            var helpBlock = $('#addword .form-group span.help-block');
            var formGroup = $('#addword .form-group');
            if (!/[^a-zA-Z]/.test(newWord)) {
                var emptyMsg = $('#word-list > ul > li.disabled');
                emptyMsg.hide();
                helpBlock.hide();
                if (!formGroup.hasClass("has-error")) formGroup.removeClass("has-error");

                var list = $('#word-list > ul');
                var item = $('<li class="list-group-item"></i>')
                var remove = $('<i class="glyphicon glyphicon-remove"></i>');
                remove.click(function() {
                    wordGenerator.removeWord($(this).text());
                    $(this).parent().remove();
                    if ($('#word-list > ul > li').length == 1) emptyMsg.show();
                    noWordsbadge.html(parseInt(noWordsbadge.html()) - 1);
                });
                var spanWord = $('<span class="word">' + newWord.toUpperCase() + '</span>');
                wordGenerator.addWord(newWord.toUpperCase());
                item.append(spanWord).append(remove);
                list.append(item);
                noWordsbadge.html(parseInt(noWordsbadge.html()) + 1);
                $('#word').val("");
            } else {
                helpBlock.show();
                if (!formGroup.hasClass("has-error")) formGroup.addClass("has-error");
            }
        }
    }

    $('form#addword').on('submit', function(e) {
        e.preventDefault();
        addWord($('#word').val());
    });

    $('form#addword button#randomWord').click(function(){
        addWord(randomWord());
    });

    $('button#generate').click(function() {
        var tbody = table.find('tbody');
        tbody.html('').addClass('highlight');

        var missingWords = $('#missing-words .word-list ul');
        $('#missing-words').hide();
        missingWords.html('');

        wordGenerator.options.width = parseInt($('#tableWidth').find(":selected").text());
        wordGenerator.options.height = parseInt($('#tableHeight').find(":selected").text());
        wordGenerator.options.shuffle = getShuffle();

        var charTable = wordGenerator.make();
        var missingWordList = wordGenerator.missingWords;

        for (i = 0; i < missingWordList.length; i++) {
            var word = missingWordList[i];
            var item = $('<li class="list-group-item"></i>');
            var spanWord = $('<span class="word">' + word.toUpperCase() + '</span>');
            item.append(spanWord);
            missingWords.append(item);
            $('#missing-words').show();
        }
        $('span#noMissingWords').html(missingWordList.length);

        for (var y = 0; y < wordGenerator.options.height; y++) {
            var row = $('<tr></tr>');
            for (var x = 0; x < wordGenerator.options.width; x++) {
                var cell = $('<td></td>');
                cell.html(charTable[y][x]);
                row.append(cell);
            }
            tbody.append(row);
        }
    });

    $('#btnCopy').click(function() {
        selectElementContents(table.get(0));
        setTimeout(function() {
            $('#copiedClipboard').modal('hide');
        }, 2000);
    });

    $('#btnClear').click(function() {
        var tbody = table.find('tbody');
        tbody.html('');
        for (var y = 0; y < wordGenerator.options.height; y++) {
            var row = $('<tr></tr>');
            for (var x = 0; x < wordGenerator.options.width; x++) {
                row.append($('<td></td>'));
            }
            tbody.append(row);
        }
    });
});
