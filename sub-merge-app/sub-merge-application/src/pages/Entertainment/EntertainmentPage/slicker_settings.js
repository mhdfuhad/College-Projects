export const settings = {
  className: "center",
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  initialSlide: 0,
  swipeToSlide: true,
  responsive: [
    {
      breakpoint: 1480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 720,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
