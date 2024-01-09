import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [content, setState] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://60e6ab63-ccac-415f-a06a-74f239b19fd2-00-24l7nht8hemc0.pike.replit.dev/getData"
        );
        setState(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [content]);

  const handleClick = async () => {
    await addData();
  };

  return (
    <div className="two-column-container">
      <form className="form-container" onSubmit={() => {}}>
        <h1>Submit Form</h1>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" placeholder="Enter your name" />
        </div>
        <div className="form-group">
          <label htmlFor="surname">Description:</label>
          <input type="text" id="des" placeholder="Enter your surname" />
        </div>
        <div className="form-group">
          <label htmlFor="surname">Social Media:</label>
          <input type="text" id="soc" placeholder="Enter your surname" />
        </div>
        <div className="form-group">
          <label htmlFor="surname">Interest:</label>
          <input type="text" id="int" placeholder="Enter your surname" />
        </div>
        <button type="button" onClick={handleClick}>
          Submit
        </button>
      </form>

      <div className="cards-container">
        {content.map((ele, index) => (
          <div key={index} className="card">
            <Card
              name={ele.name}
              description={ele.description}
              social_media={ele.social_media}
              interest={ele.interest}
            />
          </div>
        ))}
      </div>
    </div>
  );

  function Card(props) {
    return (
      <div className="card-content">
        <h2 className="card-title">{props.name}</h2>
        <p className="card-description">{props.description}</p>
        <p className="card-description">{props.social_media}</p>
        <p className="card-description">{props.interest}</p>
      </div>
    );
  }
}

async function addData() {
  const name = document.getElementById("name").value;
  const des = document.getElementById("des").value;
  const soc = document.getElementById("soc").value;
  const int = document.getElementById("int").value;

  const dataToAdd = {
    name: name,
    description: des,
    social_media: soc,
    interest: int,
  };

  try {
    await axios.post(
      "https://60e6ab63-ccac-415f-a06a-74f239b19fd2-00-24l7nht8hemc0.pike.replit.dev/addData",
      dataToAdd
    );
  } catch (error) {
    console.error("Error adding data:", error);
  }
}

export default App;