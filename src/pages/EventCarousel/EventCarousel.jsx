import React, { useState } from 'react';
import { Carousel, Card } from 'react-bootstrap';
import "./EventCarousel.css";

const EventCarousel = ({ events }) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(null);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
    if (e) {
      setDirection(e.direction);
    }
  };

  return (
    <Carousel
      activeIndex={index}
      direction={direction}
      onSelect={handleSelect}
      interval={1000}
      pauseOnHover={true}
      className="w-100"
      style={{ height: 'auto', marginBottom: '5rem' }}
      indicators={false}
      touch={true}
    >
      {events.map((event, i) => (
        <Carousel.Item key={i}>
          <div className="d-flex justify-content-center">
            <div className="row w-100 mx-auto">
              {events.slice(i, i + 3).map((event, j) => (
                <div key={j} className="col-md-4 px-2">
                  <Card>
                    <Card.Img variant="top" src={event.image} />
                    <Card.Body>
                      <Card.Title>{event.name}</Card.Title>
                      <Card.Text>{event.description}</Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default EventCarousel;
