  //스크롤체크 배경색변경 함수
  function checkScroll(){
    const changePoint = $('.rise_txt').offset().top
    const scroll = $(window).scrollTop()

    if (scroll >= changePoint){
      $('.container').css('background','#0e0e0e')
    }else{
      $('.container').css('background','#e750aa')
    }
  }
$(document).ready(function () {
  // 스크롤체크$()
  checkScroll()
  $(window).scroll(function(){
    checkScroll()
  })
  // 픽셀전환효과
    let gif = $('.transition')
    gif.attr('src', gif.attr('src') + '?' + new Date().getTime())
    gif.show()

  setTimeout(function(){
    $('.rise_txt p').show().addClass('rise')
  },800)
  
  
  // 1. 마우스 포인터
  let lastImageTime = 0;
  const imageInterval = 100; // 이미지 생성 간격 (밀리초 단위)

  $(".part1").mousemove(function (event) {
    const currentTime = new Date().getTime();

    if (currentTime - lastImageTime >= imageInterval) {
      // 이미지 URL 배열
      var images = [
        "./images/bear.webp",
        "./images/bunny.webp",
        "./images/heart.webp",
        "./images/bubble1.webp",
        "./images/flower1.webp",
        "./images/twinkle1.webp",
        "./images/cat.webp",
        "./images/bubble2.webp",
        "./images/hamster.webp",
        "./images/cactus.webp",
        "./images/metamong.webp",
      ];

      // 랜덤 이미지 선택
      var R_img = images[Math.floor(Math.random() * images.length)];

      // 랜덤 크기 (50px ~ 200px)
      var randomSize = Math.floor(Math.random() * (80 - 30 + 1)) + 30;

      // 랜덤 각도 (-60deg ~ 60deg)
      var randomAngle = Math.floor(Math.random() * (45 - -45 + 1)) + -45;

      // 이미지 요소 생성
      var $image = $('<img class="image">').attr("src", R_img);

      // 이미지 스타일 설정
      $image.css({
        top: event.pageY - $(this).offset().top + "px",
        left: event.pageX - $(this).offset().left + "px",
        objectFit: 'cover',
        width: randomSize + "px",
        // height: randomSize + "px",
        transform: "rotate(" + randomAngle + "deg)",
      });

      // 이미지 추가
      $(this).append($image);

      // 이미지 제거 (1초 후)
      setTimeout(function () {
        $image.remove();
      }, 1000);

      // 마지막 이미지 생성 시간 업데이트
      lastImageTime = currentTime;
    }
  });
  


  //  메뉴 호버시 색상변경
  let colors = [
    "#E750AA",
    "#5F1698",
    "#1C0350",
  ]; // 각 li에 대응하는 색상 배열
  $(".gnb a").hover(
    function () {
      let index = $(this).parent().index(); // li의 index를 가져옴
      $(".container").css("background-color", colors[index]); // index에 맞는 색상으로 변경
    },
    function () {
      $(".container").css("background-color", "#E750AA"); // hover가 끝나면 원래 색상으로 복원
    }
  );


  // 햄버거 메뉴 클릭시 이펙트
  $(".m_btn").click(function () {
    $(".m_gnb").toggleClass("act");
    // 메뉴 펼쳐졌을때 스크롤 방지
    if ($(".m_gnb").hasClass("act")) {
      $("body").css("overflow", "hidden");
    } else {
      $("body").css("overflow", "visible");
    }
    $(".m_btn").toggleClass("close");
  });

  // 모바일 메뉴 펼친채로 화면 늘렸을때
  $(window).resize(function () {
    if ($(window).width() >= 768) {
      if ($('.m_gnb').hasClass('act')) {
        $('.m_gnb').removeClass('act');
      }
      if ($('.m_btn').hasClass('close')) {
        $('.m_btn').removeClass('close');
      }
    }
  });




});