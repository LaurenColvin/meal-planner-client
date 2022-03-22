import { useState } from "react";
import { Modal } from "react-bootstrap";
import AddIngredients from "../AddIngredients/AddIngredients";

const RecipeFeed = (props) => {
  const [recipes, setRecipes] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClick = (event) => {
    event.preventDefault();
    fetch(props.urlBase + "/recipe")
      .then((response) => response.json())
      .then((data) => setRecipes(data.recipe))
      .catch(() => console.log("oops, error"));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(title);
    let data = {
      title: title,
      url: url,
      imgUrl: imgUrl,
    };
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch(props.urlBase + "/recipe", options)
      .then((res) => res.json())
      .then((d) => console.log(d))
      .then(() => setTitle(""))
      .then(() => setUrl(""))
      .then(() => setImgUrl(""));
  };

  const titleHandleChange = (event) => {
    event.preventDefault();
    setTitle(event.target.value);
  };

  const urlHandleChange = (event) => {
    event.preventDefault();
    setUrl(event.target.value);
  };

  const imgUrlHandleChange = (event) => {
    event.preventDefault();
    setImgUrl(event.target.value);
  };

  const handleDelete = (event) => {
    event.preventDefault();
    let id = event.target.id;
    let url = props.urlBase + "/recipe/" + id;
    fetch(url, { method: "DELETE" })
      .then((res) => res.json())
      .then((d) => console.log(d));
  };

  // const handleUpdate = (event) => {
  //     event.preventDefault();
  //     props.setRecipeId(event.target.id);
  //   };

  const list = recipes.map((recipe, index) => {
    return (
      <div className="recipe-card" key={index}>
        <a
          className="link"
          href={recipe.url}
          alt={recipe.title}
          target="_blank"
        >
          <h2>{recipe.title}</h2>
        </a>
        <a
          className="link"
          href={recipe.url}
          alt={recipe.title}
          target="_blank"
        >
          <img
            className="recipe-img"
            src={recipe.imgUrl}
            alt={recipe.title}
          ></img>
        </a>
        <button onClick={handleShow} id={recipe._id}>Add Ingredients</button>
        <button id={recipe._id} onClick={handleDelete}>
          Delete
        </button>
      </div>
    );
  });

  return (
    <div className="recipe-feed">
      <h2>
        Welcome to your new meal planner. Add your favorite recipe to get
        started!
      </h2>
      <form onSubmit={handleSubmit}>
        <label>
          Recipe Title:
          <input
            onChange={titleHandleChange}
            type="text"
            value={title}
            required
          />
        </label>
        <label>
          URL:
          <input onChange={urlHandleChange} type="text" value={url} required />
        </label>
        <label>
          Image URL:
          <input
            onChange={imgUrlHandleChange}
            type="text"
            value={imgUrl}
            required
          />
        </label>
        <input type="submit" />
      </form>
      <button className="get-recipes" onClick={handleClick}>
        Get Recipes
      </button>
      <div className="recipes-container">{list}</div>
      <Modal show={show} onHide={handleClose}>
        <AddIngredients handleClose={handleClose}/>
      </Modal>
    </div>
  );
};

export default RecipeFeed;
