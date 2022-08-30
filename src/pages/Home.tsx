import { useState, useEffect, useRef } from "react";
import { setHeaderTitle } from "@/lib/helpers";
import web_state from "@/assets/images/web_state.png";
import { getData } from "@/lib/services";
import moment from "moment";
import { Pie } from "@antv/g2plot";
import { InfoCard } from "@/components/dashboard";
import { CalendarOutlined, UndoOutlined } from "@ant-design/icons";
import { DashboardFilter } from "@/components/dashboard";
import { useCommon } from "@/hooks";
import { Row, Col } from "antd";
import _ from "lodash";
import Cookies from "js-cookie";
import { DATE_FORMMAT } from "@/lib/constants";
import { AiOutlineClose } from "react-icons/ai";

const defaultFilterOption = {
  startDate: moment(new Date()).format(DATE_FORMMAT),
  endDate: moment(new Date()).format(DATE_FORMMAT),
  selectedDateValue: moment(new Date()).format(DATE_FORMMAT),
  label: "Seleted Date",
  value: moment(new Date()).format(DATE_FORMMAT),
  filter_type: "selectedDate",
  is_submit: false,
};
const Home = () => {
  const name = Cookies.get("name" || "");
  var hour = new Date().getHours();
  const [dashboardData, setDashboardData] = useState<any>();
  const { isModalVisible, toggleModalVisible } = useCommon();
  const [filterOption, setFilterOption] = useState(defaultFilterOption);
  const [showGreetings, setShowGreetings] = useState(!Cookies.get("s_g"));

  const onSelectFilter = (selectedOption: any) => {
    setFilterOption(selectedOption);
    if (selectedOption.is_submit) {
      toggleModalVisible();
    }
  };

  const resetFilter = () => {
    setFilterOption(defaultFilterOption);
  };

  const pieRef = useRef<any>(null);

  const toogleShowGreeting = () => {
    setShowGreetings(!showGreetings);
    Cookies.set("s_g", "1");
  };

  useEffect(() => {
    if (pieRef.current && dashboardData) {
      pieRef.current.innerHTML = "";
      const piePlot = new Pie("pieContainer", {
        appendPadding: 10,
        data: dashboardData?.reasons_count || [],
        autoFit: true,
        // width: 400,
        // height: 400,
        // legend: false,
        legend: {
          layout: "horizontal",
          position: "bottom",
          maxRow: 20,
          flipPage: false,
          itemWidth: 150,
          radio: undefined,
          offsetY: -20,
        },
        angleField: "value",
        colorField: "type",
        radius: 0.8,
        label: false,
        // label: {
        //   type: "outer",
        //   content: "{name} {percentage}",
        // },
        // interactions: [
        //   { type: "pie-legend-active" },
        //   { type: "element-active" },
        // ],
      });
      piePlot.render();
    }
  }, [dashboardData]);

  useEffect(() => {
    getDashboardDetails();
  }, [filterOption]);

  const getDashboardDetails = async () => {
    const response = await getData("dashboard/statistics", {
      start_date: filterOption?.startDate,
      end_date: filterOption?.endDate,
    });
    if (response.success) {
      setDashboardData(response.data);
    } else {
      console.log("Something went wrong");
    }
  };

  setHeaderTitle("dashboard");

  return (
    <div className="mt-6">
      {showGreetings && (
        <div className="flex justify-between bg-gradient-to-r from-cyan-400 to-sky-700 p-6 rounded shadow relative">
          <div className="flex flex-col justify-center gap-1">
            <h1 className="text-2xl text-gray-200 ">Welcome to Dashboard</h1>
            <h2 className="text-xl text-gray-700">
              {"Good " +
                ((hour < 12 && "Morning!!") ||
                  (hour < 18 && "Afternoon!!") ||
                  "Evening!!")}
              <span className="font-semibold pl-1">{name}</span>
            </h2>
            <p className="text-sm text-gray-600">
              Here is what's happening with your projects today.
            </p>
          </div>
          <div>
            <img src={web_state} alt="dashboard statistics" className="h-24" />
          </div>
          <button
            className="absolute right-2 top-2"
            onClick={toogleShowGreeting}
          >
            <AiOutlineClose
              className="text-gray-300"
              style={{ fontSize: "20px" }}
            />
          </button>
        </div>
      )}

      <div className="my-6">
        <Row>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 24 }}
            lg={{ span: 24 }}
            xl={{ span: 10 }}
            xxl={{ span: 10 }}
          >
            {/* <div className="flex items-center justify-between  gap-4">
              <div className="tabs">
                <button className="w-40 text-base m-1 p-4 bg-cyan-600">
                  All
                </button>
                <button className="w-40 text-sm m-1 p-2 border-2 border-cyan-600">
                  OTC Customers
                </button>
                <button className="w-40 text-base m-1 p-4 border-2 border-cyan-600">
                  Wallet Users
                </button>
                <button className="w-40 text-base m-1 p-4 border-2 border-cyan-600">
                  Business User
                </button>
              </div>
            </div> */}
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 24 }}
            lg={{ span: 24 }}
            xl={{ span: 14 }}
            xxl={{ span: 14 }}
          >
            <div className="flex justify-end items-center cursor-pointer">
              <div
                className="flex justify-between items-center m-1 px-2 border-2 border-cyan-600"
                onClick={toggleModalVisible}
              >
                <div className="flex flex-col text-base mr-2 px-1.5 py-0.5">
                  <span className="text-xs">{filterOption.label}</span>
                  <span className="text-xs">{filterOption.value}</span>
                </div>
                <CalendarOutlined style={{ fontSize: "20px" }} />
              </div>
              <div
                className="w-32 flex justify-between text-base ml-1 p-2 border-2 border-cyan-600 "
                onClick={resetFilter}
              >
                <span className="text-sm">Reset</span>
                <UndoOutlined style={{ fontSize: "20px" }} rotate={0} />
              </div>
            </div>
          </Col>
        </Row>
      </div>

      <div className="my-8">
        <Row gutter={[24, 24]}>
          {dashboardData?.summary?.map((item: any) => (
            <Col
              xs={{ span: 24 }}
              sm={{ span: 12 }}
              md={{ span: 12 }}
              lg={{ span: 8 }}
              xl={{ span: 6 }}
              xxl={{ span: 6 }}
              key={item.id}
            >
              <InfoCard
                title={item.title}
                count={item.count}
                type={item.filter_key}
                start_date={filterOption?.startDate}
                end_date={filterOption?.endDate}
              />
            </Col>
          ))}
        </Row>
      </div>

      <div className="bg-white rounded shadow py-10  px-24">
        <h2 className="text-2xl font-medium text-center text-sky-800">
          Rejection Reasons
        </h2>
        {dashboardData && (
          <div id="pieContainer" ref={pieRef} style={{ height: "450px" }}></div>
        )}
      </div>
      {isModalVisible && (
        <DashboardFilter
          filterOption={filterOption}
          onSelectFilter={onSelectFilter}
          isModalVisible={isModalVisible}
          toggleModalVisible={toggleModalVisible}
        />
      )}
    </div>
  );
};

export default Home;
