$(document).ready(function () {
  // Модалки

  const tabsItem = $(".recomend-tabs__tab");
  const contentItem = $(".recomend-ul__item");
  tabsItem.on("click", function (event) {
    let activeContent = $(this).attr("data-target");
    tabsItem.removeClass("recomend-tabs__tab--active");
    contentItem.removeClass("recomend-ul__item--active");
    $(activeContent).addClass("recomend-ul__item--active");
    $(this).addClass("recomend-tabs__tab--active");
  });

  $(".recomend-main__info-play").on("click", function (e) {
    $(".modal__overlay").addClass("modal__overlay--visible");
    $(".modal__video").addClass("modal__video--visible");
    $(".modal__video").append(
      '<div class="modal-video"><iframe class="modal__iframe" src="https://www.youtube.com/embed/KLVaep27wSs?autoplay=1&rel=0&showinfo=0"allowfullscreen></iframe></div>'
    );
  });
  $(".modal__close").on("click", function (e) {
    e.preventDefault();
    $(".modal__overlay").removeClass("modal__overlay--visible");
    $(".modal__video").removeClass("modal__video--visible");
    $(".modal-video").remove();
  });

  $(".section-button").on("click", function (e) {
    $(".section-nav").addClass("section-nav--active");
  });
  $(".close-button").on("click", function (e) {
    $(".section-nav").removeClass("section-nav--active");
  });

  $(".bookmark-svg").on("click", function (e) {
    $(this).toggleClass("bookmark__svg--active");
  });

  $(".login__link").on("click", function (e) {
    e.preventDefault();
    $(".modal__overlay").addClass("modal__overlay--visible");
    $(".modal__login").addClass("modal__login--visible");
  });
  $(".modal__login-close").on("click", function (e) {
    e.preventDefault();
    $(".modal__overlay").removeClass("modal__overlay--visible");
    $(".modal__login").removeClass("modal__login--visible");
  });
  $(".subscribe__button").on("click", function (e) {
    e.preventDefault();
    $(".modal__overlay").addClass("modal__overlay--visible");
    $(".modal__subscribe").addClass("modal__subscribe--visible");
  });
  $(".modal__subscribe-close").on("click", function (e) {
    e.preventDefault();
    $(".modal__overlay").removeClass("modal__overlay--visible");
    $(".modal__subscribe").removeClass("modal__subscribe--visible");
  });

  // Лайки

  const likeItems = $(".like");

  likeItems.on("click", function (e) {
    e.preventDefault();
    let likeItem = $(this).attr("data-target");
    $("#svg" + likeItem).toggleClass("like-svg--active");
    if ($("#svg" + likeItem).hasClass("like-svg--active")) {
      let likeNumber = Number(
        $("#" + likeItem)
          .text()
          .replace(",", "")
      );
      $("#" + likeItem).text(
        String(++likeNumber).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      );
    } else {
      let likeNumber = Number(
        $("#" + likeItem)
          .text()
          .replace(",", "")
      );
      $("#" + likeItem).text(
        String(--likeNumber).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      );
    }
  });

  // Слайдер

  var menu = [];
  menuItem = $(".pagination-item").html();
  menu.push(menuItem, menuItem, menuItem, menuItem, menuItem);

  var mySwiper = new Swiper(".hot__swiper-container", {
    spaceBetween: 30,
    // Optional parameters
    direction: "horizontal",
    loop: true,
    autoplay: {
      delay: 3000,
    },

    // If we need pagination
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
      bulletClass: "pagination",
      bulletActiveClass: "pagination--active",
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + menu[index] + "</span>";
      },
    },
  });
  var articleSwiper = new Swiper(".article__swiper-container", {
    spaceBetween: 30,
    // Optional parameters
    direction: "horizontal",
    loop: true,
    navigation: {
      nextEl: ".article-swiper-button-next",
      prevEl: ".article-swiper-button-prev",
    },
    keyboard: {
      enabled: true,
      onlyInViewport: false,
    },
  });

  // Форма
  $(".footer-form").validate({
    rules: {
      email: {
        required: true,
        email: true,
      },
    },
    messages: {
      email: {
        required: "We need your email address to contact you",
        email: "Format like name@domain.com",
      },
    },
  });
  $(".comment-write").validate();

  // Коменты
  $(".comment__button").on("click", function (e) {
    $(".comment-item--hidden").addClass("comment-item--visible");
    $(".comment-item--hidden").removeClass("comment-item--hidden");
    $(".comment__button").remove();
  });

  // комент лайки
  const commentLike = $(".comment-item .comment-item__like-like");
  const commentNumber = $(".comment-item .comment-item__like-number");
  const commentDislike = $(".comment-item .comment-item__like-dislike");

  commentLike.each(function (i, value) {
    let btn = value;
    let commentNumberVal;

    // Лайки
    $(btn).on("click", function () {
      if ($(commentDislike[i]).hasClass("comment-item__like-dislike--active")) {
        $(commentDislike[i]).removeClass("comment-item__like-dislike--active");
        commentNumberVal = Number($(commentNumber[i]).text());
        $(commentNumber[i]).text(commentNumberVal + 1);
        commentNumberVal = Number($(commentNumber[i]).text());
        commentNumberColor();
      }
      if ($(this).hasClass("comment-item__like-like--active")) {
        $(this).removeClass("comment-item__like-like--active");
        commentNumberVal = Number($(commentNumber[i]).text());
        $(commentNumber[i]).text(commentNumberVal - 1);
        commentNumberVal = Number($(commentNumber[i]).text());
        commentNumberColor();
      } else {
        $(this).addClass("comment-item__like-like--active");
        commentNumberVal = Number($(commentNumber[i]).text());
        $(commentNumber[i]).text(commentNumberVal + 1);
        commentNumberVal = Number($(commentNumber[i]).text());
        commentNumberColor();
      }
    });

    // Дизлайки
    $(commentDislike[i]).on("click", function () {
      if ($(btn).hasClass("comment-item__like-like--active")) {
        $(btn).removeClass("comment-item__like-like--active");
        commentNumberVal = Number($(commentNumber[i]).text());
        $(commentNumber[i]).text(commentNumberVal - 1);
        commentNumberVal = Number($(commentNumber[i]).text());
        commentNumberColor();
      }
      if ($(this).hasClass("comment-item__like-dislike--active")) {
        $(this).removeClass("comment-item__like-dislike--active");
        commentNumberVal = Number($(commentNumber[i]).text());
        $(commentNumber[i]).text(commentNumberVal + 1);
        commentNumberVal = Number($(commentNumber[i]).text());
        commentNumberColor();
      } else {
        $(this).addClass("comment-item__like-dislike--active");
        commentNumberVal = Number($(commentNumber[i]).text());
        $(commentNumber[i]).text(commentNumberVal - 1);
        commentNumberVal = Number($(commentNumber[i]).text());
        commentNumberColor();
      }
    });
    function commentNumberColor() {
      if (commentNumberVal > 0) {
        $(commentNumber[i]).text("+" + commentNumberVal);
        $(commentNumber[i]).removeClass("red");
        $(commentNumber[i]).removeClass("green");
        $(commentNumber[i]).addClass("green");
      } else if (commentNumberVal == 0) {
        $(commentNumber[i]).removeClass("red");
        $(commentNumber[i]).removeClass("green");
      } else {
        $(commentNumber[i]).removeClass("red");
        $(commentNumber[i]).removeClass("green");
        $(commentNumber[i]).addClass("red");
      }
    }
  });
});
