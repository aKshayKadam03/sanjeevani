import styles from "./discussion.module.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
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

function discussion({ comments, host, seek }) {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
    }
  }, []);

  //changing the hosts to seek so that we dont need different discussion module to generate for seeks
  //if it receives hosts, it shows hosts, if it get seek, it changes it to host and then shows
  if (host === undefined) {
    host = seek;
  }
  const [comment, setComment] = useState("");
  const sendComment = () => {
    console.log(comment);
    setComment("");
  };
  const hostId = host[0]._id;
  const hostComment = comments.filter((comment) => comment.boardId == hostId);
  console.log("currentUser", currentUser);
  return (
    <div>
      <div className={styles.DiscussionForum}>
        <div className={styles.DiscussionForum__Title}>Discusion Forum</div>
        <div className={styles.DiscussionForum__Body}>
          {hostComment?.map((comment) => (
            <div className={styles.Comment} key={comment._id}>
              <div className={styles.Comment__Left}>
                <img src={comment.userId.img} alt="pic" width="50px" />
              </div>
              <div className={styles.Comment__Right}>
                <h4>
                  {comment.userId.firstName} {comment.userId.lastName}
                </h4>
                <p>{comment.comment}</p>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.DiscussionForum__Input}>
          <input
            type="text"
            placeholder="Enter your comment"
            value={comment}
            onChange={(e) => {
              e.preventDefault();
              setComment(e.target.value);
            }}
          />
          <button onClick={sendComment}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default discussion;
