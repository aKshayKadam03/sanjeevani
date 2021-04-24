import axios from "axios";
import React from "react";
import styles from "./host-form.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initState = {
  title: "",
  details: "",
  category: "608307d7efc44f2f9c2cadca",
  city: "",
};

function index() {
  const [formData, setFormData] = React.useState(initState);
  const [currentUser, setCurrentUser] = React.useState({});
  function onChangeHandler(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }
  const majorCity = () => toast.error("Please choose a nearby major city");
  const success = () => toast.success("Posted Successfully");
  const error = () => toast.error("Something went wrong");
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
    }
  }, []);

  async function onSubmitHandler(e) {
    e.preventDefault();
    let { title, details, category, city } = formData;
    let response;
    try {
      response = await axios.get(`https://geocode.xyz/${city}?json=1`);
    } catch (err) {
      return majorCity();
    }

    let { longt, latt } = response.data;

    let payload = {
      title,
      userId: currentUser?._id || "60830325efc44f2f9c2cadbd",
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
      .post("http://localhost:8080/host/", payload)
      .then((res) => {
        success();
        setFormData(initState);
      })
      .catch((err) => error());
  }

  const { title, details, category, city } = formData;

  return (
    <div className={styles.wrapper}>
      <div className={styles.hero}>
        <h1>
          Kindness is the ability to know what the right thing to do is and
          having the courage to do it!!
        </h1>
      </div>
      <div onSubmit={onSubmitHandler} className={styles.form}>
        <h3>Wanna help? fill out the form below</h3>
        <form className={styles.mainForm}>
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
            <select onChange={onChangeHandler} name="category">
              <option value="608307d7efc44f2f9c2cadca">Medical</option>
              <option value="608307d7efc44f2f9c2cadcd">Recommendations</option>
              <option value="608307d7efc44f2f9c2cadcc">Fund Raiser</option>
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
            <button className={styles.submit}>Submit</button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default index;
