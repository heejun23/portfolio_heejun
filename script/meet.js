function animateStar(element, delay, initialDelay) {
  setTimeout(function () {
    $(element).css({ 'animation': 'shooting_star 1s ease-out forwards' });
    setTimeout(function () {
      $(element).css('animation', 'none');
      setTimeout(function () {
        animateStar(element, delay, 0);
      }, delay);
    }, 1000);
  }, initialDelay);
}

$(document).ready(function () {
  // 대화창 이미지
  let dialogImg = [
    "./images/spaceman_hi.webp",
    "./images/spaceman_bow.webp",
    "./images/spaceman_shy.webp",
    "./images/spaceman_stand.webp",
    "./images/spaceman_hi_merong.webp",
    "./images/spaceman_mansae_wink.webp",
  ]
  // 대화창 텍스트
  let dialogues = [
    "안녕하세요 ~ ? <img src='./images/select1.webp' alt='끝마침'>",
    "만남의 광장에 오신것을 환영합니다! <img src='./images/select1.webp' alt='끝마침'>",
    "이 누추한 곳까지 귀한 발걸음을 옮겨주시다니...몸둘바를 모르겠군요... <img src='./images/select1.webp' alt='끝마침'>",
    "아, 이곳이 왜 만남의 광장이냐구요? <img src='./images/select1.webp' alt='끝마침'>",
    "간단합니다. 희준님과의 만남을 주선하는 공간이기 때문이지요. <img src='./images/select1.webp' alt='끝마침'>",
    "헤헤...아무쪼록 와주셔서 정말 감사합니다! <img src='./images/select1.webp' alt='끝마침'>",
  ];
  let currentDialogue = 0;

  // 대화창
  function NextDialogue() {
    if (currentDialogue < dialogues.length) {
      let dialogueElement = $('#text')
      dialogueElement.html('<span class="typing">' + dialogues[currentDialogue] + '</span>')
      //이미지변경
      let imgElement = $('.dialogue_img')
      imgElement.css({ 'background': 'url(' + dialogImg[currentDialogue] + ') center no-repeat', 'background-size': 'cover' })
      currentDialogue++;
    } else {
      $('.dialogue').hide();
      $('.dialogue_img').hide();
      $('article').fadeOut(1500, function(){
        $(this).addClass('txtend')
      })
    }
  }
  // 대화창 표시
  function showDialogue() {
    if ($('.transition').hide()) {
      $('.dialogue').css('opacity', '1')
      $('.dialogue_img').css({ 'opacity': '1', 'transition': '3s' })
    }
  }

  // bgm 재생 함수
  function listBgm() {
    $('#li_bgm')[0].pause();
    $('#li_bgm')[0].currentTime = 0;
    $('#li_bgm')[0].play();
    $('#li_bgm')[0].volume = 0.6;
  }

  // 픽셀전환효과
  let gif = $('.transition')
  gif.attr('src', gif.attr('src') + '?' + new Date().getTime())
  setTimeout(function () {
    $('.transition').addClass('end')
    showDialogue()
  }, 1000);

  // 처음 대화 표시
  NextDialogue();
  // 화면 클릭 시 다음 대화로 넘어가기
  $('.wrap').click(function () {
    NextDialogue();
    listBgm()
    $('.dialogue_img').css('transition', 'unset')
    if ($('article').hasClass('txtend')) {
      $('#li_bgm')[0].pause()
    }
  });

  // 키보드 엔터 입력 시 다음 대화로 넘어가기
  $(document).keydown(function (e) {
    if (e.key === "Enter") {
      NextDialogue();
      listBgm()
      $('.dialogue_img').css('transition', 'unset')
    }
    if ($('article').hasClass('txtend')) {
      $('#li_bgm')[0].pause()
    }
  });

  // article txtend있는지 체크함수
  function ckStart() {
    if ($('article').hasClass('txtend')) {
      animationStart()
    } else {
      setTimeout(ckStart, 100)
    }
  }
  
  function animationStart() {
    $('.rocket').addClass('rocket_start')
    $('.credit').addClass('credit_start')
  }

  ckStart()

  // 별똥별
  animateStar('.star1', 4000, 1500); // 0초 초기 딜레이
  animateStar('.star2', 3000, 3000); // 3초 초기 딜레이
  animateStar('.star3', 4500, 5000); // 5초 초기 딜레이
  animateStar('.star4', 2500, 5000); 
  animateStar('.star5', 2000, 5000); 

});
