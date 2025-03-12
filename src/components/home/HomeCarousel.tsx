import {Card, Carousel, Container} from "react-bootstrap";
import Image from "react-bootstrap/Image";

interface HomeCarouselProps {
}

const HomeCarousel = (props: HomeCarouselProps) => {
    return (
        <Carousel fade
                  className={"justify-content-center"}
                  style={{
                      height: "50%",
                      width: '50%',
                      margin: "10px",
                      opacity: "80%",
                  }}
        >
            <Carousel.Item interval={10000}>
                <Image src="/productivity1.jpg" fluid/>
            </Carousel.Item>
            <Carousel.Item interval={10000}>
                <Image src="/productivity2.jpg" fluid/>
            </Carousel.Item>
            <Carousel.Item interval={10000}>
                <Image src="productivity3.jpg" fluid/>
            </Carousel.Item>
            <Carousel.Item interval={10000}>
                <Image src="productivity4.jpg" fluid/>
            </Carousel.Item>
            <Carousel.Item interval={10000}>
                <Image src="productivity5.jpg" fluid/>
            </Carousel.Item>
        </Carousel>
    );
}
export default HomeCarousel;

