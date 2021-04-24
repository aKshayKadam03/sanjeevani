import { useRouter } from "next/router";
import styles from "./card.module.css";
import Discussion from "../../Components/discussion/discussion";
export const getServerSideProps = async () => {
  const res = await fetch("http://localhost:8080/user");
  const res2 = await fetch("http://localhost:8080/host");
  const res3 = await fetch("http://localhost:8080/comment");
  const users = await res.json();
  const hosts = await res2.json();
  const comments = await res3.json();
  if (!users || !hosts || !comments) {
    return {
      notFound: true,
    };
  }

  return { props: { users, hosts, comments } };
};

const user = (props) => {
  const router = useRouter();
  const { id } = router.query;

  const user = props.users.data.filter((user) => user._id == id);
  const host = props.hosts.data.filter((user) => user.userId._id == id);
  const comments = props.comments.data;
  return (
    <div className={styles.card}>
      <div className={styles.userDetails}>
        <div className={styles.userDetails__Left}>
          <img
            src={user[0].img}
            alt="user image"
            style={{ borderRadius: "100%" }}
          />
        </div>
        <div className={styles.userDetails__Right}>
          <h1>{host[0].title}</h1>
          <em>"{host[0].details}"</em>
          <br />
          <h4>
            Hi I am {user[0].firstName} {user[0].lastName}, from {host[0].city}
          </h4>
          <h4>I can help you with {host[0].tag}</h4>
          <h4>
            please contact with me on my email {user[0].email} or call{" "}
            {user[0].phone}
          </h4>
          <div>
            <button>Chat</button>
          </div>
        </div>
      </div>
      <Discussion comments={comments} host={host} />
    </div>
  );
};

export default user;
