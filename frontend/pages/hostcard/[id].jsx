import { useRouter } from "next/router";
import styles from "./card.module.css";
import Discussion from "../../Components/discussion/discussion";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import { useEffect, useState } from "react";

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

const hostcard = (props) => {
  const router = useRouter();
  const { id } = router.query;
  const host = props.hosts.data.filter((user) => user._id == id);
  const user = host.userId;

  const comments = props.comments.data;

  const [link, setLink] = useState("");

  useEffect(() => {
    setLink(window.location.href);
  }, []);
  return (
    <>
      <div className={styles.card}>
        <div className={styles.userDetails}>
          <div className={styles.userDetails__Left}>
            <img
              src={host[0].userId.img}
              alt="user image"
              style={{ borderRadius: "100%" }}
            />
          </div>
          <div className={styles.userDetails__Right}>
            <h1>{host[0].title}</h1>
            <em>"{host[0].details}"</em>
            <br />
            <h4>
              Hi I am {host[0].userId.firstName} {host[0].userId.lastName}, from{" "}
              {host[0].city}
            </h4>
            <h4>I can help you with {host[0].tag}</h4>
            <h4>
              please contact with me on my email {host[0].userId.email} or call{" "}
              {host[0].userId.phone}
            </h4>
            <div>
              <a>
                Chat <i class="fas fa-comments"></i>
              </a>
              <a href={`mailto:${host[0].userId.email}`}>
                Email <i class="far fa-envelope"></i>
              </a>
              <a href={`tel:${host[0].userId.phone}`}>
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
        <Discussion comments={comments} host={host} boardId={id} board="host" />
      </div>
    </>
  );
};

export default hostcard;
