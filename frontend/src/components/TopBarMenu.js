import { TopBar, Frame } from "@shopify/polaris";
import { useCallback } from "react";
import "../../src/style.css";

const TopBarMenu = () => {
  const shopName = sessionStorage.getItem("shopName");
  const handleNavigationToggle = useCallback(() => {
    console.log("toggle navigation visibility");
  }, []);

  const userMenuMarkup = (
    <TopBar.UserMenu
      name={shopName.toUpperCase()}
      initials={shopName[0].toUpperCase()}
    />
  );

  const topBarMarkup = (
    <TopBar
      showNavigationToggle
      userMenu={userMenuMarkup}
      onNavigationToggle={handleNavigationToggle}
    />
  );

  return (
    <div>
      <Frame topBar={topBarMarkup} />
    </div>
  );
};
export default TopBarMenu;
