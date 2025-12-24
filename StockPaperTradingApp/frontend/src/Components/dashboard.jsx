import React, { useContext, useEffect, useState } from "react";
import Header from "./Header/header.jsx";
import Home from "./home.jsx";
import Holding from "./holding.jsx";
import Activity from "./activity.jsx";
import Trending from "./trending.jsx";
import Loading from "./loading.jsx"
import StockInformationPage from "./stockpage.jsx";
import GlobalContext from "../ContextWrapper.js";
import { useNavigate } from "react-router-dom";
import BuySellModal from "./buySellModal.jsx";

export default function Dashboard() {
  const {
    setUser,
    user,
    setHolding,
    setActivity,
    setDashboardData,
    setTrending,
    sides,
    pages,
    page,
    setPage,
    stockSymbol,
    setStockSymbol,
  } = useContext(GlobalContext);

  const [openModal, setOpenModal] = useState(false)
  const [side, setSide] = useState(sides.buy)
  const [loadingErrorMessage, setLoadingErrorMessage] = useState("")
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      LoginWithToken()
    }else{
      GetAllData()
    }
  }, []);

  function displayModal(stock, side) {
    setOpenModal(true)
    setStockSymbol(stock)
    setSide(side)
  }

  async function LoginWithToken() {
    await fetch("/stockpapertrading/auth/loginAuthToken", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(response => {
        if (!response.ok){
          navigate("/login"); 
        }
        return response.json()
      })
      .then(async (result) => {
        setUser(result.user);
        if (await GetAllData()) {
          setPage(pages.home)
        }
      })
      .catch(() => {
        navigate("/login");
      });
  }

  async function GetAllData() {
    let url = "/stockpapertrading/api/getAllData";
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      var result = await response.json();
      setUser(result.user)
      setActivity(result.activities === null ? [] : result.activities);
      setHolding(result.holdings === null ? [] : result.holdings);
      setTrending(result.trending);
      if (result.dashboard.performaceGraph.netWorthList === null) {
        result.dashboard.performaceGraph.netWorthList = []
      }
      setDashboardData(result.dashboard);
      setPage(pages.home)
    }else{
      setLoadingErrorMessage("Something went wrong (probably ran out of API requests for stock information)")
      setPage(pages.loading)
    }
  }

  return (
    <div className="h-screen dark">
      {page === pages.loading && <Loading errorMessage={loadingErrorMessage} />}
      {page !== pages.loading && <Header />}
      {page === pages.home && <Home />}
      {page === pages.holding && <Holding displayModal={displayModal} />}
      {page === pages.activity && <Activity />}
      {page === pages.trending && <Trending />}
      {page === pages.stockPage && <StockInformationPage displayModal={displayModal} />}
      <BuySellModal shouldOpen={openModal} setShouldOpen={setOpenModal} side={side} setSide={setSide} getAllData={GetAllData} />
    </div>
  );
}
