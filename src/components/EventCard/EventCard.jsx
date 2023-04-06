import React from 'react';
import './EventCard.css';
import { Link } from 'react-router-dom';
import * as dateUtils from '../../utils/date-utils';

function EventCard(props) {
    return (
// {/* <div className="card">
// <img src={props.event.image ? props.event.image : 'https://i.imgur.com/qHdfdgh.jpg'} alt={props.event.name} className="card-img-top" />
//       <div className="card-body">
//         <h5 className="card-title">{props.event.name}</h5>
//         <h6 className="card-subtitle mb-2 text-muted">{props.event.eventType}</h6>
//         <p className="card-text">
//           <strong>Dates: </strong>
//           {dateUtils.eventDate(props.event.startTime, props.event.endTime)}
//         </p>
//         <p className="card-text">Price: {props.event.price}</p>
//         <p className="card-text">Address: {props.event.venueName}</p>
//         <a className="card-link">
//         <Link to={{ pathname: `/events/${props.event._id}` }}>Read More &raquo;</Link>
//         </a>
//       </div>
//     </div>  */}


 <div class="wrapper" >
<div className="card">
 <img src={props.event.image ? props.event.image : 'https://i.imgur.com/qHdfdgh.jpg'} alt={props.event.name} className="card-img-top" />
       <div className="card-body">
         <h5 className="card-title">{props.event.name}</h5>
         <h6 className="card-subtitle mb-2 text-muted">{props.event.eventType}</h6>
         <p className="card-text">
           <strong>Dates: </strong>
           {dateUtils.eventDate(props.event.startTime, props.event.endTime)}
         </p>
         <p className="card-text">Price: {props.event.price}$</p>
         <p className="card-text">Address: {props.event.venueName}</p>
         <a className="card-link">
         <Link to={{ pathname: `/events/${props.event._id}` }}>Read More &raquo;</Link>
         </a>
       </div>
       </div>
</div> 


    )
}

export default EventCard;