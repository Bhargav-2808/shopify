import { Navigation } from "@shopify/polaris";
import {
  HomeMinor,
  ProductsMinor,
  CustomersMajor,
} from "@shopify/polaris-icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
export const Sidebar = () => {
  const nav = useNavigate();
  const [select, setSelect] = useState("/dashboard");
  const navigationItems = [
    {
      label: "Home",
      url: "/dashboard",
      icon: HomeMinor,
    },
    {
      label: "Products",
      url: "/product",
      icon: ProductsMinor,
    },
    {
      label: "Customers",
      url: "/customer",
      icon: CustomersMajor,
    },
  ];

  // useEffect(() => {
  //   nav("/dashboard");
  // }, []);

  return (
    <Navigation location="/">
      {navigationItems.map((item) => (
        <Navigation.Item
          key={item.label}
          label={item.label}
          url={item.url}
          icon={item.icon}
          selected={select === item.url}
          onClick={() => {
            setSelect(item.url);
          }}
        />
      ))}
    </Navigation>
  );
};
