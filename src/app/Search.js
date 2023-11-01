'use client' // next por default trabaja desde el lado del servidor y asi no me deja usar usestate... por eso con esta linea trabajo desde el lado del client


import styles from './page.module.css'
import { useState, useEffect } from 'react';
import React from 'react';
import Home from './page';

export default function Search( {pais}) {

    const [ names , setName] = useState()  
    

 useEffect(() => {   

const apiCountries = 'https://restcountries.com/v3.1/all'; 

const fetchData = async () => {  /* ASI DECLARO UNA ASUNC FUNCTION DENTRO DE UN USAEFFECT */  


const response = await fetch(apiCountries); 
const data = await response.json(); 


setName(data.filter(function(name){ // .filter() para filtrar el json por region Africa
  return name.name.common == pais;          
}));
  
} // asi filtro un json para renderizar solo los que quiero... en este caso los de la region de africa



fetchData()

}, [pais])  // AL COLOCAR EL PROP DENTRO DE ESTA ARRAY DEL USEFFECT... ME ACTUALIZA EL PROP CADA VEZ QUE LO ENVÍO DEL OTRO PARENT COMPONENT



    return(
        <div>
       {names?.length > 0 && (  /* asi puedo trabajar un .length en next js */
         <ul>
           {names.map(function(name, index) {
           return (
             <div className={styles.search} id='index' key={index}> 
             <section>
                 <img src={name.flags.png} />  
             </section>  
            <section>                         
                 <div className={styles.eachCountry}>
                     <h2>{name.name.common}</h2>
                     <div className={styles.firstC}>
                         <h4>Population: </h4>
                         <p>{ (name.population)?.toLocaleString()}</p>
                     </div>
                     <div>
                         <h4>Region: </h4>
                         <p>{name.region}</p>
                   </div>
                   <div>
                         <h4>Sub Region:</h4>
                          <p>{name.subregion}</p>
                          </div>
                     <div>
                         <h4>Capital: </h4>
                         <p>{name.capital}</p>
                   </div>
                   <div>
                         <h4>Continent: </h4>
                         <p>{name.continents}</p>
                   </div>
                   <div>
                         <h4>Area: </h4>
                         <p>{(name.area)?.toLocaleString()}</p>
                   </div>
                   <div>
                     <h4>Border Countries: </h4>
                    
                         <p>{name.borders?.[0]}</p> {/* asi renderizo una nested array.. en ese caso borders que esta dentro de name*/}
                         <p>{name.borders?.[1]}</p>
                         <p>{name.borders?.[2]}</p>
                         <p>{name.borders?.[3]}</p>
                         <p>{name.borders?.[4]}</p>
                     
                   </div>
               </div> {/* para mapear varios debo colocar todas las tag dentro de un div */}
               </section>  
             </div>
           )
           })}
         </ul>
       )}
      </div>
       
    )

}