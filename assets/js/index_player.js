var palyer_status = "stop";
var player_position = "1";
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
    // console.log(parseInt((ev.clientX - 48) / 2.7) + "%");
})
$(".scroll_ball").on('mousedown', function(ev) {
    var ev = event;
    console.log(ev.clientX - 48);
})