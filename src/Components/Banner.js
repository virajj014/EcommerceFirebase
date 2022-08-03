import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Carousel } from 'react-bootstrap'
import slide1 from './assets/bannerimages/1.png'
import slide2 from './assets/bannerimages/2.png'
import slide3 from './assets/bannerimages/3.png'
import slide4 from './assets/bannerimages/4.png'

const Banner = () => {
    return (
        <Carousel>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={slide1}
                    alt="First slide"
                />
                <Carousel.Caption>
                    <h3>Buy Gadgets</h3>
                    <p>Upto 60% off on all gadgets</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={slide2}
                    alt="Second slide"
                />

                <Carousel.Caption>
                    <h3>Buy Apple Products</h3>
                    <p>The Biggest Sale</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={slide3}
                    alt="Third slide"
                />

                <Carousel.Caption>
                    <h3></h3>
                    <p></p>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={slide4}
                    alt="Fourth slide"
                />

                <Carousel.Caption>
                    <h3>Black Friday Sale</h3>
                    <p>All Gadgets 60% off</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )
}

export default Banner