$(document).ready(function () {
  // 픽셀전환효과
  let gif = $('.transition')
  gif.attr('src', gif.attr('src') + '?' + new Date().getTime())

  setTimeout(function () {
    $('.transition').addClass('end')
  }, 1000);
  // // bgm 재생 함수
  function listBgm() {
      $('#li_bgm')[0].pause();
      $('#li_bgm')[0].currentTime = 0;
      $('#li_bgm')[0].play();
  }

  // 호버시 소리나게
  $('.wrap ul li').on('mouseenter',function(){
    listBgm()
  }
  )

})