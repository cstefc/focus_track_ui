import {Carousel} from "react-bootstrap";
import Image from "react-bootstrap/Image";

const PictureCarousel = (props: {pictures: string[]}) => {
    return (
        <Carousel fade className={"justify-content-center"}>
            {props.pictures.map((picture, index: number) => (
                <Carousel.Item key={index} interval={10000}>
                    <Image src={picture} fluid/>
                </Carousel.Item>
            ))}
        </Carousel>
    );
}
export default PictureCarousel;

