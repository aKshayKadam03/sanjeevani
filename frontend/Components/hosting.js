import React, { useState } from "react";
import styles from "../styles/navbar.module.css";
import { useRouter } from "next/router";

function hosts({ cards }) {
  let k = cards;
  const router = useRouter();
  return (
    <div>
      {k?.map((i) => (
        <div className={styles.SeekCard} key={i._id}>
          <div>
            <img src={i.userId.img} alt="hi" />
          </div>
          <div className={styles.SeekCardDetails}>
            <div>
              <h4>
                <button className={styles.HaveButton}>Have</button> {i.title}
              </h4>
            </div>
            <div>
              <p>{i.details}</p>
            </div>
            <div>
              <div>
                <h4>
                  {i.userId.firstName} {i.userId.lastName}
                </h4>
              </div>
              <div>
                <h4>Location : {i.city}</h4>
              </div>
            </div>
          </div>
          <button
            className={styles.PledgeButton}
            onClick={() => {
              router.push(`/hostcard/${i._id}`);
            }}
            className={styles.PledgeButton}
          >
            <i className="fas fa-hands"></i> Pledge
          </button>
        </div>
      ))}
    </div>
  );
}

export default hosts;
