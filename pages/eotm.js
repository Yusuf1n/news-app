import Image from "next/image";
import Toolbar from "../components/toolbar";
import img from "../public/Me.jpg";
import styles from "../styles/EOTM.module.css";

export default function EOTM({ employee }) {
  console.log(employee);
  return (
    <div className="page-container">
      <Toolbar />
      <div className={styles.main}>
        <h1>Employee of the month</h1>

        <div className={styles.employeeOfTheMonth}>
          <h3>{employee.name}</h3>
          <h6>{employee.position}</h6>
          {/* <img src={employee.image} /> */}
          <Image src={img} width="280" height="280" />
          <p>{employee.description}</p>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const response = await fetch("http://localhost:4000/employeeOfTheMonth");
  const data = await response.json();

  return {
    props: {
      employee: data,
    },
  };
}
