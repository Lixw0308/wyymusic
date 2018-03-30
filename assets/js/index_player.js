var palyer_status = "stop";
var player_position = "1";
var left_span = $("#scroll_box").offset().left;
$(".button_play_a_song").on("click", function() {
    if (palyer_status == "play") {
        palyer_status = "stop";
        $(this).removeClass('stop_a_song');
        $(this).addClass('play_a_song');
        $(".card_2").removeClass('revolve');
    } else if (palyer_status == "stop") {
        palyer_status = "play";
        $(this).removeClass('play_a_song');
        $(this).addClass('stop_a_song');
        $(".card_2").addClass('revolve');
    }

})
$("#scroll_box").on('click', function(ev) {
    var ev = event;
    var percent_time = parseInt((ev.clientX - left_span) / 2.7);
    console.log(percent_time + "%");
    chenge_scroll_ball_position(percent_time);
    return percent_time;
})
$(".scroll_ball").on('mousedown', function(ev) {
    var ev = event;
    console.log(ev.clientX - left_span + 2.25);
})

function chenge_scroll_ball_position(percent_time) {
    var ball_position = 2.72 * percent_time - 2.25;
    $(".scroll_ball").css({ left: ball_position })
}