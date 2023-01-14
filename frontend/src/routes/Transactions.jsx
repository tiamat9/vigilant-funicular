import Navbar from "../components/Navbar";
import { useGlobalContext } from "../context";
import React from "react";

export default function Transactions() {
  const { state } = useGlobalContext();
  React.useEffect(() => {
    if (state.loading) return;
    if (!state.user) {
      window.location.href = "/";
    }
  }, [state.loading, state.user]);
  // const transactions = JSON.parse("../data/transactions.json");
  // console.log(transactions);
  return (
    <>
      <Navbar />
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>1</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Blue</td>
            </tr>
            <tr className="hover">
              <th>2</th>
              <td>Hart Hagerty</td>
              <td>Desktop Support Technician</td>
              <td>Purple</td>
            </tr>
            <tr>
              <th>3</th>
              <td>Brice Swyre</td>
              <td>Tax Accountant</td>
              <td>Red</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
