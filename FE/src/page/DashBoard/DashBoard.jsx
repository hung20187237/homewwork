import { DatePicker } from "antd";
import "antd/dist/antd.css";
import React from "react";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

import DetailCard from "../../Component/DetailCard/DetailCard";
import Sidebar from "../../Component/Sidebar/Sidebar";
import Topbar from "../../Component/Topbar/Topbar";
import { Context } from "../../context/Context";
import "./DashBoard.css";

export default function DashBoard() {
  const { user } = useContext(Context);
  const username = user.username;
  const [posts, setPosts] = useState([]);
  const [data, setData] = useState([]);
  const monthFormat = "YYYY/MM";
  const HOST = process.env.REACT_APP_LOCALHOST;

  const disabledDate = (current) => {
    return current && current > moment().endOf("day");
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(`${HOST}/api/post/allposts/` + username);

      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
      setData(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [username]);

  const filterDateResult = (x) => {
    const startdate = moment(x).startOf("month").format();
    const enddate = moment(x).endOf("month").format();
    console.log(startdate, enddate);
    const result = posts.filter((curDate) => {
      return curDate.createdAt > startdate && curDate.createdAt < enddate;
    });
    console.log(result);
    setData(result);
  };
  return (
    <>
      <Topbar />
      <div className="home-container">
        <Sidebar />
        <div className="body-dashboard">
          <div className="dashboard-time">
            <DatePicker
              onChange={(x) => {
                filterDateResult(x);
              }}
              picker="month"
              format={monthFormat}
              disabledDate={disabledDate}
            />
            <button onClick={() => setData(posts)}>Clear</button>
          </div>
          <DetailCard />
          <div className="body-activity">
            <span className="dashboard-account-title"> Activity</span>
            <div className="activity-container">
              {data.map((post) => (
                <div className="activity-container-item">
                  <span>
                    {post.accountname} {post.status} the post.{" "}
                    {moment(post.createdAt).format("L")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
