$(document).ready(function() {
    $('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function(event) {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000, function() {
                    var $target = $(target);
                    $target.focus();
                    if ($target.is(":focus")) {
                        return false;
                    } else {
                        $target.attr('tabindex','-1');
                        $target.focus();
                    };
                });
            }
        }
    });
});

// http://jsfiddle.net/joquery/9KYaQ/
String.format = function() {
    var theString = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
        var regEx = new RegExp("\\{" + (i - 1) + "\\}", "gm");
        theString = theString.replace(regEx, arguments[i]);
    }
    return theString;
}

var randomWords = ['Rock', 'Paper', 'Scissor', 'tacky', 'ocean', 'assorted', 'consider', 'writing', 'decay',
'discreet', 'board', 'quack', 'clammy', 'consist', 'abnormal', 'time', 'sniff', 'gigantic', 'sack', 'unique',
'scandalous', 'grouchy', 'limit', 'adjoining', 'gigantic', 'mess', 'desk', 'old', 'develop', 'various',
'extend', 'reflective', 'advice', 'five', 'recognise', 'admire', 'confess', 'kneel', 'porter', 'tranquil',
'cruel', 'suit', 'puffy' , 'secret', 'fall', 'clean', 'hypnotic', 'belligerent', 'range', 'use', 'tasteless',
'onerous', 'hum', 'tent', 'domineering', 'division', 'expansion', 'quaint', 'shame', 'fortunate', 'assorted',
'finger', 'ceaseless', 'gaze', 'clammy', 'overflow', 'border', 'premium', 'sisters', 'star', 'bone', 'tumble',
'true', 'groan', 'hesitant', 'expand', 'meat', 'crowded', 'rifle', 'houses', 'muddle', 'cruel', 'ugly', 'pretty',
'letter', 'ethereal', 'license', 'tawdry', 'tie', 'square', 'wound', 'graceful', 'back'];

function randomWord() {
    return randomWords[Math.floor(Math.random() * randomWords.length)].toUpperCase();
}
