$( window ).resize(function() {
    const width = $('#form').width();
    $('.slide').each(function(i, el) {
      if ($(el).hasClass('active')) {
        $('.slide.first').css('margin-left', -width*i);
      }
    })
  });
  $( document ).ready(function() {
    // рендер цен
    $('.slide__cards:not(.cards-9)').each((index, elem) => {
      $(elem).children().each((i, el) => {
        $(el).attr('data-id', price[index][i]);
      });
    });


    $("#popup").dialog({
      title: 'Заявка на расчет отправлена',
      autoOpen: false,
      modal: true,
      buttons: {
        "Перейти на основной сайт": function(e){ 
          $(location).attr('href', 'http://7dstudio.ru');
        },
      },
      draggable: false,
      hide: 'slide',
      show: 'slide',
    });
    $('.ui-dialog-titlebar-close').on('click', () => {
      $('.slide.first').css('margin-left', 0);
    })
    // mask input
    $("#phone").mask("+7 (999) 999 99 99");

    $('.slide__prev').on('click', () => {
      let left = $('.slide.first').css('margin-left');
      const width =  $('.slide.first').css('width');
      left = parseInt(left) + parseInt(width);
      const currentEl = $('.slide.active');
      $(currentEl).removeClass('active');
      $(currentEl).prev().addClass('active');
      $('.slide.first').css('margin-left', left + 'px');
      if ($(window).width() < 769) {
        var body = $('html, body');
        body.stop().animate({scrollTop: $('#form').offset().top - 20}, 0, 'swing');
      }
    });
    $('.slide__button').on('click', () => {
      let left = $('.slide.first').css('margin-left');
      const width =  $('.slide.first').css('width');
      left = parseInt(left) - parseInt(width);
      const currentEl = $('.slide.active');
      $(currentEl).removeClass('active');
      $(currentEl).next().addClass('active');
      $('.slide.first').css('margin-left', left + 'px');
      if ($(window).width() < 769) {
        var body = $('html, body');
        body.stop().animate({scrollTop: $('#form').offset().top - 20}, 0, 'swing');
      }
    });

    $('.card').on('click', function() {
      $(this).parent().children('.card').each((_, el) => {
        if ($(el).hasClass('active')) $(el).removeClass('active');
      });
      $(this).addClass('active');
    });
    // send form

    $("#btn").click((e) => {
      e.preventDefault();
      let name = $('#name');
      let phone = $('#phone');
      let email = $('#email');
      const qw1 = $('.cards-1 .card.active').attr('data-value');
      const qw2 = $('.cards-2 .card.active').attr('data-value');
      const qw3 = $('.cards-3 .card.active').attr('data-value');
      const qw4 = $('.cards-4 .card.active').attr('data-value');
      const qw5 = $('.cards-5 .card.active').attr('data-value');
      const qw6 = $('.cards-6 .card.active').attr('data-value');
      const qw7 = $('.cards-7 .card.active').attr('data-value');

      if (!email.val()) {
        $(email).prev('.message').addClass('active');
        setTimeout(() => {
          $(email).prev('.message').removeClass('active');
        }, 3000);
        return;
      }

      if (!name.val()) {
        $(name).prev('.message').addClass('active');
        setTimeout(() => {
          $(name).prev('.message').removeClass('active');
        }, 3000);
        return;
      }
      if (!phone.val()) {
        $(phone).prev('.message').addClass('active');
        setTimeout(() => {
          $(phone).prev('.message').removeClass('active');
        }, 3000);
        return;
      }
      if (!$("#check").prop("checked")) {
        $("#check").parent().prev('.message').addClass('active');
        setTimeout(() => {
          $("#check").parent().prev('.message').removeClass('active');
        }, 3000);
        return;
      }

      name = name.val();
      phone = phone.val();
      email = email.val();

      const qw1Id = $('.cards-2 .card.active').attr('data-id');
      const qw2Id = $('.cards-2 .card.active').attr('data-id');
      const qw3Id = $('.cards-3 .card.active').attr('data-id');
      const qw4Id = $('.cards-4 .card.active').attr('data-id');
      const qw5Id = $('.cards-5 .card.active').attr('data-id');
      const qw6Id = $('.cards-6 .card.active').attr('data-id');
      const qw7Id = $('.cards-6 .card.active').attr('data-id');
      let summ = Number(qw1Id) + Number(qw2Id) + Number(qw3Id) + Number(qw4Id) + Number(qw5Id) + Number(qw6Id) + Number(qw7Id);

      const result = { name, phone, email, qw1, qw2, qw3, qw4, qw5, qw6, qw7, summ };

      $.ajax({
        type: "POST",
        url: "/function/send.php",
        data: result,
        success: function(data) {
          if (data) {
            $('#popup').html(`Примерная стоимость Вашего ремонта <span>${ summ } рублей</span>, точную сумму можно будет просчитать после выезда нашего замерщика.`);
            $("#popup").dialog('open');
            $('#form')[0].reset();
          }
        },
        error: function(data) {}
      });

    });

});