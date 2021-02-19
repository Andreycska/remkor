$(function(){

    let header = $('#header');
    let intro = $('#intro');
    let navToggle = $('#navToggle');
    let nav = $('#nav');
    let headerH = header.innerHeight(); //hight header
    let introH = intro.innerHeight(); //hieght intro
    let scrollTop = $(window).scrollTop();

    // HEADER CHANGE ======================================================================

    headerScroll();  // Для того чтобы при обновлении страницы выявить нужно прозрачноре меню или темное

    $(window).on('scroll resize', function(){
        headerScroll();
    });

    function headerScroll() {
        headerH = header.innerHeight();
        introH = intro.innerHeight();
        let scrollTop = $(this).scrollTop();

        if (scrollTop >= (introH -  headerH)) {
            header.addClass('header--dark');
        } else {
            header.removeClass('header--dark');
        }
    }

    // SMOOTH SCROLL TO SECTION ======================================================================

    $('[data-scroll]').on('click', function(event){

        event.preventDefault();

        let scrollEl = $(this).data('scroll');
        let scrollElPos = $(scrollEl).offset().top;  //позиция от верха до элемента

        navToggle.removeClass('active');
        nav.removeClass('show');
        $('body').removeClass('show-nav');

        $('html, body').animate({
            scrollTop: scrollElPos - headerH
        }, 500)

    });

    // SCROLL SPY ======================================================================

    let windowH = $(window).height();

    scrollSpy(scrollTop);

    $(window).on('scroll', function(){

        scrollTop = $(this).scrollTop();

        scrollSpy(scrollTop);

    });

    function scrollSpy(scrollTop) {
        $('[data-scrollspy]').each(function(){

            let $this = $(this);
            let sectionId = $this.data('scrollspy');
            let sectionOffset = $this.offset().top;
            sectionOffset = sectionOffset - (windowH * 0.3);

            if (scrollTop >= sectionOffset) {
                $('#nav [data-scroll]').removeClass('active');
                $('nav [data-scroll="' + sectionId + '"]').addClass('active');
            }

            if (scrollTop == 0) {
                $('#nav [data-scroll]').removeClass('active');
            }

        });
    }


    // MODAL ======================================================================

    $('[data-modal]').on('click', function(event) {
        event.preventDefault();

        let modal = $(this).data('modal');

        $('body').addClass('no-scroll');
        $(modal).addClass('show');

        setTimeout(function() {
            $(modal).find('.modal__content').css({
                transform: 'scale(1)',
                opacity: '1'
            });
        }, 200);
    });

    $('[data-modal-close]').on('click', function(event) {
        event.preventDefault();

        let modal = $(this).parents('.modal');

        modalClose(modal);
    });

    $('.modal').on('click', function() {
        let modal = $(this);

        modalClose(modal);
    });

    $('.modal__content').on('click', function(event) {
        event.stopPropagation();
    });

    function modalClose (modal) {
        modal.find('.modal__content').css({
            transform: 'scale(.5)',
            opacity: '0'
        });

        setTimeout(function() {
            $('body').removeClass('no-scroll');
            $(modal).removeClass('show');
        }, 200);
    }

    // SLICK SLIDER https://kenwheeler.github.io/slick/   ======================================================================

    // INTRO SLIDER

    let introSlider = $('#introSlider');
    let reviewsSlider = $('#reviewsSlider');

    introSlider.slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        fade: true,
        autoplay: true,
        autoplaySpeed: 4000,
        speed: 1000
      });

      $('#introSliderPrev').on('click', function() {
        introSlider.slick('slickPrev');
      });

      $('#introSliderNext').on('click', function() {
        introSlider.slick('slickNext');
      });

    //   REVIEWS SLIDER

      reviewsSlider.slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        autoplay: true,
        autoplaySpeed: 4000,
        speed: 500
      });

    //   BURGER MENU ======================================================================

    navToggle.on('click', function(event) {
        event.preventDefault();

        $(this).toggleClass('active');
        nav.toggleClass('show');
        $('body').toggleClass('show-nav');

    });

    $(window).on('resize', function(){
        navToggle.removeClass('active');
        nav.removeClass('show');
        $('body').removeClass('show-nav');
    });

    // AOS.JS ANIMATED BLOCK https://github.com/michalsnik/aos ======================================================================

    AOS.init({
        // Global settings:
        disable: 'mobile', // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
        startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
        initClassName: 'aos-init', // class applied after initialization
        animatedClassName: 'aos-animate', // class applied on animation
        useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
        disableMutationObserver: false, // disables automatic mutations' detections (advanced)
        debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
        throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
        
      
        // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
        offset: 80, // offset (in px) from the original trigger point
        delay: 0, // values from 0 to 3000, with step 50ms
        duration: 700, // values from 0 to 3000, with step 50ms
        easing: 'ease', // default easing for AOS animations
        once: false, // whether animation should happen only once - while scrolling down
        mirror: false, // whether elements should animate out while scrolling past them
        anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
      
      });


    /*ANIMATION NUMBER======================================================== https://github.com/johnjcamilleri/jquery-spincrement */

    var show = true;
    var countbox = ".plant__inner";
    $(window).on("scroll load resize", function () {
        if (!show) return false; // Отменяем показ анимации, если она уже была выполнена
        var w_top = $(window).scrollTop(); // Количество пикселей на которое была прокручена страница
        var e_top = $(countbox).offset().top; // Расстояние от блока со счетчиками до верха всего документа
        var w_height = $(window).height(); // Высота окна браузера
        var d_height = $(document).height(); // Высота всего документа
        var e_height = $(countbox).outerHeight(); // Полная высота блока со счетчиками
        if (w_top + 500 >= e_top || w_height + w_top == d_height || e_height + e_top < w_height) {
            $(document).ready(function(){
                $('.plant__number').spincrement({
                    thousandSeparator: "",
                    duration: 1200
                });
            });
           show = false;
        }
    });

});
