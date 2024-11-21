$(document).ready(function () {
  // 시계
  function clock(){
    let now = new Date()
    let hours = now.getHours()
    let minutes = now.getMinutes()
    let period = hours >= 12 ? '오후' : '오전'
    hours = hours % 12
    hours = hours ? hours : 12; // 0을 12로 변환
    let timeString = `<span class="period">${period}</span> ${hours}:${minutes < 10 ? '0' : ''}${minutes}`
    $('.time').html(timeString)
  }
  setInterval(clock, 1000)
  clock()

  // 바탕화면 아이콘 클릭시
  $(".icon_box li").click(function (e) {
    $('.icon_box li').removeClass('click')
    $(this).addClass("click");
    e.stopPropagation();
  });

  // 배경 클릭시 선택효과 해제
  $(".wrap").click(function () {
    $('.icon_box li').removeClass('click')
  });

  // 내폴더
  $('.myfolder').dblclick(function(){
    $('.myfolder_folder').show()
    $('.myfolder').removeClass('click')
  })


  // 더블클릭시 게임창 나오기
  $(".mygame").dblclick(function () {
    $(".modal").show();
    $('.mygame').removeClass('click')
    $('.click_me').css('animation-duration','0s')
    $('.mygame').css('animation-duration','0s')
  });

  // setTimeout 변수
  let showGameMenu;

  // start_bgm 재생여부 변수
  let bgmPlay = false;

  // bgm 재생 함수
  function listBgm() {
    $('#li_bgm')[0].pause();
    $('#li_bgm')[0].currentTime = 0;
    $('#li_bgm')[0].play();
  }


  // 키보드 이벤트
  $(document).on('keydown.start', function () {
    gameStart()
  })

  // 게임 시작함수
  function gameStart() {
    //목록 노출 전
    if ($('.screen').is(':visible')) {
      $('.start_txt').css('animation-duration', '0.1s');
      if (!bgmPlay) { // start_bgm이 아직 재생되지 않았다면
        $('#start_bgm')[0].volume = 0.4;
        $('#start_bgm')[0].play();
        bgmPlay = true; // 재생 여부를 true로 변경
      }

      showGameMenu = setTimeout(function () {
        $('.start_txt').hide();
        $('.screen ul').show();
        $('#bgm')[0].volume = 0.4;
        $('#bgm')[0].play();
        $('.screen ul li:first-child').addClass('select'); // 초기 선택 항목 설정
      }, 1200)

      // 초기 키보드 이벤트 핸들러 제거
      $(document).off('keydown.start');


      // 목록 노출 후
      $(document).on('keydown.game', function (event) {
        if ($('.screen').is(':visible') && $('.screen ul').is(':visible')) { // .screen과 .screen ul이 보이는지 확인

          // 선택된 li
          let selected = $('.screen .select');

          if (event.which === 38) { // 위쪽 방향키
            let prevLi = selected.prev();
            if (prevLi.length > 0) {
              selected.removeClass('select');
              prevLi.addClass('select');
              listBgm()
            }
          } else if (event.which === 40) { // 아래쪽 방향키
            let nextLi = selected.next();
            if (nextLi.length > 0) {
              selected.removeClass('select');
              nextLi.addClass('select');
              listBgm()
            }
          } else if (event.which === 13) {  //엔터키
            if (selected.is(':first-child')) {
              $('.screen ul li:first-child').addClass('blink')
              $('#confirm')[0].volume = 0.6
              $('#confirm')[0].play()
              setTimeout(function () {
                window.location.href = './main_mnu.html';
              }, 1300)
            }
            if (selected.is(':nth-child(2)')) {
              alert('진행된 기록이 없습니다. start 버튼을 눌러주세요.');
            }
            if (selected.is(':last-child')) {
              gameClose()
            }
          }
        }
      })
    }
  }

  //마우스 이벤트

  // 게임 시작시 목록나오기
  $('.screen').click(function () {
    gameStart();
  })

  $('.screen ul li').click(function (event) {
    event.stopPropagation() //이벤트 버블링 방지

    // start버튼
    if ($(this).is(':first-child')) {
      $('.screen ul li:first-child').addClass('blink')
      $('#confirm')[0].volume = 0.6
      $('#confirm')[0].play()
      setTimeout(function () {
        window.location.href = './main_mnu.html';
      }, 1300)

      // continue버튼
    } else if ($(this).is(':nth-child(2)')) {
      alert('저장된 파일이 없습니다.')

      // exit버튼
    } else if ($(this).is(':last-child')) {
      gameClose()
    }
  })

  // 닫힘버튼 작동
  $('.close').click(function () {
    gameClose()
  })

  // 게임 닫힐때 함수
  function gameClose() {
    let result = confirm('정말로 종료하시겠습니까?')
    if (result) {
    clearTimeout(showGameMenu)
    $('.modal').hide();
    $('#bgm')[0].pause()
    $('#bgm')[0].currentTime = 0
    $('.screen ul').hide()
    $('.screen ul li').removeClass('select');
    $('.screen ul li:first-child').addClass('select');
    $('.start_txt').show().css('animation-duration', '1s');
    // 키보드 이벤트 핸들러 제거
    $(document).off('keydown.game');
    // 초기 키보드 이벤트 핸들러 다시 등록
    $(document).on('keydown.start', function () {
      gameStart();
    });
    bgmPlay = false;
    $('.click_me').css('animation-duration','0.5s')
    $('.mygame').css('animation-duration','0.5s')
  }
  }

  //마우스 오버시 목록효과
  $('.screen ul li').hover(
    function () {
      $(this).addClass('select');
      $('.screen ul li').not(this).removeClass('select'); // 현재 요소를 제외한 모든 li에서 select 클래스 제거
      listBgm()
    },
    function () {
      //마우스 아웃시 아무 작업도 하지 않음
    }
  )


});