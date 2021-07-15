let front = {
  init: function () {
    this.events();     
    var swiper = new Swiper(".estate-hero-card-slider", {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: false,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      pagination: {
        el: ".swiper-pagination"
      }
    }); 
  },
  events: function () {
      let self = this;
      
      var buttons = document.getElementsByClassName('estate-hero-card__link');
      Array.prototype.forEach.call(buttons, function (b) {
        b.addEventListener('mousedown', createRipple);
      });
      $('.sort-dropdown__trigger').click(function () {
        $('.sort-dropdown-list').slideToggle();
      });
      $('.burger-wrapper').click(function () {
        $('.burger').toggleClass('burger--active');
        $('body').toggleClass('lock');
        $('.header-navbar').toggleClass('header-navbar_active');
      });
      $('#other-field').focus(function () {
        $('#other').prop("checked", true);
      });
      $('#h-search').keyup(function () {
          validateSearch()
      });

      $(document).on('click', '.search__reset', function () {
        $('#h-search').val('');
        $(this).removeClass('active');
      });
      function validateSearch() {
        let inputField = $('#h-search').val();
        let length = inputField.length;
        if (length > 0) {
          $('.search__reset').addClass('active');
        } else {
          $('.search__reset').removeClass('active');
        }
      }
  }
};

jQuery(function () {
  front.init();
});


function createRipple(e) {
  if (this.getElementsByClassName('ripple').length > 0) {
    this.removeChild(this.childNodes[1]);
  }

  var circle = document.createElement('div');
  this.appendChild(circle);
  var d = Math.max(this.clientWidth, this.clientHeight);
  circle.style.width = circle.style.height = d + 'px';
  circle.style.left = e.clientX - this.offsetLeft - d / 2 + 'px';
  circle.style.top = e.clientY - this.offsetTop - d / 2 + 'px';
  circle.classList.add('ripple');
}

$(document).on('click', '.dropdown-label', function () {
  $(".dropdown").removeClass('on');
  $(this).parent().addClass('on');
});

$(document).on("click", function(event){
  var $trigger = $(".dropdown");
  if($trigger !== event.target && !$trigger.has(event.target).length){
    $(".dropdown").removeClass('on');
  }            
});

$(document).on('click', '.dropdown-apply', function () {
  let checked = $(this).parent().parent().find(':checked');
  let parentLabel = $(this).parent().parent().parent();
    if (checked.length <= 0) {
      parentLabel.find('.default-value').html('').parent().attr('class', 'dropdown-label default');
    } else if (checked.length === 1) {
      parentLabel.find('.default-value').html(checked.next('label').text()).parent().attr('class', 'dropdown-label one-selected');
    } else {
      parentLabel.find('.default-value').html('&nbsp (' + checked.length + ')').parent().attr('class', 'dropdown-label multiple-selected');
    }
    $('.dropdown').removeClass('on');
});

$(document).on('click', '.dropdown-clear', function () {
  let checked = $(this).parent().parent().find(':checked');
  checked.prop('checked', false);
})  

$(document).on('click', '.dropdown-label .icon-close', function (e) {
  $(this).parent().parent().attr('class','dropdown-label default').find('.default-value').html('');
  e.stopPropagation();
});

$(document).on('click','.pricing .dropdown-apply', function(){
  let minPrice = $('#min-price').val();
  let maxPrice = $('#max-price').val();
  if ($('#min-price').val() > 0 && $('#max-price').val() > 0) {
    $('.pricing .dropdown-label').attr('class', 'dropdown-label one-selected');
    $('.pricing .dropdown-label span').html('Aluguel R$' + minPrice + '-' + maxPrice)
  } else if ($('#min-price').val() === '' && $('#max-price').val() > 0) {
    $('.pricing .dropdown-label').attr('class', 'dropdown-label one-selected');
    $('.pricing .dropdown-label span').html('Aluguel a partir de R$' + maxPrice)
  } else if ($('#min-price').val() > 0 && $('#max-price').val() === '') {
    $('.pricing .dropdown-label').attr('class', 'dropdown-label one-selected');
    $('.pricing .dropdown-label span').html('Aluguel até R$' + minPrice)
  } else {
    $('.pricing .dropdown-label').attr('class', 'dropdown-label default');
  }
})