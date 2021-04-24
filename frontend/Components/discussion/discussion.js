import styles from "./discussion.module.css";
import { useState } from "react";

function discussion({ comments, host }) {
  const [comment, setComment] = useState("");
  const sendComment = () => {
    console.log(comment);
    setComment("");
  };
  const hostId = host[0]._id;
  const hostComment = comments.filter((comment) => comment.boardId == hostId);

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
