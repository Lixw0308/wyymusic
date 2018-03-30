var New_song = (function() {
    var Obj = function(option) {
        this.setParams(option);
    }

    //全局变量当前是否在播放
    var palyer_status = "stop";
    var left_span = $("#scroll_box").offset().left;
    var scroll_box_width = $("#scroll_box").width() / 100;
    var left_span_width = $(".now_time").width() / 100;
    var timer;
    var audio_all = null;
    //原型对象
    Obj.prototype = {
        constructor: Obj,

        setParams: function(option) {
            this.song_name = option.song_name;
            this.song_singger = option.song_singger;
            this.song_pic = option.song_pic;
            // this.install();
        },
        //主函数入口
        install: function() {
            var now = this;

            if (audio_all != null && palyer_status == "play") {
                audio_all.pause();
                audio_all.currentTime = 0;
                clearInterval(timer);
                audio_all = this.a_new_song(this.song_name, now);
                this.drag(now, audio_all);
                this.scroll_ball_drag(now, audio_all);
                this.play_a_song(audio_all, now);
                this.play_song_button(now, audio_all);
            } else if (audio_all != null && palyer_status == "stop") {
                audio_all = this.a_new_song(this.song_name, now);
                audio_all.currentTime = 0;
                clearInterval(timer);
                this.chenge_scroll_ball_position(0);
                this.chenge_scroll_box_cover(0);
                $(".now_time").html('00:00')
                this.drag(now, audio_all);
                this.scroll_ball_drag(now, audio_all);
                this.play_a_song(audio_all, now);
                this.play_song_button(now, audio_all);
            } else if (audio_all == null) {
                audio_all = this.a_new_song(this.song_name, now);
                this.play_song_button(now, audio_all);
                this.drag(now, audio_all);
                this.scroll_ball_drag(now, audio_all);
            }



        },

        //添加一首歌函数
        a_new_song: function(song_name, now) {
            audio_all = new Audio('./assets/music/' + song_name + '.mp3 ');
            $("h5").html(this.song_name);
            $("h6").html(this.song_singger);
            $("#back").css({
                'background': 'url(' + now.song_pic + ')',
                backgroundSize: 'cover'
            });
            $(".card_3").css({
                'background': 'url(' + now.song_pic + ')',
                backgroundSize: 'cover'
            })
            audio_all.addEventListener('canplay', function() {
                now.get_song_all_time(audio_all);
            })
            audio_all.addEventListener('ended', function() {
                // palyer_status = "stop";
                // $(".button_play_a_song").removeClass('stop_a_song');
                // $(".button_play_a_song").addClass('play_a_song');
                // $(".card_2").removeClass('revolve');
                clearInterval(timer);
                i++;
                if (i > 4) {
                    i = 0;
                };
                change_song(i);
            });
            // this.get_song_all_time(audio, now);
            return audio_all;
        },
        //获取当前歌曲总时长
        get_song_all_time: function(audio) {
            // var audio = document.getElementById("audio").children[0];
            var song_all_min = "0" + parseInt(audio.duration / 60);
            var song_all_sce = parseInt(audio.duration % 60);
            if (song_all_sce < 10) {
                song_all_sce = "0" + song_all_sce;
            }
            $(".all_time").html('' + song_all_min + ':' + song_all_sce + '')
        },
        //播放一首歌
        play_a_song: function(audio, now) {
            // var audio = document.getElementById("audio").children[0];

            if (palyer_status == "stop") {
                audio.pause();
                clearInterval(timer);

            } else if (palyer_status == "play") {
                audio.play();
                timer = setInterval(function() {
                    if (parseInt(parseInt(audio.currentTime) / 60) < 10) {
                        var min = '0' + parseInt(parseInt(audio.currentTime) / 60)
                    } else {
                        min = parseInt(parseInt(audio.currentTime) / 60);
                    }
                    if (parseInt(audio.currentTime) % 60 < 10) {
                        var sce = '0' + parseInt(audio.currentTime) % 60
                    } else {
                        sce = parseInt(audio.currentTime) % 60;
                    }
                    $(".now_time").html('' + min + ':' + sce + '');
                    now.chenge_scroll_ball_position(parseInt((audio.currentTime / audio.duration) * 100));
                    now.chenge_scroll_box_cover(parseInt((audio.currentTime / audio.duration) * 100));
                }, 10);
            }
        },
        //播放停止按钮函数
        play_song_button: function(now, now_audio) {
            $(".button_play_a_song").unbind('click').on("click", play_a_song_button_function = function() {
                if (palyer_status == "play") {
                    palyer_status = "stop";
                    $(this).removeClass('stop_a_song');
                    $(this).addClass('play_a_song');
                    $(".card_2").removeClass('revolve');
                    now.play_a_song(now_audio, now);
                } else if (palyer_status == "stop") {
                    palyer_status = "play";
                    $(this).removeClass('play_a_song');
                    $(this).addClass('stop_a_song');
                    $(".card_2").addClass('revolve');
                    now.play_a_song(now_audio, now);
                }
            })

        },
        //进度条拖拽函数
        drag: function(now, audio) {
            $("#scroll_box").unbind('click').on('click', function(ev) {
                var ev = event;
                var percent_time = parseInt((ev.pageX - left_span) / scroll_box_width);
                now.chenge_scroll_ball_position(percent_time);
                now.chenge_scroll_box_cover(percent_time);
                now.goto_song_now_time((percent_time / 100) * audio.duration, audio);
                // return percent_time;
            })
            $(".scroll_ball").on('click', function(ev) {
                var ev = event;
                // console.log(ev.clientX - left_span + 2.25);
            })
        },
        //根据歌曲时间改变拖拽条进度
        chenge_scroll_ball_position: function(percent_time) {
            var ball_position = scroll_box_width * percent_time - left_span_width;
            $(".scroll_ball").css({ left: ball_position })
        },
        //根据时间改变覆盖条进度
        chenge_scroll_box_cover: function(percent_time) {
            var ball_position = scroll_box_width * percent_time - left_span_width;
            $("#scroll_box_over").css({ width: ball_position })
        },
        //跳转到当前乐曲位置
        goto_song_now_time: function(now_time, audio) {
            audio.currentTime = now_time;
        },
        //拖拽控制部分拖拽函数
        scroll_ball_drag: function(now, audio) {

            $(".scroll_ball").on('touchstart', function(ev) {
                var realetive_position;

                $("#scroll_box").on('touchmove', control_ball_touchmove = function(ev) {
                    clearInterval(timer);
                    var _touch = ev.originalEvent.targetTouches[0];
                    var _x = _touch.pageX;
                    // var _ball_page_x = $(".scroll_ball").offset().left;
                    var _ball_box_x = $("#scroll_box").offset().left;
                    realetive_position = _x - _ball_box_x;
                    if (realetive_position < 0) {
                        realetive_position = 0;
                    } else if (realetive_position > $("#scroll_box").width()) {
                        realetive_position = $("#scroll_box").width();
                    }
                    $(".scroll_ball").css({ left: realetive_position });
                    $("#scroll_box_over").css({ width: realetive_position });
                })
                $(".scroll_ball").unbind('touchend').on('touchend', control_ball_touchend = function() {
                    var now_time = parseInt(realetive_position / $("#scroll_box").width() * audio.duration);
                    now.goto_song_now_time(now_time, audio);
                    clearInterval(timer);
                    now.play_a_song(audio, now);
                })
            })
        }
    }


    //公开组件接口
    return Obj;
})();

var song_a = new New_song({
    song_name: "九九八十一",
    song_singger: "双笙",
    song_pic: "./assets/images/九九八十一.jpg"

});
var song_b = new New_song({
    song_name: "马步遥",
    song_singger: "双笙",
    song_pic: "./assets/images/马步遥.jpg"
});
var song_c = new New_song({
    song_name: "万神纪",
    song_singger: "海鲜面",
    song_pic: "./assets/images/万神纪.jpg"
});
var song_d = new New_song({
    song_name: "逆浪千秋",
    song_singger: "言和",
    song_pic: "./assets/images/逆浪千秋.jpg"
});
var song_e = new New_song({
    song_name: "锦鲤抄",
    song_singger: "银临",
    song_pic: "./assets/images/锦鲤抄.jpg"
});
song_a.install();
var i = 0;
$(".next_song").unbind('click').on('click', function() {
    i++;
    if (i > 4) {
        i = 0;
    }
    change_song(i);
})
$(".last_song").unbind('click').on('click', function() {
    i--;
    if (i < 0) {
        i = 4;
    }
    change_song(i);
})

function change_song(i) {
    switch (i) {
        case 0:
            song_a.install();
            break;
        case 1:
            song_b.install();
            break;
        case 2:
            song_c.install();
            break;
        case 3:
            song_d.install();
            break;
        case 4:
            song_e.install();
            break;
        default:
            break;
    }
}