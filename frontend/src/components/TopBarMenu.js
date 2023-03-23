import { Avatar, TopBar } from "@shopify/polaris";
import { useContext, useState } from "react";
// import appContext from "../context/Createcontext";

export const TopBarMenu = () => {
  let shopName = sessionStorage.getItem("shopName");

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen((isMenuOpen) => !isMenuOpen);
  };

  return (
    <TopBar
      showNavigationToggle
      // onNavigationToggle={toggleMenu}
      userMenu={
        <TopBar.UserMenu
          actions={[
            {
              items: [{ content: "Sign out" }],
            },
          ]}
          name={"firstlucentapp"}
          initials={"F"}
          avatar={<Avatar customer size="medium" />}
        />
      }
    />
  );
};
