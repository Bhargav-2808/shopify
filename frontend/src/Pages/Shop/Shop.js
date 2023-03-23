import { Page, Text } from "@shopify/polaris";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Shop = () => {
  let { search } = useLocation();
  const [searchParams, setSearchParams] = useState();

  const query = new URLSearchParams(search);

  const [shopName, setShopName] = useState("");
  useEffect(() => {
    if (query.get("token")) {
      setSearchParams(query.get("token"));
      sessionStorage.setItem("token", query.get("token"));
      window.location.href = "http://localhost:3000/";
    }
  }, [searchParams]);

  console.log(search ,"jhsjhj" );

  return (
    <>
      <Page title="Welcome to Dashboard">
        
      </Page>
    </>
  );
};

export default Shop;
