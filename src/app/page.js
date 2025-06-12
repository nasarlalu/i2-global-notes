"use client"
import styles from "./page.module.css";

export default function Home() {
  return (
    <section className={styles.home__section}>
      <h1>Welcome To the Notes App</h1>
      <p>
        This is a simple note-taking application built with Next.js and
        MongoDB.
      </p>
      <p>
        You can create, read, update, and delete notes easily. The app is
        designed to be user-friendly and efficient.
      </p>
      <p>
        Feel free to explore the features and functionalities.</p>
      <p>
        <strong>Happy Note-Taking!</strong>
      </p>
    </section>
  );
}
