import React, { useEffect } from "react";
import CategoryList from "../components/CategoryList";
import BannerProduct from "../components/BannerProduct";
import HorizontalCardProduct from "../components/HorizontalCardProduct";
import VerticalCardProduct from "../components/VerticalCardProduct";
import { useDispatch, useSelector } from "react-redux";
import { GetCategoryHome } from "../store/home/getCategiry";

const Home = () => {

  const dispatch = useDispatch()

  const data = useSelector(state => state.getCategory.data)

  useEffect(() => {
    dispatch(GetCategoryHome())
  }, [dispatch])
console.log(data);

  return (
    <div>
      <CategoryList />
      <BannerProduct />

      {/* <HorizontalCardProduct category={'airpodes'} heading={"Top's Airpodes"} />
      <HorizontalCardProduct category={"watches"} heading={"Popular's Watches"} /> */}
      {/* <HorizontalCardProduct category={"mouse"} heading={"Mouse"}/> */}
      {/* 
      <VerticalCardProduct category={"refrigerator"} heading={"Refrigerator"} />
      <VerticalCardProduct category={"mobiles"} heading={"Mobiles"} />
      <VerticalCardProduct category={"televisions"} heading={"Televisions"} />
      <VerticalCardProduct category={"camera"} heading={"Camera & Photography"} />
      <VerticalCardProduct category={"earphones"} heading={"Wired Earphones"} />
      <VerticalCardProduct category={"speakers"} heading={"Bluetooth Speakers"} />
      <VerticalCardProduct category={"refrigerator"} heading={"Refrigerator"} />
      <VerticalCardProduct category={"trimmers"} heading={"Trimmers"} /> */}
      {Array(data) && data.map((item, index) => {
        return (
          <VerticalCardProduct category={item.category} heading={item.header} key={index} />
        )
      })}
    </div>
  );
};

export default Home;
