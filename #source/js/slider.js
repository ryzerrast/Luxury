if( $('.special-slider').length > 0 ) {
   $('.special-slider').slick({
      autoplay: true,
      dots: true,
      arrows: false,
      accessibility: false,
      slidesToShow: 2,
      slidesToScroll: 2,
      adaptiveHeight: true,
      autoplaySpeed: 2000,
      responsive: [
         {
           breakpoint: 900,
           settings: {
             slidesToShow: 1,
             slidesToScroll: 1
           }
         }
       ]
    });
}

if( $('.client__body').length > 0 ) {
   $('.client__body').slick({
      autoplay: true,
      dots: true,
      accessibility: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight: true,
      autoplaySpeed: 2000,
    });
}

$(function() {
   if( $('.post-block__slider').length > 0 ) {
      $('.post-block__slider').slick({
         autoplay: false,
         dots: true,
         arrows: false,
         accessibility: false,
         slidesToShow: 1,
         slidesToScroll: 1,
       });
   }
})

if( $('.resent-post__slider').length > 0 ) {
   $('.resent-post__slider').slick({
      autoplay: false,
      dots: true,
      arrows: false,
      accessibility: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      rows: 3,
    });
}