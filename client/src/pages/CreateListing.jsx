import '../styles/CreateListing.scss';
import Navbar from '../components/Navbar';
import {categories, types, facilities} from '../data';

import {RemoveCircleOutline, AddCircleOutline} from '@mui/icons-material';
import variables from '../styles/variables.scss';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import {IoIosImages} from 'react-icons/io';
import {useState} from 'react';
import {BiTrash} from 'react-icons/bi';
import {useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import Footer from '../components/Footer';

const CreateListing = () => {
    const [category, setCategory] = useState("");
    const [type, setType] = useState('');

    const [formLocation, setFormLocation]=useState({
        streetAddress: '',
        aptSuite: '',
        city: '',
        province: '',
        country: '',
    })

    const handleChangeLocation = (e) => {
        const {name, value} = e.target;
        setFormLocation({
            ...formLocation,
            [name]: value,
        });
    }

    const [guestCount, setGuestCount] = useState(1);
    const [bedroomCount, setBedroomCount] = useState(1);
    const [bedCount, setBedCount] = useState(1);
    const [bathroomCount, setBathroomCount] = useState(1);

    const [amenities, setAmenities] = useState([]);

    const handleSelectAmenities = (facility) => {
        if(amenities.includes(facility)){
            setAmenities((prevAmenities) => 
        prevAmenities.filter((option) => option !== facility)
        )
        } else{
            setAmenities((prev) => [...prev, facility])
        }
    };

    

    const [photos, setPhotos] = useState([]);

    const handleUploadPhotos = (e) => {
        const newPhotos = e.target.files;
        setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
    };

    const handleDragPhoto = (result) => {
        if(!result.destination) return;

        const items = Array.from(photos);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setPhotos(items)
    };

    const handleRemovePhoto = (indexToRemove) => {
        setPhotos((prevPhotos) => 
    prevPhotos.filter((_, index) => index !== indexToRemove)
    );
    };

    const [formDescription, setFromDescription] = useState({
        title: '',
        description: '',
        highlight: '',
        highlightDesc: '',
        price: 0,
    });

    const handleChangeDescription = (e) => {
        const {name, value} = e.target;
        setFromDescription({
            ...formDescription,
            [name]: value,
        });
    };

    const creatorId = useSelector((state) => state.user._id)

    const navigate = useNavigate();

    const handlePost = async (e) => {
        e.preventDefault();

        try{
            const listingForm = new FormData();
      listingForm.append("creator", creatorId);
      listingForm.append("category", category);
      listingForm.append("type", type);
      listingForm.append("streetAddress", formLocation.streetAddress);
      listingForm.append("aptSuite", formLocation.aptSuite);
      listingForm.append("city", formLocation.city);
      listingForm.append("province", formLocation.province);
      listingForm.append("country", formLocation.country);
      listingForm.append("guestCount", guestCount);
      listingForm.append("bedroomCount", bedroomCount);
      listingForm.append("bedCount", bedCount);
      listingForm.append("bathroomCount", bathroomCount);
      listingForm.append("amenities", amenities);
      listingForm.append("title", formDescription.title);
      listingForm.append("description", formDescription.description);
      listingForm.append("highlight", formDescription.highlight);
      listingForm.append("highlightDesc", formDescription.highlightDesc);
      listingForm.append("price", formDescription.price);

      photos.forEach((photo) => {
        listingForm.append("listingPhotos", photo);
      });

      const response = await fetch("http://localhost:3001/properties/create", {
        method: 'POST',
        body: listingForm,
      });

      if(response.ok){
        navigate("/");
      }
        } catch (err){
            console.log('Publish listing failed', err.message)
        }
    };

    return (
        <>
        <Navbar />

        <div className='create-listing'>
            <h1>Publique sua hospedagem</h1>
            <form onSubmit={handlePost}>
                <div className='create-listing-step1'>
                    <h2>Etapa 1: Nós conte sobre seu lugar</h2>
                    <hr />
                    <h3>Qual destas categorias melhor descreve o seu lugar?</h3>
                    <div className='category-list'>
                        {categories?.map((item, index) => (
                            <div
                            className={`category ${
                                category === item.label ? 'selected' : ''
                            }`}
                            key={index}
                            onClick={() => setCategory(item.label)}
                            >
                                <div className='category-icon'>{item.icon}</div>
                                <p>{item.label}</p>
                            </div>
                        ))}
                    </div>

                    <h3>Que tipo de lugar os hóspedes terão?</h3>
                    <div className='type-list'>
                        {types?.map((item, index) => (
                            <div
                            className={`type ${type === item.name ? 'selected' : ''}`}
                            key={index}
                            onClick={()=> setType(item.name)}
                            >
                                <div className='type-text'>
                                    <h4>{item.name}</h4>
                                    <p>{item.description}</p>
                                </div>
                                <div className='type-icon'>{item.icon}</div>
                            </div>
                        ))}
                    </div>

                    <h3>Onde fica sua casa?</h3>
                    <div className='full'>
                        <div className='location'>
                            <p>Endereço da Rua</p>
                            <input 
                            type='text'
                            placeholder='Endereço rua'
                            name='streetAddress'
                            value={formLocation.streetAddress}
                            onChange={handleChangeLocation}
                            required
                            />
                        </div>
                    </div>

                    <div className='half'>
                        <div className='location'>
                            <p>Apartamento, Suite, etc.</p>
                            <input 
                            type='text'
                            placeholder='Apt, Suite, etc'
                            name='aptSuite'
                            value={formLocation.aptSuite}
                            onChange={handleChangeLocation}
                            required
                            />
                        </div>
                        <div className='location'>
                            <p>Cidade</p>
                            <input 
                            type='text'
                            placeholder='Cidade'
                            name='city'
                            value={formLocation.city}
                            onChange={handleChangeLocation}
                            required
                            />
                        </div>
                    </div>
                    <div className='half'>
                        <div className='location'>
                            <p>Estado</p>
                            <input 
                            type='text'
                            placeholder='Estado'
                            name='province'
                            value={formLocation.province}
                            onChange={handleChangeLocation}
                            required
                            />
                        </div>
                        <div className='location'>
                            <p>Pais</p>
                            <input 
                            type='text'
                            placeholder='Pais'
                            name='country'
                            value={formLocation.country}
                            onChange={handleChangeLocation}
                            required
                            />
                        </div>
                    </div>

                    <h3>Compartilhe algumas noções básicas sobre sua casa</h3>
                    <div className='basics'>
                        <div className='basic'>
                            <p>Convidados</p>
                            <div className='basic-count'>
                                <RemoveCircleOutline 
                                onClick={() => {
                                    guestCount > 1 && setGuestCount(guestCount - 1);
                                }}
                                sx={{
                                    fontSize: '25px',
                                    cursor: 'pointer',
                                    '&:hover': {color: variables.greenbr},
                                }}
                                />
                                <p>{guestCount}</p>
                                <AddCircleOutline 
                                onClick={() => {
                                    setGuestCount(guestCount + 1);
                                }}
                                sx={{
                                    fontSize: '25px',
                                    cursor: 'pointer',
                                    '&:hover': {color: variables.greenbr},
                                }}
                                />
                            </div>
                        </div>

                        <div className='basic'>
                            <p>Banheiros</p>
                            <div className='basic-count'>
                                <RemoveCircleOutline 
                                onClick={() => {
                                    bedroomCount > 1 && setBedroomCount(bedroomCount - 1);
                                }}
                                sx={{
                                    fontSize: '25px',
                                    cursor: 'pointer',
                                    '&:hover': {color: variables.greenbr},
                                }}
                                />
                                <p>{bedroomCount}</p>
                                <AddCircleOutline 
                                onClick={()=> {
                                    setBedroomCount(bedroomCount + 1);
                                }}
                                sx={{
                                    fontSize: '25px',
                                    cursor: 'pointer',
                                    '&:hover': {color: variables.greenbr},
                                }}
                                />
                            </div>
                        </div>

                        <div className='basic'>
                            <p>Camas</p>
                            <div className='basic-count'>
                                <RemoveCircleOutline 
                                onClick={() => {
                                    bedCount > 1 && setBedCount(bedCount - 1);
                                }}
                                sx={{
                                    fontSize: '25px',
                                    cursor: 'pointer',
                                    '&:hover': {color: variables.greenbr},
                                }}
                                />
                                <p>{bedCount}</p>
                                <AddCircleOutline 
                                onClick={()=> {
                                    setBedCount(bedCount + 1);
                                }}
                                sx={{
                                    fontSize: '25px',
                                    cursor: 'pointer',
                                    '&:hover': {color: variables.greenbr},
                                }}
                                />
                            </div>
                        </div>

                        <div className='basic'>
                            <p>Quartos</p>
                            <div className='basic-count'>
                                <RemoveCircleOutline 
                                onClick={() => {
                                    bathroomCount > 1 && setBathroomCount(bathroomCount - 1);
                                }}
                                sx={{
                                    fontSize: '25px',
                                    cursor: 'pointer',
                                    '&:hover': {color: variables.greenbr},
                                }}
                                />
                                <p>{bathroomCount}</p>
                                <AddCircleOutline 
                                onClick={()=> {
                                    setBathroomCount(bathroomCount + 1);
                                }}
                                sx={{
                                    fontSize: '25px',
                                    cursor: 'pointer',
                                    '&:hover': {color: variables.greenbr},
                                }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='create-listing-step2'>
                <h2>Etapa 2: Faça seu lugar se destacar</h2>
                <hr />

                <h3>Diga aos hóspedes o que seu lugar tem a oferecer</h3>
                <div className='amenities'>
                    {facilities?.map((item, index) => (
                        <div
                        className={`facility ${
                            amenities.includes(item.name) ? 'selected' : ''
                        }`}
                        key={index}
                        onClick={()=> handleSelectAmenities(item.name)}
                        >
                            <div className='facility-icon'>{item.icon}</div>
                            <p>{item.name}</p>
                        </div>
                    ))}
                </div>

                <h3>Adicione algumas fotos do seu lugar</h3>
                <DragDropContext onDragEnd={handleDragPhoto}>
                    <Droppable droppableId='photo' direction='horizontal'>
                        {(provided) => (
                            <div
                             className='photos'
                             {...provided.droppableProps}
                             ref={provided.innerRef}
                            >
                                {photos.length < 1 && (
                                    <>
                                    <input 
                                    id='image'
                                    type='file'
                                    style={{display: 'none'}}
                                    accept='image/*'
                                    onChange={handleUploadPhotos}
                                    />
                                    <label htmlFor='image' className='alone'>
                                        <div className='icon'>
                                            <IoIosImages />
                                        </div>
                                        <p>Carregar do seu dispositivo</p>
                                    </label>
                                    </>
                                )}
                                {photos.length >= 1 && (
                                    <>
                                    {photos.map((photo, index) => {
                                        return (
                                            <Draggable
                                            key={index}
                                            draggableId={index.toString()}
                                            index={index}
                                            >
                                                {(provided) => (
                                                    <div
                                                    className='photo'
                                                    reg={provided.inenrRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    >
                                                        <img 
                                                        src={URL.createObjectURL(photo)}
                                                        alt='place'
                                                        />
                                                        <button
                                                        type='button'
                                                        onClick={() => handleRemovePhoto(index)}
                                                        >
                                                            <BiTrash />
                                                        </button>
                                                    </div>
                                                )}
                                            </Draggable>
                                        )
                                    })}
                                    <input 
                                    id='image'
                                    type='file'
                                    style={{display: 'none'}}
                                    accept="image/*"
                                    onChange={handleUploadPhotos}
                                    multiple
                                    />
                                    <label htmlFor='image' className='together'>
                                        <div className='icon'>
                                            <IoIosImages />
                                        </div>
                                        <p>Carregar do seu dispositivo</p>
                                    </label>
                                    </>
                                )}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>

                <h3>O que torna seu lugar atraente e emocionante?</h3>
                <div className='description'>
                    <p>Titulo</p>
                    <input 
                    type='text'
                    placeholder='Titulo'
                    name='title'
                    value={formDescription.title}
                    onChange={handleChangeDescription}
                    required
                    />
                    <p>Descrição</p>
                    <textarea
                    type='text'
                    placeholder='Descrição'
                    name='description'
                    value={formDescription.Description}
                    onChange={handleChangeDescription}
                    required
                    />
                    <p>Destaque</p>
                    <input 
                    type='text'
                    placeholder='Destaque'
                    name='highlight'
                    value={formDescription.highlight}
                    onChange={handleChangeDescription}
                    required
                    />
                    <p>Detalhe</p>
                    <input 
                    type='text'
                    placeholder='Detalhe'
                    name='highlightDesc'
                    value={formDescription.highlightDesc}
                    onChange={handleChangeDescription}
                    required
                    />
                    <p>Agora, o Preço</p>
                    <span>$</span>
                    <input 
                    type='number'
                    placeholder='100'
                    name='price'
                    value={formDescription.price}
                    onChange={handleChangeDescription}
                    className='price'
                    required
                    />
                </div>
                </div>

                <button className='submit-btn' type='submit'>
                    CRIE SUA LISTA
                </button>
            </form>
        </div>

        <Footer />
        </>
    )
}

export default CreateListing;