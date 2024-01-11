import styled from "styled-components";
import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import db from "../firebase";
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import { useNavigate } from "react-router-dom";


const Detail=(props)=>{

  const {id}=useParams();
  const [detailData,setDetailData]=useState({});
  const [trailerUrl, setTrailerUrl] = useState("");
  const [videoId,setvideoId]=useState("");


  useEffect(() => {
    if(id){
    db.collection('movies').doc(id).get().then((doc)=>{
      if(doc.exists){
        setDetailData(doc.data());
        // setvideoId(doc.data().videoid);
      }else{
        console.log('no such document found in firebase');
      }
    }).catch((error)=>{
      console.log("error retrieving the docs",error);
    });
  }
  }, [id]);

  const opts1 = {
    height: "390px",
    width: "100%",
    playerVars: {
      autoplay: 1
    },
  };

  const opts2 = {
    height: "500px",
    width: "100%",
    playerVars: {
      autoplay: 1
    },
  };

  const handleClick=(detailData)=>{
    // console.log(detailData);
    if (trailerUrl) {
      // console.log(trailerUrl)
      setTrailerUrl("");
    }
    else {
      
      movieTrailer(detailData?.title)
        .then((url) => {
          // console.log(url);
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
          console.log(trailerUrl);
        })
        .catch((error) => console.log(error));

    }
  }

  const videoplay=(detailData)=>{

  

  if(videoId){
    setvideoId("");
  }
  else{
    setvideoId(detailData.videoid);
  }
  }

 
  

  return(
   <Container>
    <Background>
      <img src={detailData.backgroundImg} alt={detailData.title} />
    </Background>

    <ImageTitle>
      {/* <img src={detailData.titleImg} alt={detailData.title} /> */}
      {detailData.titleImg? <img src={detailData.titleImg}/>:<h1>{detailData.title}</h1>}
    </ImageTitle>
    <ContentMeta>
      <Controls>
        <Player onClick={()=>videoplay(detailData)}>
          <img src="/images/play-icon-black.png" alt=""/> 
          <span >{videoId?"Stop Playing":"Play"}</span>
          
        </Player>
        <Trailer onClick={() => handleClick(detailData)}>
          <img src="/images/play-icon-white.png" alt="" />
          <span >{trailerUrl?"Stop Playing":"Trailer"}</span>
        </Trailer>
        <AddList>
          <span/>
          <span/>
        </AddList>
        <GroupWatch>
          <div>
            <img src="/images/group-icon.png" alt="" />
          </div>
        </GroupWatch>
      </Controls>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts1} />}
      {videoId && <YouTube opts={opts2} videoId={videoId}/>}

      <SubTitle>{detailData.SubTitle}</SubTitle>
      <Description>{detailData.description}</Description>
      
    </ContentMeta>
   </Container>
  )
};

const Container=styled.div`
position: relative;
min-height: calc(100vh - 250px);
/* max-height: 99vh; */
overflow-x: hidden;
display: block;
top: 72px;
padding: 0px calc(3.5vw + 5px);
padding-top:0px;

`;

const Background=styled.div`
left: 0px;
opacity: 0.8;
position: fixed;
right: 0px;
top: 0px;
z-index: -1;

img{
  width: 100vw;
  height: 100vh;

  @media (max-width:768px){
    height: 70vh;
    float: left;
    scale: 2;

    
  }
}

`

const ImageTitle=styled.div`
align-items: flex-end;
display:flex;
-webkit-box-pack:start;
justify-content: flex-start;
margin: 0px auto;
height: 21vw;
min-height: 170px;
padding-bottom: 24px;
width: 100%;

img{
  /* min-width: 500px; */
  /* min-height: 500px; */
  margin-top: auto;
  max-width: 390px;
  min-width: 390px;
  width: 35vw;

}

`;

const ContentMeta=styled.div`
max-width: 874px;


`
const Controls=styled.div`
align-items: center;
display: flex;
flex-flow: row nowrap;
margin: 24px 0px;
min-height: 56px;


`;

const Player=styled.button`
font-size: 15px;
margin: 0px 22px 0px 0px;
padding: 0px 24px;
height: 56px;
border-radius: 4px;
align-items: center;
cursor: pointer;
display: flex;
justify-content: center;
letter-spacing: 1.8px;
text-align: center;
text-transform: uppercase;
background: rgb(249,249,249);
border: none;
color: rgb(0,0,0);

img{
  width: 32px;

}

&:hover{
  background: rgb(198,198,198);

}

@media (max-width:768px){
  height: 45px;
  padding: 0px 22px;
  font-size: 12px;
  margin: 0px 10px 0px 0px;

  img{
    width: 25px;

  }
}


`;

const Trailer=styled(Player)`
background: rgba(0,0,0,0.3);
border: 1px solid rgb(249,249,249);
color: rgb(249,249,249);

`;

const AddList=styled.div`
margin-right: 16px;
height: 44px;
width: 44px;
display: flex;
justify-content: center;
align-items: center;
background-color: rgba(0,0,0,0.6);
border-radius: 50%;
border: 2px solid white;
cursor: pointer;

span{
  background-color: rgb(249,249,249);
  display: inline-block;

  &:first-child{
    height: 2px;
    transform: translate(1px,0px) rotate(0deg);
    width: 16px;

  }
  &:nth-child(2){
    height: 16px;
    transform: translateX(-8px) rotate(0deg);
    width: 2px;

  }
}

`;

const GroupWatch=styled.div`
height: 44px;
width: 44px;
border-radius: 50%;
display: flex;
justify-content: center;
align-items: center;
cursor: pointer;
background:white;

div{
  height: 40px;
  width: 40px;
  background: rgb(0,0,0);
  border-radius: 50%;

  img{
    width: 100%;
  }
}

`;


const SubTitle=styled.div`
color: rgb(249,249,249);
font-size: 15px;
min-height: 20px;
@media (max-width:768px){
  font-size: 12px;

}

`;

const Description=styled.div`
line-height: 1.4;
font-size: 20px;
padding: 16px 0px;
color: rgb(249,249,249);

@media (max-width:768px){
  font-size: 14px;

}

`
export default Detail;