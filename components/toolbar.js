import { useRouter } from "next/router";
import styles from "../styles/Toolbar.module.css";

export default function Toolbar() {
  const router = useRouter();

  return (
    <div className={styles.main}>
      <div onClick={() => router.push("/")}>Home</div>
      <div onClick={() => router.push("/eotm")}>EOTM</div>
      <div onClick={() => router.push("/news/1")}>News</div>
      <div onClick={() => router.push("/tech/1")}>Technology</div>
    </div>
  );
}
