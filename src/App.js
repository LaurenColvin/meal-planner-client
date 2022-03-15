import './App.css';
import {useState} from 'react'

let urlBase = 'http://localhost:3000'

function App() {


  const [recipes, setRecipes] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [ingredients, setIngredients] = useState([]);

  const handleClick = (event) => {
    event.preventDefault();
    fetch(urlBase + '/recipe')
    .then((response) => response.json())
    .then((data) => setRecipes(data.recipe))
    .catch(() => console.log('oops, error'))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(title);
    let data = {
      "title" : title,
      "url" : url,
      "imgUrl" : imgUrl,
    }
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
    fetch(urlBase + '/recipe', options)
      .then(res => res.json())
      .then(d => console.log(d))
      .then(() => setTitle(""))
      .then(() => setUrl(""))
      .then(() => setImgUrl(""))
  }

  const titleHandleChange = (event) => {
    event.preventDefault();
    setTitle(event.target.value)
  }

  const urlHandleChange = (event) => {
    event.preventDefault();
    setUrl(event.target.value)
  }

  const imgUrlHandleChange = (event) => {
    event.preventDefault();
    setImgUrl(event.target.value)
  }

  const handleDelete = (event) => {
    event.preventDefault();
    let id = event.target.id;
    let url = urlBase + '/recipe/' + id
    fetch(url, {method: 'DELETE'})
      .then(res => res.json())
      .then(d => console.log(d))
  }


  const list = recipes.map((recipe, index) => {
    return (
      <div className='recipe-card' key={index}>
          <a className='link' href={recipe.url} alt={recipe.title} target='_blank'><h2>{recipe.title}</h2></a>
          <a className='link' href={recipe.url} alt={recipe.title} target='_blank'><img className='recipe-img' src={recipe.imgUrl} alt={recipe.title}></img></a>
          <button id={recipe._id} onClick={handleDelete}>Add Ingredients</button>
          <button id={recipe._id} onClick={handleDelete}>Delete</button>
      </div>
    )
  })

  return (
    <div className="App">
      <h1>Meal Planner</h1>
      <h2>Welcome to your new meal planner. Add your favorite recipe to get started!</h2>
      <form onSubmit={handleSubmit}>
        <label>Recipe Title:
          <input onChange={titleHandleChange} type='text' value={title}/>
        </label>
        <label>URL:
          <input onChange={urlHandleChange} type='text' value={url}/>
        </label>
        <label>Image URL:
          <input onChange={imgUrlHandleChange} type='text' value={imgUrl}/>
        </label>
        {/* <label>Ingredients:
          <input onChange={albumHandleChange} type='text' />
        </label> */}
        <input type= 'submit' />
      </form>
      <button className='get-recipes' onClick={handleClick}>Get Recipes</button>
      <div className='recipes-container'>
        {list}
      </div>
    </div>
  );
}

export default App;
