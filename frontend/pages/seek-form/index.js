import axios from "axios";
import React from "react";
import styles from "./seek-form.module.css";

const initState = {
  title: "",
  details: "",
  category: "",
  city: "",
};

function index() {
  const [formData, setFormData] = React.useState(initState);

  function onChangeHandler(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  async function onSubmitHandler(e) {
    e.preventDefault();
    let { title, details, category, city } = formData;
    let response = await axios.get(`https://geocode.xyz/${city}?json=1`);
    let { longt, latt } = response.data;
    let payload = {
      title,
      userId: "60830325efc44f2f9c2cadbd",
      category,
      details,
      city,
      location: {
        type: "Point",
        coordinates: [longt, latt],
      },
      claimed: false,
    };
    axios
      .post("http://localhost:8080/seek/", payload)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  const { title, details, category, city } = formData;

  return (
    <div className={styles.wrapper}>
      <div className={styles.hero}>
        <h1>
          We must accept finite disappointment, but never lose infinite hope.
        </h1>
      </div>
      <div onSubmit={onSubmitHandler} className={styles.form}>
        <h3>Need help? fill out the form below</h3>
        <form>
          <div>
            <input
              onChange={onChangeHandler}
              required
              value={title}
              name="title"
              placeholder="title"
            />
          </div>
          <div>
            <input
              onChange={onChangeHandler}
              required
              details={details}
              name="details"
              placeholder="details"
            />
          </div>
          <div>
            <select onChange={onChangeHandler} name="category" value={category}>
              <option value="608307d7efc44f2f9c2cadca">Medical</option>
              <option value="608307d7efc44f2f9c2cadcd">Recommendations</option>
              <option value="608307d7efc44f2f9c2cadcc">Fund Raiser</option>
              <option value="608307d7efc44f2f9c2cadca">Medical</option>
              <option value="608307d7efc44f2f9c2cadc9">Delivery</option>
              <option value="608307d7efc44f2f9c2cadcb">Donation</option>
            </select>
          </div>
          <div>
            <input
              name="city"
              required
              placeholder="city"
              onChange={onChangeHandler}
              value={city}
            ></input>
          </div>
          <div>
            <button>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default index;
