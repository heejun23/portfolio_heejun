$(document).ready(function () {
  // 움짤
  $('.sample_list img').each(function () {
    const $img = $(this);
    $img.attr('src', $img.data('still')); // 처음에는 스틸 이미지로 설정
  });

  $('.sample_list img').hover(
    function () {
      const $img = $(this);
      $img.attr('src', $img.data('src')); // 호버 시 GIF로 변경
    },
    function () {
      const $img = $(this);
      $img.attr('src', $img.data('still')); // 호버 해제 시 스틸 이미지로 변경
    }
  );

  // pc
  $('.sample_list img').click(function () {
    const $img = $(this);
    const gifSrc = $img.data('src');
    $('#selected-image').attr('src', gifSrc); // 클릭 시 상단에 GIF 표시
  })

  // 가로 스크롤 버튼
  const listWidth = $('.sample_list li').length * $('.sample_list li').outerWidth();  // 총 li너비합산값 > 1097px
  const wrapperWidth = $('.list_wrapper').outerWidth(); //눈에보이는 폭 1097px
  let currentPos = 0;
  
  // 초기 버튼 상태 설정
  $('.right_btn').prop('disabled', $('.sample_list li').length <= 4);
  $('.left_btn').prop('disabled', true);
  
  // 오른쪽 버튼 클릭
  $('.right_btn').on('click', function() {
    if (currentPos > -(listWidth - wrapperWidth)) {
      currentPos -= $('.sample_list li').outerWidth();
      $('.sample_list').css('left', currentPos + 'px');
      updateButtons();
    }
  });
  
  // 왼쪽 버튼 클릭
  $('.left_btn').on('click', function() {
    if (currentPos < 0) {
      currentPos += $('.sample_list li').outerWidth();
      $('.sample_list').css('left', currentPos + 'px');
      updateButtons();
    }
  });
  
  // 버튼 상태 업데이트 함수
  function updateButtons() {
    $('.right_btn').prop('disabled', currentPos <= -(listWidth - wrapperWidth));
    $('.left_btn').prop('disabled', currentPos >= 0);
  }

})