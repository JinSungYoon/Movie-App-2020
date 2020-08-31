import React from "react";
//import PropTypes from "prop-types";
import axios from "axios";
import Movie from "./Movie";
import './App.css';

// function Food({name,picture,rating}){
//   return(
//     <div>
//       <h2> I like {name}</h2>
//       <h4>{rating}/5.0</h4>
//       <img src={picture} alt={name}></img>
//     </div>
//   );
// }

// Food.prototype = {
//   name : PropTypes.string.isRequired,
//   picture : PropTypes.string.isRequired,
//   rating : PropTypes.number.isRequired
// }

// const foodILike = [
//   { 
//     id:1,
//     name:"Kimche",
//     image:"https://health.chosun.com/site/data/img_dir/2020/07/21/2020072103114_0.jpg",
//     rating:3.5
//   },
//   {
//     id:2,
//     name:"ramaen",
//     image:"https://dimg.donga.com/wps/NEWS/IMAGE/2015/03/07/69995297.5.jpg",
//     rating:4.2
//   },
//   {
//     id:3,
//     name:"chobab",
//     image:"https://newsimg.hankookilbo.com/cms/articlerelease/2018/12/11/201812111527725256_4.jpg",
//     rating:4.5
//   }
// ];

// function renderFood(dish){
//   console.log(dish);
//   return <Food name={dish.name} picture={dish.image}/>
// }

// function App() {
//   return (
//     <div className="App">
//       <h1> Hello React JS</h1>
//       {foodILike.map(dish =>(
//         <Food id={dish.id} name={dish.name} picture={dish.image} rating={dish.rating}/>
//       ))}
//       {foodILike.map(renderFood)}
//     </div>
//   );
// }

// class App extends React.Component{
//   state = {
//     count : 0
//   };
//   add = () =>{ 
//     this.state.count++;
//     this.setState(current => ({count:current.count}));
//    };
//   minus = () => {
//     this.state.count--;
//     this.setState(current => ({count:current.count}));
//    };
//    componentDidMount(){
//      console.log("Compoent render");
//    }
//    componentDidUpdate(){
//     console.log("I jusg update");
//    }
//   render(){
//     return (
//       <div>
//         <h1>The number is {this.state.count}</h1>
//         <button onClick={this.add}>Add</button>
//         <button onClick={this.minus}>Minus</button>
//       </div>
//       );
//   }  
// }

class App extends React.Component{
  state ={
    isLoading:true,
    movies : []
  };
  getMovies = async () =>{
    const {data:{data:{movies}}} = await axios.get("https://yts-proxy.now.sh/list_movies.json?sort_by=rating");
    this.setState({movies:movies,isLoading:false});
  };
  componentDidMount(){
    setTimeout(()=>{
      this.setState({isLoading:false});
    },6000);
    this.getMovies(); 
  }
  render(){
    const {isLoading,movies}=this.state;
    return (
      <section className="container">
        {isLoading 
          ? (<div className="loader">
              <span className="loader__text">Loading...</span>
            </div>) : (
              <div className="movies">
                {movies.map(movie=>(
                <Movie
                    key={movie.id}
                    id={movie.id} 
                    year={movie.year} 
                    title={movie.title} 
                    genres={movie.genres} 
                    summary={movie.summary} 
                    poster={movie.medium_cover_image} 
                  />
       
                ))}
              </div>
            )
          }
        </section>
        );
  }
}

export default App;
