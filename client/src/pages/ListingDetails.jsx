import {useEffect, useState } from 'react';
import '../styles/ListingDetails.scss';
import {useNavigate, useParams} from 'react-router-dom';
import {facilities} from '../data';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import {DateRange} from 'react-date-range';
import Loader from '../components/Loader';
import {useSelector} from 'react-redux'


const ListingDetails = () => {
    const [loading, setLoading] = useState(true);

    const {listingId} = useParams();
    const [listing,setListing] = useState(null);

    const getListingDetails = async () => {
        try{
            const response = await fetch(
                `http://localhost:3001/properties/${listingId}`,
                {
                    method: 'GET',
                }
            );
            const data = await response.json();
            setListing(data);
            setLoading(false);
        } catch (err){
            console.log('Fetch lsiting details failed', err.message)
        }
    };

    useEffect(() => {
        getListingDetails();
    }, [])

    console.log(listing)

    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        },
    ]);

    const handleSelect = (ranges) => {
        setDateRange([ranges.selection]);
    };

    const start = new Date(dateRange[0].startDate);
    const end = new Date(dateRange[0].endDate);
    const dayCount = Math.round(end - start) / (1000 * 60 * 60 * 24);;

    const customerId = useSelector((state) => state?.user?._id)

    const navigate = useNavigate()

    const handleSubmit = async () => {
        try {
          const bookingForm = {
            customerId,
            listingId,
            hostId: listing.creator._id,
            startDate: dateRange[0].startDate.toDateString(),
            endDate: dateRange[0].endDate.toDateString(),
            totalPrice: listing.price * dayCount,
          }
    
          const response = await fetch("http://localhost:3001/bookings/create", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(bookingForm)
          })
    
          if (response.ok) {
            navigate(`/${customerId}/trips`)
          }
        } catch (err) {
          console.log("Submit Booking Failed.", err.message)
        }
      }

    return loading ? (
        <Loader />
    ) : (
        <>
        <Navbar />

        <div className='listing-details'>
            <div className='title'>
                <h1>{listing.title}</h1>
                <div></div>
            </div>

            <div className='photos'>
                {listing.listingPhotoPaths?.map((item) => (
                    <img 
                    src={`http://localhost:3001/${item.replace("public", "")}`}
                    alt='listing photo'
                    />
                ))}
            </div>

            <h2>
                {listing.type} in {listing.city}, {listing.province},{" "}
                {listing.country}
            </h2>
            <p>
                {listing.guestCount} convidados - {listing.bedroomCount} banheiros -{" "}
                {listing.bedCount} camas - {listing.bathroomCount} quartos
            </p>
            <hr />

            <div className='profile'>
                <img 
                src={`http://localhost:3001/${listing.creator.profileImagePath.replace(
                    "public",
                    ""
                )}`}
                />
                <h3>
                    Publicado pelo Hospedeiro(a): {listing.creator.firstName} {listing.creator.lastName}
                </h3>
            </div>
            <hr />

            <h3>Descrição</h3>
            <p>{listing.description}</p>
            <hr />

            <h3>{listing.highlight}</h3>
            <p>{listing.highlightDesc}</p>
            <hr />

            <div className='booking'>
                <div>
                    <h2>O que este lugar oferece?</h2>
                    <div className='amenities'>
                        {listing.amenities[0].split(",").map((item,index) => (
                            <div className='facility' key={index}>
                                <div className='facility-icon'>
                                    {
                                        facilities.find((facility) => facility.name === item)
                                        ?.icon
                                    }
                                </div>
                                <p>{item}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h2>Quanto tempo você quer ficar?</h2>
                    <div className='date-range-calendar'>
                        <DateRange ranges={dateRange} onChange={handleSelect} />
                        {dayCount > 1 ? (
                        <h2>
                         ${listing.price} x {dayCount} noite
                        </h2>
                        ) : (
                         <h2>
                          ${listing.price} x {dayCount} noite
                         </h2>
                         )}

                         <h2>Preço Total: ${listing.price * dayCount}</h2>
                         <p>Data Inicio: {dateRange[0].startDate.toDateString()}</p>
                         <p>Data Final: {dateRange[0].endDate.toDateString()}</p>

                         <button className='button' type='submit' onClick={handleSubmit}>
                            RESERVA
                         </button>
                    </div>
                </div>
            </div>
        </div>

        <Footer />
        </>
    );
};

export default ListingDetails;