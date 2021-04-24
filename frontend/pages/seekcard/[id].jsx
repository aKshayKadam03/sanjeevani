import { useRouter } from "next/router";
import styles from "./card.module.css";
import Discussion from "../../Components/discussion/discussion";
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import { useEffect, useState } from "react";

export const getServerSideProps = async () => {
  const res = await fetch("http://localhost:8080/user");
  const res2 = await fetch("http://localhost:8080/seek");
  const res3 = await fetch("http://localhost:8080/comment");
  const users = await res.json();
  const seeks = await res2.json();
  const comments = await res3.json();
  if (!users || !seeks || !comments) {
    return {
      notFound: true,
    };
  }

  return { props: { users, seeks, comments } };
};

const seekcard = (props) => {
  const router = useRouter();
  const { id } = router.query;

  const seek = props.seeks.data.filter((user) => user._id == id);
  const comments = props.comments.data;
  console.log(seek, comments);

  const [link, setLink] = useState("");

  useEffect(() => {
    setLink(window.location.href);
  }, []);
  // console.log(window);
  return (
    <div className={styles.card}>
      <div className={styles.userDetails}>
        <div className={styles.userDetails__Left}>
          <img
            src={seek[0].userId.img}
            alt="user image"
            style={{ borderRadius: "100%" }}
          />
        </div>
        <div className={styles.userDetails__Right}>
          <h1>{seek[0].title}</h1>
          <em>"{seek[0].details}"</em>
          <br />
          <h4>
            Hi I am {seek[0].userId.firstName} {seek[0].userId.lastName}, from{" "}
            {seek[0].city}
          </h4>
          <h4>I can help you with {seek[0].tag}</h4>
          <h4>
            please contact with me on my email {seek[0].userId.email} or call{" "}
            {seek[0].userId.phone}
          </h4>

          <div>
            <a>
              Chat <i class="fas fa-comments"></i>
            </a>
            <a href={`mailto:${seek[0].userId.email}`}>
              Email <i class="far fa-envelope"></i>
            </a>
            <a href={`tel:${seek[0].userId.phone}`}>
              Call <i class="fas fa-phone-alt"></i>
            </a>
            <div>
              <FacebookShareButton url={link}>
                <FacebookIcon size={"2rem"} round={true} />
              </FacebookShareButton>
              <TwitterShareButton url={link}>
                <TwitterIcon size={"2rem"} round={true} />
              </TwitterShareButton>
              <WhatsappShareButton url={link}>
                <WhatsappIcon size={"2rem"} round={true} />
              </WhatsappShareButton>
            </div>
          </div>
        </div>
      </div>
      <Discussion comments={comments} seek={seek} boardId={id} board="seek" />
    </div>
  );
};

export default seekcard;
