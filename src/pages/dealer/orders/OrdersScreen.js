import React, { useState } from "react";
import Cart from "../../../components/dealer/orders/Cart";
import CartPackaging from "../../../components/dealer/orders/CartPackaging";
import CheckOut from "../../../components/dealer/orders/CheckOut";
import Orders from "./Orders";
import {
  getServiceType
} from "../../../common/utils/Utilities";
import OrderPackaging from "./OrderPackaging";
const OrdersScreen = () => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const renderScreen = () => {
    if (currentScreen === 0) {
      if(getServiceType() === "packaging"){
        return <OrderPackaging next={nextPage} />;
      }else{
        return <Orders next={nextPage} />;
      }
    } else if (currentScreen === 1) {
      if(getServiceType() === "packaging"){
        return (
          <CartPackaging setScreen={setScreen} next={nextPage} previous={previousPage} />
        );
      }else{
        return (
          <Cart setScreen={setScreen} next={nextPage} previous={previousPage} />
        );
      }
    } else if (currentScreen === 2) {
      return <CheckOut setScreen={setScreen} previous={previousPage} />;
    }
  };
  const setScreen = (props) => {
    console.log(props,'running')
    setCurrentScreen(props);
  };
  const nextPage = () => {
    setCurrentScreen(currentScreen + 1);
  };
  const previousPage = () => {
    setCurrentScreen(currentScreen - 1);
  };
  return <>{renderScreen()}</>;
};

export default OrdersScreen;
