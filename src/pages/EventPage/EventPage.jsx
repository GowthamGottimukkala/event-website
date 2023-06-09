import React, { useEffect, useState } from 'react';
import './EventPage.css';
import { Link } from 'react-router-dom';
import Map from '../../components/Map/Map';
import PageHeader from '../../components/PageHeader/PageHeader';
import ImageUpload from '../../components/ImageUpload/ImageUpload';
import * as eventAPI from '../../services/events-api';
import * as dateUtils from '../../utils/date-utils';
import shareIcon from "./share.svg";


function EventPage(props) {

    // set initial state
    const [event, setEvent] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);
    const [copySuccess, setCopySuccess] = useState(false);

    const handleClick = () => {
        navigator.clipboard.writeText(window.location.href)
        .then(() => {
            setCopySuccess(true);
        })
        .catch((error) => {
            console.error("Error copying to clipboard: ", error);
        });
    };

    useEffect(() => {
        async function fetchData() {
            // make call to back-end api to get event data
            const results = await eventAPI.getOne(props.match.params.id);
            
            if(results.err) {
                // replace page if error retrieving event data
                props.history.replace('/');
            } else {
                // set state
                setEvent(results);
                setIsLoaded(true);
            }
        }
        fetchData();
    }, [ props.match.params.id, props.history, event.image ]);

    const handleRSVP = async (e) => {
        // add this user to the attendees array
        event.attendees.push(props.user);

        // make call to back-end api / update event
        const updatedEvent = await eventAPI.update(event);
        setEvent(updatedEvent);

        // go to event page to see updated info
        props.history.push(`/events/${event._id}`);
    }

    return (

        <div className='EventPage'>

            <PageHeader />

            <div className='container py-3'>

                {isLoaded ? (
                    <>
                        <h1 className="event-name">
                            <span>{event.name}</span>
                        </h1>

                        <div className="row">

                            <div className="col-lg-8">
                                {event.image && (
                                    <img src={event.image} alt={event.name} className="img-fluid w-100 mb-4" />
                                )}
                                <p>{event.description}</p>
                            </div>

                            <div className="col-lg-4">
                                <div className="">
                                <div>
                                <button onClick={handleClick} style={{padding: "0.5rem", marginBottom: "1rem"}}>
                                    <img src={shareIcon} alt="Share icon" style={{ marginRight: "5px" }} />
                                    Share Event
                                </button>
                                {copySuccess && <p style={{ color: "green" }}>Copied to clipboard!</p>}
                                </div>
                                    <p>
                                        <strong>Type of Event</strong><br />
                                        {event.eventType}
                                    </p>
                                    <p>
                                        <strong>Date</strong><br />
                                        {dateUtils.eventDate(event.startTime, event.endTime)}
                                    </p>
                                    <p>
                                        <strong>Price</strong><br />
                                        {event.price}$
                                    </p>
                                    <p>
                                        <strong>Food Allowed?</strong><br />
                                        {event.foodAvailability}
                                    </p>
                                    <p>
                                        <strong>Address</strong><br />
                                        <address>
                                            {event.venueName}
                                            {event.address}<br />
                                            {event.city}, {event.state} {event.zip}
                                        </address>
                                    </p>

                                    

                                    <Map lat={event.lat} lng={event.lng} />

                                    {props.user ? (

                                        event.user === props.user._id ? (
                                            <>
                                                <h5>Admin</h5>
                                                <p>As the event creator, you can edit the event details and image.</p>
                                                <p><Link to={{ pathname: `/events/${event._id}/edit` }}>Edit Event Details</Link></p>
                                                <ImageUpload event={event} setEvent={setEvent} />
                                            </>
                                        ) : (
                                            <>
                                                {event.attendees.includes(props.user._id) ? (
                                                    <p className="font-weight-bold text-success">Awesome! You have a ticket to this event!</p>
                                                ) : (
        
                                                        <p className="font-weight-bold text-danger">Hurry! Only {event.maxCapacity - event.attendees.length} tickets left!</p>
                                                )}

                                                <button
                                                    type="button"
                                                    className="btn btn-primary mb-3"
                                                    onClick={ handleRSVP }
                                                    disabled={ event.attendees.includes(props.user._id) }
                                                >
                                                    { event.attendees.includes(props.user._id) ? `Ticket Reserved` : `Reserve Ticket` }
                                                </button>
                                            </>
                                        )

                                    ) : (
                                        <Link to="/login" className="btn btn-primary mb-3">Log in to reserve your ticket</Link>
                                    )}
                                </div>
                            </div>

                        </div>
                    </>
                ) : (
                    <p>Loading...</p>
                )}
                
            </div>

        </div>
    );
} 

export default EventPage;