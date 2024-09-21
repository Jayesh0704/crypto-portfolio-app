import { Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Carousel from "./Carousel";



const BannerContent = styled(Container)(({ theme }) => ({
  height: 400,
  display: "flex",
  flexDirection: "row",
  paddingTop: 25,
  justifyContent: "space-around",
}));

const Tagline = styled('div')(({ theme }) => ({
  display: "flex",
  height: "40%",
  flexDirection: "row",
  justifyContent: "center",
  textAlign: "center",
}));

const CarouselContainer = styled('div')(({ theme }) => ({
  height: "50%",
  display: "flex",
  overflow:"hidden",
 
  alignItems: "center",
}));

function Banner() {
  return (
    
      <BannerContent>
        <Tagline>
          
         
         
        </Tagline>
        <CarouselContainer>
          <Carousel />
        </CarouselContainer>
      </BannerContent>
    
  );
}

export default Banner;
