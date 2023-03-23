import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Shop from "./Pages/Shop/Shop";
import { BrowserRouter, Link as ReactRouterLink } from "react-router-dom";
import { AppProvider, Frame } from "@shopify/polaris";
import Product from "./Pages/Product/Product";
import Customer from "./Pages/Customer/Customer";
import { TopBarMenu } from "./components/TopBarMenu";
import { Sidebar } from "./components/Sidebar";

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logo = {
    width: 124,
    topBarSource:
      "https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-color.svg?6215648040070010999",
  };

  return (
    <AppProvider linkComponent={Link}>
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
        <Routes>
          <>
            <Route path="/dashboard" element={<Shop />} />
            <Route path="/customer" element={<Customer />} />
            <Route path="/product" element={<Product />} />
          </>
        </Routes>
      </Frame>
    </AppProvider>
  );
};

const IS_EXTERNAL_LINK_REGEX = /^(?:[a-z][a-z\d+.-]*:|\/\/)/;

const Link = ({ children, url = "", external, ref, ...rest }) => {
  if (external || IS_EXTERNAL_LINK_REGEX.test(url)) {
    rest.target = "_blank";
    rest.rel = "noopener noreferrer";
    return (
      <a href={url} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <ReactRouterLink to={url} {...rest}>
      {children}
    </ReactRouterLink>
  );
};

export default App;
