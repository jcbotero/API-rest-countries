'use client' // next por default trabaja desde el lado del servidor y asi no me deja usar usestate... por eso con esta linea trabajo desde el lado del client

import styles from './page.module.css'
import React from 'react';
import HomeA from './home';
import Africa from './Africa';
import America from './America';
import Asia from './Asia';
import Europa from './Europa';
import Oceania from './Oceania';
import Search from './Search';
import { useRef } from 'react';
import Head from 'next/head';


export default class Home extends React.Component {
  
  constructor(props) {
    super(props)
    this.myRef = React.createRef();
    this.state = { 
      component :  < HomeA  /> ,// es el state inicial... abajo lo cambio dependiendo donde haga click
      theme :  true,    
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleClick2 = this.handleClick2.bind(this);
    this.handleClick3 = this.handleClick3.bind(this);
    this.handleClick4 = this.handleClick4.bind(this);
    this.handleClick5 = this.handleClick5.bind(this);
    this.regions = this.regions.bind(this);
    this.regionsOut = this.regionsOut.bind(this);
    this.search = this.search.bind(this);
    this.home = this.home.bind(this);
    
  };

  handleClick() {  // estos handleclick son para cambiar el component al darle click a una region
    this.setState({ 
      component :  < Africa />
   });
  }
   handleClick2() {
    this.setState({ 
      component :  < America/>
   })
  }
   handleClick3() {
    this.setState({ 
      component :  < Asia />
   })}

   handleClick4() {
    this.setState({ 
      component :  < Europa/>
   })}
  
   handleClick5() {
    
    this.setState({ 
      component :  < Oceania/>
      
   })}
  

   regions = () => {
    document.getElementById("filter").style.display = "block";
  }
  
  regionsOut = () => {
    document.getElementById("filter").style.display = "none";
  }

   

  search() { 
    this.setState({ 
      component :  <Search  pais={this.myRef.current.value} />, // asi paso un prop de un class component a un functional ....
    })
  }
  

  themeToggler = () => {
    const currentState = this.state.theme;
        this.setState({ theme: !currentState });
  } /* esta fucntion se me dispara al darle click al boton , me hace cambiar el state theme, y por tanto la classname de ese div*/


  home = () => {
    window.location.reload();
  } /* esta fucntion hace que al darle click al titulo de la pagina me refesque la pagina */

  
  // mejor hacerlo de una vez onclick findindex

render() {

  return (
    <>
    <Head>
        <title>Rest Countries API</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
   </Head> 
    <div   className={this.state.theme ? "styles.light": styles.dark}> {/* aqui estoy asignando una class name con base en un state que es theme, con la function themeToggler pasa de la classname light a dark */}
    <div id='component' className={styles.body}>
    <header>
        <section className={styles.Htop}>
                <h2 onClick={this.home}>Where in the world?</h2>
                <button onClick={this.themeToggler} className={styles }> Dark Mode</button>
        </section>
        <section className={styles.Hdown}>
            <div>
                <input id='pais' type='text' onKeyUp={this.search}    ref={this.myRef} className={styles.inputSearch} placeholder='Search for a country..' />
            </div>
            <div onMouseLeave={this.regionsOut} > {/* asi uso un mouseOut y abajo esta el mouseover... en react... dispara una function arriba experada */}
                <button onMouseOver={this.regions} className={styles.btnFilter}> Filter by Region  </button>
                <div  id='filter' className={styles.regions} >
                    <p id='Africa' onClick={this.handleClick}>Africa</p>
                    <p onClick={this.handleClick2}>America</p>
                    <p onClick={this.handleClick3}>Asia</p>
                    <p onClick={this.handleClick4}>Europe</p>
                    <p onClick={this.handleClick5}>Oceanía</p>
                </div>
            </div>
        </section>
    </header>
    <main>
    <div> 
       {this.state.component} {/* aqui se cambia el componente al darle click */}
    </div>
    </main>
    </div>
    </div>
    </>
  );
}; }