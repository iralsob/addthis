var playerStart, player, tag, firstScriptTag, diary, position = 1;
tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
window.onYouTubeIframeAPIReady = function() {
	playerStart = new YT.Player('player', {
		width: '100%',
		videoId: 'bUJeetcmNg8',
		playerVars: {
			autoplay: 0,
			autohide: 1,
			showinfo: 0
		}
	});
};

var player;

function getVideo(id){
	
	$('.modal,.video_modal').removeClass('off');
	player = new YT.Player( 'video', {
		height: '100%',
		width: '100%',
		videoId: id,
		playerVars: { autoplay: 1, autohide: 1, showinfo: 0 },
		events: {
		'onStateChange': onPlayerStateChange
		}
	});
}

function onPlayerStateChange(event) {
	switch(event.data) {
	case YT.PlayerState.ENDED:
		endVideo();
		break;
	}
}

// ------------------------------
// Video set size

$(document).ready(function(){
	
	reset_win_size();

	$('.play').click(function(){
		if (jQuery(window).width() > 1199) {
			getVideo(this.id);
		} else {
			if (!jQuery(this).hasClass('off')) {
				playerStart.playVideo();
			} else {
				playerStart.stopVideo();
			}
			jQuery(this).toggleClass('off');
		}


		return false;
	});

	$('.modal_close').click(function(){
		$('.modal,.modal_container').addClass('off');
		player.pauseVideo();
		return false;
	});
	
});

function reset_win_size() {
	var video_size = 0.8,
		win_width = $('.modal').width(),
		win_height = $('.modal').height(),
		cur_height = 0,
		cur_width = 0;

	if (win_height / 9 > win_width / 16) {
		cur_width = win_width * video_size;
		cur_height = Math.ceil((cur_width / 16) * 9);
	}
	else {
		cur_height = win_height * video_size;
		cur_width = Math.ceil((cur_height / 9) * 16);
	}
	
	cur_width += 'px';
	cur_height += 'px';
	
	$('.video_modal').css('width', cur_width).css('height', cur_height);
}

$(window).on('resize',function() {
	reset_win_size();
});
