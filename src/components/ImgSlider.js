import styled from "styled-components";
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from "react-slick";

const ImgSlider = (props) => {
  let settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1250
  };

  return (
    <div>
      <Carousel {...settings}>
        <Wrap>
          <a>
            <img src="/images/slider-badging.jpg" alt="" />
          </a>
        </Wrap>

        <Wrap>
          <a>
            <img src="/images/slider-scale.jpg" alt="" />
          </a>
        </Wrap>

        <Wrap>
          <a>
            <img src="/images/slider-badag.jpg" alt="" />
          </a>
        </Wrap>

        <Wrap>
          <a>
            <img src="/images/slider-scales.jpg" alt="" />
          </a>
        </Wrap>
      </Carousel>
    </div>
  )

};

const Carousel=styled(Slider)`
margin-top: 20px;
margin-left:44px;
margin-right:44px;
margin-bottom: 79px;


@media (max-width:768px){
  height: 15vh;
}


& > button{
  opacity: 0.5;
  height: 100%;
  width: 7vw;
  z-index: 1;

  @media (max-width:768px){
    z-index: 0;
  }
  
  &:hover{
    opacity: 1;
    transition: opacity 0.2s ease 0s;
  }

}

ul li button{
  &:before{
    font-size: 10px;
    color:rgb(150,158,171);
  }
}

li.slick-active button:before{
  color: white;
}

.slick-list{
  overflow: initial;
  
}

.slick-prev{
  left: -75px;
  
  &:before{
    font-size: 40px;
    margin-left: auto;
  }
}

.slick-next{
  right: -75px;

  &:before{
    font-size: 40px;
    margin-right: auto;

  }

}


`

const Wrap=styled.div`
border-radius: 4px;
cursor: pointer;
position: relative;



a{
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  cursor: pointer;
  display: block;
  position: relative;
  padding: 4px;

  img{
    width: 100%;
    height: 100%;
    transition: transform 1s;
    @media (max-width:768px){
    height: 13vh;
    width: 80vw;
}

  &:hover{
    padding: 0;
    border: 4px solid rgba(249,249,249,0.8);
    transform: scale(1.02);
  }

}
}
`

export default ImgSlider;