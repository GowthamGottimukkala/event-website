import React, { useEffect, useState } from 'react';
import './EventsPage.css';
import { Link } from 'react-router-dom';
import PageHeader from '../../components/PageHeader/PageHeader';
import EventCard from '../../components/EventCard/EventCard';
import * as eventAPI from '../../services/events-api';
import image from "../../homepage.png";
import EventCarousel from '../EventCarousel/EventCarousel';


function EventsPage(props) {

    // set initial state
    const [events, setEvents] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [foodAvailability, setFoodAvailability] = useState(false);
    const [eventType, setEventType] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [price, setPrice] = useState(null);

    const handleFoodAvailabilityChange = (event) => {
        setFoodAvailability(event.target.value);
    };

    const handleEventTypeChange = (event) => {
        if (event.target.value == "All") {
            console.log(event.target.value)
        }
        setEventType(event.target.value);
    };

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    };

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    };

    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };

    const filteredEvents = events.filter((event) => {
        // Check food availability
        if (foodAvailability && event.foodAvailability !== foodAvailability) {
          return false;
        }
    
        // Check event type
        if (eventType && event.eventType !== eventType) {
          return false;
        }
    
        // Check start date
        if (startDate && event.startTime < startDate) {
          return false;
        }

        // Check start date
        if (endDate && event.endTime < endDate) {
            return false;
          }
    
        // Check price
        if (price && event.price > price) {
          return false;
        }
    
        return true;
      });


    useEffect(() => {
        async function fetchData() {
            // get all events from back-end api
            const results = await eventAPI.getAll();

            if(results.err) {
                // replace page if error retrieving event data
                results.err && props.history.replace('/');
            } else {
                // set state
                setEvents(results);
                setIsLoaded(true);
            }
        }
        fetchData();
    }, [ props.history ]);

    return (
      <>
        <div className='EventsPage'>
             <section className='hello'>
                    <div className="row">
                        <div className="col"></div>
                        <div className="col my-col">
                            <h2 className="my-title">Event Buzz</h2>
                            <p className="my-text">Tired of endless banners and outdated event information? Discover how our new solution for University of Florida students can revolutionize the way you find and promote events!</p>
                        </div>
                        <div className="col">
                        <img src={image} alt="Image" />
                        </div>
                        <div className="col"></div>
                    </div>
                    </section>

            <PageHeader />
            <div className='container py-3'>
            <h1 className="event-name">
                <span>Promoted Events</span>
            </h1>
            <div className='row'>
              <EventCarousel events={filteredEvents} />
            </div>
            </div>
            
            
            <div className='container py-3'>
                {isLoaded ? (
                    <>
                        <h1 className="event-name">
                            <span>Events</span>
                        </h1>
                        <div className="row">
                        <div className="col-sm-2 mb-3">
                            <div className="form-group">
                              <label htmlFor="event-type">Event Type:</label>
                              <select
                                className="form-control"
                                id="event-type"
                                value={eventType}
                                onChange={handleEventTypeChange}
                              >
                                <option value="">All</option>
                                <option value="workshop">Workshop</option>
                                <option value="music">Music</option>
                                <option value="food">Food</option>
                                <option value="business">Business</option>
                              </select>
                            </div>
                          </div>
                          
                          <div className="col-sm-2 mb-3">
                            <div className="form-group">
                              <label htmlFor="start-date">Start Date:</label>
                              <input
                                type="date"
                                className="form-control"
                                id="start-date"
                                value={startDate}
                                onChange={handleStartDateChange}
                              />
                            </div>
                          </div>
                          <div className="col-sm-2 mb-3">
                            <div className="form-group">
                              <label htmlFor="end-date">End Date:</label>
                              <input
                                type="date"
                                className="form-control"
                                id="end-date"
                                value={endDate}
                                onChange={handleEndDateChange}
                              />
                            </div>
                          </div>
                          <div className="col-sm-2 mb-3">
                            <div className="form-group">
                              <label htmlFor="price">Max price:</label>
                              <input
                                type="number"
                                className="form-control"
                                id="price"
                                value={price}
                                onChange={handlePriceChange}
                                step="10"
                                placeholder="All"
                              />
                            </div>
                          </div>
                          <div className="col-sm-2 mb-3">
                            <div className="form-group">
                              <label htmlFor="food-availability">Food Availability:</label>
                              <select
                                className="form-control"
                                id="food-availability"
                                value={foodAvailability}
                                onChange={handleFoodAvailabilityChange}
                              >
                                <option value="">All</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                            {filteredEvents.map((event, idx) => { 
                                return (
                                    <div className="col-md-6 col-lg-4">
                                        <EventCard event={event} idx={idx}/>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                ) : (
                    <p>Loading...</p>
                )}
            </div>

        </div>
        </>
    );
} 

export default EventsPage;