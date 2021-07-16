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

      $( ".input-box input" ).focus(function() {
        $(this).parent().addClass('active')
      });
      $( ".input-box input" ).focusout(function() {
        if ($(this).val() > 0) {
          $(this).parent().addClass('active')
        } else {
          $(this).parent().removeClass('active')
        }
      });
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

$(document).on('click', '.dropdown__close', function () {
  $(".dropdown").removeClass('on');
});

$(document).on("click", function(event){
  var $trigger = $(".sort-dropdown");
  if($trigger !== event.target && !$trigger.has(event.target).length){
    $(".sort-dropdown-list").slideUp();
  }            
});

$(document).on("click", function(event){
  var $trigger = $(".dropdown");
  if($trigger !== event.target && !$trigger.has(event.target).length){
    $(".dropdown").removeClass('on');
  }            
});

function checkboxDropdown(el) {
  var $el = $(el)

  function updateStatus(label, result) {
    if(!result.length) {
      label.html('');
    }
    if (result.length > 0) {
      $('.dropdown-search').addClass('has-value')
    } else {
      $('.dropdown-search').removeClass('has-value')
    }
  };
  
  $el.each(function(i, element) {
      $label = $(this).find('#e-search'),
      $inputs = $(this).find('.check'),
      $searchReset = $(this).find('.btn-reset');
      defaultChecked = $(this).find('input[type=checkbox]:checked'),
      result = [];
    
    updateStatus($label, result);
    if(defaultChecked.length) {
      defaultChecked.each(function () {
        result.push($(this).next().text());
        $label.val(result.join("; "));
      });
    }
    $inputs.on('change', function() {
      var checked = $(this).is(':checked');
      var checkedText = $(this).next().text();
      if(checked) {
        result.push(checkedText);
        $label.val(result.join("; "));
      }else{
        let index = result.indexOf(checkedText);
        if (index >= 0) {
          result.splice(index, 1);
        }
        $label.val(result.join("; "));
      }
      updateStatus($label, result);
    });
    $searchReset.on('click', function(){
      result = [];
      $label.val('');
      $inputs.prop('checked', false);
      updateStatus($label, result);
      $('.dropdown-item').show();
    })
  });
};
checkboxDropdown('.dropdown-search');

$(document).ready(function(){
  $("#e-search").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $(".dropdown-search .dropdown-option").filter(function() {
      $(this).parent().toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
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

$(document).on('click', '.pricing .dropdown-clear', function () {
  $('.input-box').removeClass('active');
  $('#min-price').val('');
  $('#max-price').val('');
})  

$(document).on('click','.pricing .dropdown-apply', function(){
  let minPrice = $('#min-price').val();
  let maxPrice = $('#max-price').val();
  if ($('#min-price').val() > 0 && $('#max-price').val() > 0) {
    $('.pricing .dropdown-label').attr('class', 'dropdown-label one-selected');
    $('.pricing .dropdown-label span').html('Aluguel R$ &nbsp' + getNumberWithCommas(minPrice) + ' - ' + getNumberWithCommas(maxPrice))
  } else if ($('#min-price').val() === '' && $('#max-price').val() > 0) {
    $('.pricing .dropdown-label').attr('class', 'dropdown-label one-selected');
    $('.pricing .dropdown-label span').html('Aluguel a partir de R$ &nbsp' + getNumberWithCommas(maxPrice))
  } else if ($('#min-price').val() > 0 && $('#max-price').val() === '') {
    $('.pricing .dropdown-label').attr('class', 'dropdown-label one-selected');
    $('.pricing .dropdown-label span').html('Aluguel até R$ &nbsp' + getNumberWithCommas(minPrice))
  } else {
    $('.pricing .dropdown-label').attr('class', 'dropdown-label default');
  }
  function getNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
})

$("#min-price, #max-price").keyup(function(event){
  if(event.which >= 37 && event.which <= 40) return;
  $(this).val(function(index, value){
    return value
    .replace(/\D/g, "")
      .replace(/([0-9])([0-9]{3})$/, '$1.$2')  
      .replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ",")
    ;
  });
  $(this).siblings('.field__value').val($(this).val().replace(/,/g, ''))
});

if(window.matchMedia('(max-width: 767px)').matches){
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100 ) {
      $('.estate-filter').addClass('scroll-down');
    } else {
      $('.estate-filter').removeClass("scroll-down");  
    }
  });

  var lastScrollTop = 0;
  $(window).scroll(function(event){
     var st = $(this).scrollTop();
     if (st > lastScrollTop){
      $('.estate-filter').removeClass('scroll-up');
     } else {
      $('.estate-filter').addClass('scroll-up');
     }
     lastScrollTop = st;
  });
  $(document).on('click', '.dropdown__close', function () {
    $(".dropdown").removeClass('on');
  });
} else {
  null
}

$(function(){
  var filterHeight = $('.estate-filter').height() + 24;
  var headerHeight = $('.header').height() + 1;
  $('.estate-hero').css('padding-top', filterHeight + headerHeight)
  $( window ).on("resize", function() {
    var filterHeight = $('.estate-filter').height() + 24;
    var headerHeight = $('.header').height() + 1;
    console.log('filterHeight:' + filterHeight)
    console.log('headerHeight:' + headerHeight)
    $('.estate-hero').css('padding-top', filterHeight + headerHeight)
  });
});