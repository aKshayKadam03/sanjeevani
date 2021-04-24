import styles from "./discussion.module.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
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

  return { props: { ...props, users, hosts, comments } };
};

function discussion({ comments, host, seek, boardId, board }) {
  const [currentUser, setCurrentUser] = useState({});
  const [hostComment, setHostComment] = useState([]);
  useEffect(() => {
    setHostComment(comments.filter((comment) => comment.boardId == hostId));

    if (typeof window !== "undefined") {
      setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
    }
  }, []);

  //changing the hosts to seek so that we dont need different discussion module to generate for seeks
  //if it receives hosts, it shows hosts, if it get seek, it changes it to host and then shows

  const [comment, setComment] = useState("");

  const hostId = board === "host" ? host[0]._id : seek[0]._id;

  const sendComment = () => {
    let newComment = {
      comment: comment,
      board: board,
      boardId: boardId,
      userId: currentUser._id,
    };

    axios
      .post("http://localhost:8080/comment", newComment)
      .then((res) => {
        newComment = {
          ...newComment,
          userId: { ...currentUser },
        };
        console.log(newComment);
        setHostComment([...hostComment, newComment]);
      })
      .catch((err) => {
        console.log("error in request", err);
      });

    setComment("");
  };

  return (
    <div>
      <div className={styles.DiscussionForum}>
        <div className={styles.DiscussionForum__Title}>Discusion Forum</div>
        <div className={styles.DiscussionForum__Body}>
          {hostComment?.map((comment) => (
            <div className={styles.Comment} key={comment._id}>
              <div className={styles.Comment__Left}>
                <img
                  src={comment.userId.img}
                  alt="pic"
                  width="50px"
                  height="50px"
                />
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
          <button onClick={sendComment}>
            Send <i class="fab fa-telegram-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default discussion;
