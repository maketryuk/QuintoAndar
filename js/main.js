
$(function ($) {
  var CheckboxDropdown = function CheckboxDropdown(el) {
    var _this = this;

    this.isOpen = false;
    this.$el = $(el);
    this.$label = this.$el.find('.dropdown-label span');
    this.$applyBtn = this.$el.find('.dropdown-apply');
    this.$clearBtn = this.$el.find('.dropdown-clear');
    this.$resetBtn = this.$el.find('.btn-reset');
    this.$inputs = this.$el.find('[type="checkbox"]');
    this.$label.parent().on('click', function (e) {
      e.preventDefault();

      _this.toggleOpen();
    });
    this.$applyBtn.on('click', function (e) {
      _this.onCheckApply();
    });
    this.$clearBtn.on('click', function (e) {
      _this.onCheckClear();
    });
    this.$resetBtn.on('click', function (e) {
      e.stopPropagation();

      _this.onCheckReset();
    });
  };

  CheckboxDropdown.prototype.onCheckApply = function () {
    var checked = this.$el.find(':checked');
    this.isOpen = false;
    this.$el.removeClass('on');

    if (checked.length <= 0) {
      this.$label.html('').parent().attr('class', 'dropdown-label default');
    } else if (checked.length === 1) {
      this.$label.html(checked.next('label').text()).parent().attr('class', 'dropdown-label one-selected');
    } else {
      this.$label.html('&nbsp (' + checked.length + ')').parent().attr('class', 'dropdown-label multiple-selected');
    }
  };

  CheckboxDropdown.prototype.onCheckClear = function () {
    var checked = this.$el.find(':checked');
    checked.prop('checked', false);
  };

  CheckboxDropdown.prototype.onCheckReset = function () {
    var checked = this.$el.find(':checked');
    this.$label.html('').parent().attr('class', 'dropdown-label default');
    checked.prop('checked', false);
  };

  CheckboxDropdown.prototype.toggleOpen = function (forceOpen) {
    var _this = this;

    if (!this.isOpen || forceOpen) {
      this.isOpen = true;
      this.$el.addClass('on');
      $(document).on('click', function (e) {
        if (!$(e.target).closest('[data-control]').length) {
          _this.toggleOpen();
        }
      });
    } else {
      this.isOpen = false;
      this.$el.removeClass('on');
      $(document).off('click');
    }
  };

  var checkboxesDropdowns = document.querySelectorAll('[data-control="checkbox-dropdown"]');

  for (var i = 0, length = checkboxesDropdowns.length; i < length; i++) {
    new CheckboxDropdown(checkboxesDropdowns[i]);
  }
});

/***/ }),
/* 3 */
/***/ (function(module, exports) {

var buttons = document.getElementsByClassName('estate-hero-card__link');
Array.prototype.forEach.call(buttons, function (b) {
  b.addEventListener('mousedown', createRipple);
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
$(function () {
  $('.sort-dropdown__trigger').click(function () {
    $('.sort-dropdown-list').slideToggle();
  });
});

/***/ }),
/* 4 */
/***/ (function(module, exports) {



/***/ }),
/* 5 */
/***/ (function(module, exports) {



/***/ }),
/* 6 */
/***/ (function(module, exports) {



/***/ }),
/* 7 */
/***/ (function(module, exports) {

$(document).on('click', '.search__reset', function () {
  $('#h-search').val('');
});

/***/ }),
/* 8 */
/***/ (function(module, exports) {

$(function () {
  $('.burger-wrapper').click(function () {
    $('.burger').toggleClass('burger--active');
    $('body').toggleClass('lock');
    $('.header-navbar').toggleClass('header-navbar_active');
  });
});

/***/ }),
/* 9 */
/***/ (function(module, exports) {

$('#other-field').focus(function () {
  $('#other').prop("checked", true);
});

/***/ })
/******/ ]);