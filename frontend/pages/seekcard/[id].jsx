import { useRouter } from "next/router";
import styles from "./card.module.css";
import { useDispatch } from "react-redux";
import { getUsers } from "../../redux/Auth/actions";
import { useEffect } from "react";

const user = () => {
  const dispatch = useDispatch();

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <div className={styles.card}>
      <h2>Seek</h2>
    </div>
  );
};

export default user;
