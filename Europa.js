'use client' // next por default trabaja desde el lado del servidor y asi no me deja usar usestate... por eso con esta linea trabajo desde el lado del client


import styles from './page.module.css'
import { useState, useEffect } from 'react';
import React from 'react';


export default function Europa() {

   
  const [ names , setName] = useState([])  
  const [ currency , setCurrency] = useState([])  
  const [ native , setNative] = useState([])
  const [ moneda , setMoneda] = useState([])
  const [ lenguague , setLenguague] = useState([])
    

/* asi saco data de una api (application programming interface), solo sirve para api externas no para json files locales*/
const apiCountries = 'https://restcountries.com/v3.1/all'; /* pongo la url de la appi en una variable*/

async function getData() { /* una async function por que toma tiempo sacar la data y es un proceso temporal de varios pasos*/


const response = await fetch(apiCountries); /* el await hace parte de la async function y me dice que se ejecute una vez se complete esta parte, el fetch() da la interfaz para manipular data de la api*/
const data = await response.json(); /* le pongo el json()*/
//const {name} = data /* saco el object de la api que el que tiene la info, lo saco poniendo en el browser la url de la appi para mirar como esta codeado*/

setName(data.filter(function(name){ // .filter() para filtrar el json por region Africa
  return name.region == "Europe";         
}));
}



async function zoomCountry(e, index)  {


  let indexes = index // asi me agblacklista el index

  const response = await fetch(apiCountries); /* el await hace parte de la async function y me dice que se ejecute una vez se complete esta parte, el fetch() da la interfaz para manipular data de la api*/
  const data = await response.json(); /* le pongo el json()*/

  const dataAfrica = data.filter(function(name){ // .filter() para filtrar el json por region Africa
    return name.region == "Europe";         
  })


 let result = dataAfrica.slice(indexes); // asi filtro el index dentro de la api (data) y me retorna una nueva que es el pais al que le di click 
 

 // mirar ultimo fav... tengo que mirar como acceder a la ultima propiedad 

return(
  setCurrency(result),
  setNative(
    function nativoNombre() {
      let nnativo = result[0]?.name.nativeName // aqui agarro todo el nested object hasta la dynamic key
      let nombreNativo = Object.keys(nnativo); // aqui object la key dynamic de el nested object de arriba
      
      return  nnativo[nombreNativo]?.official // asi cocateno el nested object hasta la dynamic key ... luego le agrego la dynamic key como property (nombreNativo) y le hago dot notation para que me renderice .official
      }),
   setMoneda(
    function monedaNombre() {
      let mmoneda = result[0]?.currencies 
      let nombreMoneda = Object.keys(mmoneda); 
      
      return  mmoneda[nombreMoneda].name 
      }) ,
   setLenguague(
    function lenguagueNombre() {
      let lenguague = result[0]?.languages
      let nombreLenguague = Object.keys(lenguague); 
      
      return  lenguague[nombreLenguague]
      })
   )}


   
function zoomIn() {
  
  document.getElementById("countries").style.display = "none";
  document.getElementById("btnBack").style.display = "block";
 
}


function zoomOut() {
  document.getElementById("countries").style.display = "grid";
  document.getElementById("btnBack").style.display = "none";
}



 // [
    //{"name":
      // borders":["CZE","DEU","HUN","ITA","LIE","SVK","SVN","CHE"]

useEffect(() => {
  getData(),
  zoomCountry()
}, []) // para estar seguro que la funcion se ejecute

return(
  <div>
       <h1>{}</h1>
       <section>
       {names?.length > 0 && (  /* asi puedo trabajar un .length en next js */
         <ul  className={styles.countries}  id='countries'>
           {names.map(function(name, index) {
           return (
             <div className={styles.country} id='index' key={index} onClick={ (e) => {zoomCountry(e, index);   zoomIn()}}> {/* asi envio un index por onclick en un object que esta siendo mapeado , lo hago por la propiedad key={index} , que tbn esta como parametro en el .map */}
                 <img src={name.flags.png} />                               {/* el (e) se usa para indicar que ese es el valor target, debo usarlo si quiero sacar un valor en especifico de este .map */}
                 <div className={styles.eachCountry}>
                     <h2>{name.name.common}</h2>
                     <div className={styles.firstC}>
                         <h4>Population: </h4>
                         <p>{name.population}</p>
                     </div>
                     <div>
                         <h4>Region: </h4>
                         <p>{name.region}</p>
                   </div>
                     <div>
                         <h4>Capital: </h4>
                         <p>{name.capital}</p>
                   </div>
               </div> {/* para mapear varios debo colocar todas las tag dentro de un div */}
             </div>
           )
           })}
         </ul>
       )}
     </section>
     <section id='btnBack'  className={styles.countryZoom}>
       <button onClick={zoomOut}  className={styles.btnBack}>Back</button>
       <article className={styles.countryDetail}>
        <div className={styles.bandera}>
              <img src={currency[0]?.flags.png} /> {/* asi renderizo esa propiedad del object que representa el hook cunrrecy, el ? es para que me evalue el code*/}  
         </div> 
        <div className={styles.detalles}>
               <article>
                     <h1>{currency[0]?.name.common}</h1>
               </article>
               <article className={styles.detallesInfo}>
                     <div className={styles.hook}>
                           <div>
                               <p id={styles.native}>Native Name:</p>
                               <h4 >{native}</h4>
                           </div>
                           <div>
                               <p>Population:</p>
                                <h4>{ (currency[0]?.population)?.toLocaleString()}</h4>
                           </div>
                           <div>
                               <p>Region:</p>
                               <h4>{currency[0]?.region}</h4>
                           </div>
                           <div>
                               <p>Sub Region:</p>
                               <h4>{currency[0]?.subregion}</h4>
                           </div>
                           <div>
                               <p>Capital:</p>
                               <h4>{currency[0]?.capital}</h4>
                           </div>
                     </div>
                     <div  className={styles.hook}>
                           <div>
                               <p>Top Level Domain:</p>
                               <h4>{currency[0]?.tld}</h4>
                           </div>
                           <div id={styles.moneda}>
                               <p>currencies:</p>
                               <h4>{moneda}</h4> 
                           </div>
                           <div>
                               <p>Lenguages: </p>
                               <h4>{lenguague}</h4>
                           </div>
                     </div>
               </article>
               <article  className={styles.borders}>
                     <p>Border Countries: </p>
                     <div>
                         <h4>{currency[0]?.borders?.[0]}</h4> {/* asi renderizo una nested array.. en ese caso borders que esta dentro de currency*/}
                         <h4>{currency[0]?.borders?.[1]}</h4>
                         <h4>{currency[0]?.borders?.[2]}</h4>
                         <h4>{currency[0]?.borders?.[3]}</h4>
                         <h4>{currency[0]?.borders?.[4]}</h4>
                     </div>
               </article>
          </div>
          </article>
     </section>
 </div> 
)

}