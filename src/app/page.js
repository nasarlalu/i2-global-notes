"use client"
import styles from "./page.module.css";

export default function Home() {
  return (
    <main>
      <section className={styles.hero}>
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
          Feel free to explore the features and functionalities. If you have any
          questions or feedback, please reach out.
        </p>
        <p>
          <strong>Happy Note-Taking!</strong>
        </p>
      </section>
    </main>
  );
}
