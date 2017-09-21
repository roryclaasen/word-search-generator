function addWord() {
    var list = $('#word-list > ul');
    var item = $('<li class="list-group-item"></i>')
    item.html($('#word').text() + '<i class="fa fa-times" aria-hidden="true"></i>');
    list.append(item);
}

$(function() {
    $('#word-list > ul > li').each(function() {
        var item = $(this);
        item.find('i.fa-times').click(function() {
            item.remove();
        });
    });
});
