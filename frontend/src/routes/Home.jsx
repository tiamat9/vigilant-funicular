import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ScrollContainer,
  ScrollPage,
  Animator,
  batch,
  Fade,
  FadeIn,
  FadeOut,
  Move,
  MoveIn,
  MoveOut,
  Sticky,
  StickyIn,
  StickyOut,
  Zoom,
  ZoomIn,
  ZoomOut,
} from "react-scroll-motion";

import Navbar from "../components/Navbar";
import Count from "../components/Count";
import Summary from "../components/LineChartData";

import LineChart from "../components/LineChart";

import transactionsData from "../../data/transactions.json";
import { useGlobalContext } from "../context";

function Shrink() {
  return "ease-in-out scale:0.75";
}

function handleDay() {
  setDay(day);
}

function avatar() {
  window.state = state;
  const ava = window.state.user.avatar;
  return ava;
}

export default function Home() {
  const {
    state: { transactions },
  } = useGlobalContext();
  const { state } = useGlobalContext();
  const [balance, setBalance] = useState("69,420");
  const [total, setTotal] = useState(0);
  const [dollars, setDollars] = useState(0);
  const [cents, setCents] = useState(0);

  useEffect(() => {
    let total = 0;
    transactions.forEach((transaction) => {
      total += transaction.amount;
    });
    setTotal(total);
  }, [transactions]);

  const [formData, setFormData] = useState({
    day: "",
    week: "",
    month: "",
  });

  const [recommended, setRecommended] = useState({
    perDay: "",
    perWeek: "",
    perMonth: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    switch (true) {
      case e.target.name === "day":
        setRecommended({
          perDay: e.target.value,
          perWeek: (e.target.value * 7).toFixed(2),
          perMonth: (e.target.value * 31).toFixed(2),
        });
        break;
      case e.target.name === "week":
        setRecommended({
          perDay: (e.target.value / 7).toFixed(2),
          perWeek: e.target.value,
          perMonth: (e.target.value * 4.34524).toFixed(2),
        });
        break;
      case e.target.name === "month":
        setRecommended({
          perDay: (e.target.value / 31).toFixed(2),
          perWeek: (e.target.value / 4.34524).toFixed(2),
          perMonth: e.target.value,
        });
        break;
    }
  };

  let money = String(balance).split(".");
  useEffect(() => {
    if (money[0] != undefined) {
      setDollars(money[0]);
    }
    if (money[1] != undefined) {
      setCents(money[1]);
    }
  }, [money]);

  const transaction_route = async () => {
    try {
      window.location.href = "/transactions";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar onClick={transaction_route} />
      <Animator animation={batch(Fade(0, 1))}>
        <div className="flex-col mb-5">
          <div className="relative flex items-center justify-center min-h-fit">
            <img
              className="absolute m-10 w-60 transition ease-in-out hover:scale-105 top-1 shadow-2xl z-50 rounded-full place-items-center outline outline-4 outline-offset-4 outline-green-600"
              src={state?.user?.avatar}
            />
          </div>
          <div className="flex items-center justify-center min-h-fit mt-60">
            <div className="p-10 px-20 shadow-2xl z-0 rounded-lg bg-green-600 text-center text-white">
              <p className="stat-title pt-5 text-5xl text-white">
                Total this week{" "}
              </p>
              <p className="stat-value pt-2 text-9xl text-white">${total.toFixed(2)}</p>
              <p className="stat-desc pt-3 text-2xl text-white">
                {/* 21% more than last month */}
              </p>
            </div>
          </div>
        </div>
      </Animator>
      <Summary />
      <ScrollPage>
        <h1 id="spendingHabits">Spending Habits</h1>
        <h1>Set Spending Goals!</h1>
        <form className="flex-col">
          <label className="flex">
            Total per Day
            <input
              className="flex"
              type="number"
              name="day"
              placeholder={"Rec $" + recommended.perDay}
              onChange={handleChange}
            />
          </label>
          <label className="flex">
            Total per Week
            <input
              className="flex"
              type="number"
              name="week"
              placeholder={"Rec $" + recommended.perWeek}
              onChange={handleChange}
            />
          </label>
          <label className="flex">
            Total per Month
            <input
              className="flex"
              type="number"
              name="month"
              placeholder={"Rec $" + recommended.perMonth}
              onChange={handleChange}
            />
          </label>
        </form>
      </ScrollPage>
      {/* </ScrollContainer> */}
    </>
  );
}
