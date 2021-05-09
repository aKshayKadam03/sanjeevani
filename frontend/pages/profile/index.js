import styles from "./index.module.css";
import { useState, useEffect } from "react";

export const getServerSideProps = async () => {
  const res2 = await fetch("http://localhost:8080/host");
  const res3 = await fetch("http://localhost:8080/seek");
  const hosts = await res2.json();
  const seeks = await res3.json();
  if (!hosts || !seeks) {
    return {
      notFound: true,
    };
  }

  return { props: { hosts, seeks } };
};
function index(props) {
  const [seeked, setSeeked] = useState([]);
  const [hosted, setHosted] = useState([]);
  const [active, setActive] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
    }
  }, []);

  let hosts = props.hosts.data.filter(
    (host) => host.userId._id == currentUser._id
  );
  let seeks = props.seeks.data.filter(
    (seek) => seek.userId._id == currentUser._id
  );

  hosts?.forEach((host) =>
    !hosted.includes(host.tag) ? setHosted([...hosted, host.tag]) : null
  );
  seeks?.forEach((seek) =>
    !seeked.includes(seek.tag) ? setSeeked([...seeked, seek.tag]) : null
  );
  console.log(hosted, seeked);

  return (
    <div className={styles.Profile}>
      <div className={styles.Profile__Center}>
        <div className={styles.Profile__Center__Left}>
          <div className={styles.Profile__Center__Left__Top}>
            <img
              src={currentUser.img}
              alt="user-profile"
              width="150px"
              height="150px"
            />
          </div>
          <div className={styles.Profile__Center__Left__Bottom}>
            <h4>
              🤓 &nbsp; {currentUser.firstName} &nbsp;
              {currentUser.lastName}
            </h4>
            <h4>📱 {currentUser.phone}</h4>
            <h4>📧 {currentUser.email}</h4>

            <button>I want to help </button>
            <br />
            <button>I need some support</button>
            <br />
            <button>Logout</button>
          </div>
        </div>
        <div className={styles.Profile__Center__Right}>
          <div className={styles.Profile__Center__Right__Top}>
            <button
              onClick={() => setActive(true)}
              style={active ? { borderBottom: "2px solid #00838f" } : {}}
            >
              You asked for
            </button>
            <button
              onClick={() => setActive(false)}
              style={!active ? { borderBottom: "2px solid #00838f" } : {}}
            >
              You helped with
            </button>
          </div>
          <div className={styles.Profile__Center__Right__Bottom}>
            {active ? (
              <div>
                {" "}
                {seeked.length !== 0 ? (
                  seeked?.map((tag) => (
                    <button className={styles.Tags}>{tag}</button>
                  ))
                ) : (
                  <div>Nothing to show here</div>
                )}{" "}
              </div>
            ) : (
              <div>
                {" "}
                {hosted.length !== 0 ? (
                  hosted?.map((tag) => (
                    <button className={styles.Tags}>{tag}</button>
                  ))
                ) : (
                  <div>Nothing to show here</div>
                )}{" "}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;
