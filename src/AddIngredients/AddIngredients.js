import { Modal, Button } from "react-bootstrap";
import { useState, useEffect } from "react";

const AddIngredients = (props) => {

  const [amount, setAmount] = useState("");
  const [measurement, setMeasurement] = useState("");
  const [item, setItem] = useState("");
  const [category, setCategory] = useState("");
  const [allIngredients, setAllIngredients] = useState([]);

  // useEffect(() => {
  //     fetch(props.urlBase + "/recipe/" + props.recipeId)
  //       .then((response) => response.json())
  //       .then((data) => setAllIngredients(data.recipe.ingredients))
  //       .catch(() => console.log("oops, error"));
  //   }, []);

  const putIngredients = (ingredient) => {
      console.log(allIngredients);
      console.log(ingredient);
      const ingredientsCopy = [...allIngredients];
      ingredientsCopy.push(ingredient);
      let data = {
        ingredients: ingredientsCopy,
      }
    let options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch(props.urlBase + "/recipe/" + props.recipeId, options)
      .then((response) => response.json())
      .then((data) => console.log(data));
    fetch(props.urlBase + '/recipe/' + props.recipeId)
      .then((res) => res.json())
      .then((data) => setAllIngredients(data.recipe.ingredients));
  };

  const handleSubmit = (event) => {
      event.preventDefault();
      let data = {
          amount: amount,
          measurement: measurement,
          item: item,
          category: category,
      };
      let options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      fetch(props.urlBase + '/recipe/' + props.recipeId)
           .then((res) => res.json())
           .then((data) => setAllIngredients(data.recipe.ingredients));
      fetch(props.urlBase + "/ingredients", options)
        .then((res) => res.json())
        .then((data) => putIngredients(data.ingredients))
        .then(() => setItem(""))
        .then(() => setAmount(""))
        .then(() => setMeasurement(""));
      // props.handleClose()
    };

  
    const categoryHandleChange = (event) => {
      event.preventDefault();
      setCategory(event.target.value);
    };
  
    const amountHandleChange = (event) => {
      event.preventDefault();
      setAmount(event.target.value);
    };
  
    const measurementHandleChange = (event) => {
      event.preventDefault();
      setMeasurement(event.target.value);
    };

    const ingredientHandleChange = (event) => {
      event.preventDefault();
      setItem(event.target.value);
    };

    return (
        <>
        <Modal.Header>
          <Modal.Title>Add Ingredients</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="add-ingredients-container">
        <form onSubmit={handleSubmit}>
        <label>Category:</label>
        <select className="search" id="type" onChange={categoryHandleChange} required>
            <option className='option' value=""></option>
            <option className='option' value="meat">Meat</option>
            <option className='option' value="vegetable">Vegetable</option>
            <option className='option' value="fruit">Fruit</option>
            <option className='option' value="dairy">Dairy</option>
            <option className='option' value="dry good">Dry Good</option>
            <option className='option' value="spice">Spice</option>
            <option className='option' value="condiment">Condiment</option>
            <option className='option' value="other">Other</option>
          </select>
        <br/>
        <label>
          Amount:
          <input onChange={amountHandleChange} value={amount} type="number" required/>
        </label>
        <br/>
        <label>
          Measurement:
          <input onChange={measurementHandleChange} type="text" value={measurement} required/>
        </label>
        <br/>
        <label>
          Ingredient:
          <input onChange={ingredientHandleChange} type="text" value={item} required/>
        </label>
        {/* <input type="submit" /> */}
      </form>
      </div>
      </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="secondary" onClick={handleSubmit}>
            Add Another
          </Button>
          {/* <Button variant="primary" onClick={handleSubmit}>
            Finish
          </Button> */}
        </Modal.Footer>
        </>
    )
  };
  
  export default AddIngredients;