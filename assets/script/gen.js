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
});
