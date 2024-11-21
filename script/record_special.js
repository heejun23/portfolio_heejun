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

  // 클릭시 이미지 변경
  $('#con_admin .sample_list img').click(function () {
    const $img = $(this);
    const gifSrc = $img.data('src');
    $('#con_admin .sample img').attr('src', gifSrc); // 클릭 시 상단에 GIF 표시
  })
  $('#con_user .sample_list img').click(function () {
    const $img = $(this);
    const gifSrc = $img.data('src');
    $('#con_user .sample img').attr('src', gifSrc); // 클릭 시 상단에 GIF 표시
  })

  // pc버전
  // 리스트 움직이기
  const listWidth = $('#con_admin .sample_list li').length * $('#con_admin .sample_list li').outerWidth();
  const wrapperWidth = $('#con_admin .list_wrapper').outerWidth();
  let currentPos = 0;

  // 초기 버튼 상태 설정
  $('#con_admin .right_btn').prop('disabled', $('#con_admin .sample_list li').length <= 4);
  $('#con_admin .left_btn').prop('disabled', true);

  // 오른쪽 버튼 클릭
  $('#con_admin .right_btn').on('click', function () {
    if (currentPos > -(listWidth - wrapperWidth)) {
      currentPos -= $('#con_admin .sample_list li').outerWidth();
      $('#con_admin .sample_list').css('left', currentPos + 'px');
      updateButtons();
    }
  });

  // 왼쪽 버튼 클릭
  $('#con_admin .left_btn').on('click', function () {
    if (currentPos < 0) {
      currentPos += $('#con_admin .sample_list li').outerWidth();
      $('#con_admin .sample_list').css('left', currentPos + 'px');
      updateButtons();
    }
  });

  // 버튼 상태 업데이트 함수
  function updateButtons() {
    $('#con_admin .right_btn').prop('disabled', currentPos <= -(listWidth - wrapperWidth));
    $('#con_admin .left_btn').prop('disabled', currentPos >= 0);
  }

  ///////////////// 전환버튼 ////////////////
  $('#change_btn').click(function () {
    let state = $(this).text().trim()
    if (state.includes('사용자')) {
      $(this).html('관리자 <img src="./images/icon_update.webp" alt="전환">')
      $('#con_admin').removeClass('active')
      $('#con_user').addClass('active')

      //모바일버전
      // 리스트 움직이기
      const listWidth2 = $('#con_user .sample_list li').length * $('#con_user .sample_list li').outerWidth();
      const wrapperWidth2 = $('#con_user .list_wrapper').outerWidth();
      let currentPos2 = 0;

      // 초기 버튼 상태 설정
      $('#con_user .right_btn').prop('disabled', $('#con_user .sample_list li').length <= 5);
      $('#con_user .left_btn').prop('disabled', true);

      // 오른쪽 버튼 클릭
      $('#con_user .right_btn').on('click', function () {
        if (currentPos2 > -(listWidth2 - wrapperWidth2)) {
          currentPos2 -= $('#con_user .sample_list li').outerWidth();
          $('#con_user .sample_list').css('left', currentPos2 + 'px');
          console.log('listWidth :', listWidth2)
          console.log('wrapperwidth :', wrapperWidth2)
          updateButtons2();
        }
      });

      // 왼쪽 버튼 클릭
      $('#con_user .left_btn').on('click', function () {
        if (currentPos2 < 0) {
          currentPos2 += $('#con_user .sample_list li').outerWidth();
          // 첫 번째 li에서 멈추기
          if (currentPos2 > 0) {
            currentPos2 = 0;
          }
          $('#con_user .sample_list').css('left', currentPos2 + 'px');
          updateButtons2();
        }
      });

      // 버튼 상태 업데이트 함수
      function updateButtons2() {
        console.log('currentPos2: ', currentPos2, ' listWidth2: ', listWidth2, ' wrapperWidth2: ', wrapperWidth2);
        $('#con_user .right_btn').prop('disabled', currentPos2 <= -(listWidth2 - wrapperWidth2));
        $('#con_user .left_btn').prop('disabled', currentPos2 >= 0);
      }
    } else {
      $(this).html('사용자 <img src="./images/icon_update.webp" alt="전환">')
      $('#con_admin').addClass('active')
      $('#con_user').removeClass('active')
    }
  })
})
