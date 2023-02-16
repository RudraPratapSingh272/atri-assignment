import { useLayoutEffect, useEffect } from "react";
import useStore, { updateStoreStateFromController } from "../hooks/useStore";
import useIoStore from "../hooks/useIoStore";
import { useNavigate, useLocation } from "react-router-dom";
import { subscribeInternalNavigation } from "../utils/navigate";
import {fetchPageProps} from "../utils/fetchPageProps"
import { BarChart } from "@atrilabs/react-component-manifests/src/manifests/charts/BarChart/BarChart.tsx";
import { useBarChart1Cb } from "../page-cbs/Home";
import "../page-css/Home.css";
import "../custom/Home";

export default function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    const unsub = subscribeInternalNavigation((url) => {
      navigate(url);
    });
    return unsub;
  }, [navigate]);

  const location = useLocation();
  useLayoutEffect(()=>{
    fetchPageProps(location.pathname, location.search).then((res)=>{
      updateStoreStateFromController(res.pageName, res.pageState)
    })
  }, [location])

  const BarChart1Props = useStore((state)=>state["Home"]["BarChart1"]);
const BarChart1IoProps = useIoStore((state)=>state["Home"]["BarChart1"]);
const BarChart1Cb = useBarChart1Cb()

  return (<>
  <BarChart className="p-Home BarChart1 bpt" {...BarChart1Props} {...BarChart1Cb} {...BarChart1IoProps}/>
  </>);
}
