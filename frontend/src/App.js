import { useState } from "react";
import { Frame } from "@shopify/polaris";
import { TopBarMenu } from "./components/TopBarMenu";
import { Sidebar } from "./components/Sidebar";
import { logo } from "./helper/helper";
import Routes from "./Routes";

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Frame
      logo={logo}
      topBar={TopBarMenu()}
      navigation={Sidebar()}
      // showMobileNavigation={isMenuOpen}
      // onNavigationDismiss={toggleMenu}
      skipToContentTarget={
        <div className="Polaris-VisuallyHidden">Content</div>
      }
    >
      <Routes />
    </Frame>
  );
};

export default App;
