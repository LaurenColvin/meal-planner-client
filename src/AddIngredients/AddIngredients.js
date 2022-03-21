import { useState, useEffect } from "react";

const AddIngredients = (props) => {


    const [amount, setAmount] = useState("");
    const [measurement, setMeasurement] = useState("");
    const [item, setItem] = useState("");
    const [category, setCategory] = useState("");
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        fetch(props.urlBase + "/recipe/" + props.recipeId)
          .then((response) => response.json())
          .then((data) => console.log(data))
          .catch(() => console.log("oops, error"));
      }, []);

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
        fetch(props.urlBase + "/ingredients", options)
          .then((res) => res.json())
          .then((d) => console.log(d))
          .then(() => setItem(""))
          .then(() => setAmount(""))
          .then(() => setMeasurement(""));
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
      <div className="add-ingredients-container">
        <h1>Add Your Ingredients</h1>
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
        <label>
          Amount:
          <input onChange={amountHandleChange} value={amount} type="number" required/>
        </label>
        <label>
          Measurement:
          <input onChange={measurementHandleChange} type="text" value={measurement} required/>
        </label>
        <label>
          Ingredient:
          <input onChange={ingredientHandleChange} type="text" value={ingredients} required/>
        </label>
        <input type="submit" />
      </form>
      </div>
    );
  };
  
  export default AddIngredients;