import React, { useEffect } from "react";
import CategoryList from "../components/CategoryList";
import BannerProduct from "../components/BannerProduct";
import VerticalCardProduct from "../components/VerticalCardProduct";
import { useDispatch, useSelector } from "react-redux";
import { GetCategoryHome } from "../store/home/getCategiry";
import { setReload } from "../store/staff/EditProduct";

const Home = () => {
  const dispatch = useDispatch()
  const data = useSelector(state => state.getCategory.data)
  useEffect(() => {
    dispatch(GetCategoryHome())
  }, [dispatch])
  return (
    <div>
      <CategoryList />
      <BannerProduct />
      {Array(data) && data.map((item, index) => {
        return (
          <VerticalCardProduct category={item.category} heading={item.header} key={index} />
        )
      })}
    </div>
  );
};

export default Home;
