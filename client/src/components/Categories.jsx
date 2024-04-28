import React from 'react';
import {categories} from '../data';
import {Link} from 'react-router-dom';
import "../styles/Categories.scss";

const Categories = () => {
  return (
    <div className='categories'>
        <h1>
           Explore Nossas Categorias 
        </h1>
        <p>
        Explore nossa ampla variedade de aluguéis por temporada que atendem a todos os tipos de
        Viajantes. Mergulhe na cultura local, desfrute do conforto de
        casa e crie memórias inesquecíveis no destino dos seus sonhos.
        </p>

        <div className='categories-list'>
        {categories?.slice(1, 7).map((category, index) => (
          <Link to={`/properties/category/${category.label}`}>
            <div className="category" key={index}>
              <img src={category.img} alt={category.label} />
              <div className="overlay"></div>
              <div className="category-text">
                <div className="category-text-icon">{category.icon}</div>
                <p>{category.label}</p>
              </div>
            </div>
          </Link>
        ))}
        </div>
    </div>
  )
}

export default Categories;