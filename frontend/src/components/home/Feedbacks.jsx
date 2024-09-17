import styled from "styled-components";
import { useEffect, useState } from "react";
// import * as Icon from "react-bootstrap-icons";
// import { mobile } from "../../responsive";
import axios from "axios";
import {
  PersonCircle,
  StarFill,
} from "react-bootstrap-icons";

const Container = styled.div`
  margin-top: 30px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  /* flex-wrap: wrap; */
  justify-content: space-between;
`;

const RHeader = styled.div`
  display: flex;
  align-items: center;
`;
const Rating = styled.div`
  display: flex;
  margin-top: 0;
  margin-left: 15px;
  width: 60px;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
  color: white;
  background-color: #0f7f0f;
  border-radius: 20px;
`;
const Reviewer = styled.div`
  display: flex;
  align-items: center;
  font-size: 1rem;
  font-weight: 600;
  gap: 0.5rem;
  text-decoration: underline;
`;
const Reviews = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 80%;
  background-color: lightgray;
  border-radius: 0 50px 0 50px;
  padding: 15px;
  margin-top: 15px;
  gap: 1rem;
  /* align-items: center; */
  justify-content: center;
`;

const Comment = styled.div`
  display: flex;
  align-items: center;
  color: black;
  font-size: 1rem;
  margin: 0 10px 10px 0;
  gap: 0.5rem;
`;
const Feedbacks = () => {
  const [feeds, setFeeds] = useState([]);
  const prod_id = localStorage.getItem("prod_id");
  // console.log(prod_id)

  if(prod_id != undefined){
    useEffect(() => {
      async function getFeedbacks() {
        try {
          const feedback = await axios.get(`/api/feedback/${prod_id}`);
          setFeeds(feedback.data);
          // console.log(feedback);
        } catch (error) {
          console.log(error);
        }
      }
      getFeedbacks();
    }, [prod_id, feeds]);
  }
  // console.log(feeds);
  var show_feeds;
  if (feeds.length > 0) {
    show_feeds = (
      <Container>
        <RHeader>
          <h3>Ratings & Reviews:</h3>
          <Rating>
            {feeds.map((feed) => feed.rating)} <StarFill />
          </Rating>
          <h5 style={{ marginLeft: "10px", color: "gray" }}>
            ({feeds.length} Reviews)
          </h5>
        </RHeader>
        {feeds.map((feed) => (
          <Reviews>
            <Reviewer>
              <PersonCircle /> Anonymous User
            </Reviewer>

            <Comment>
              <Rating>
                {feed.rating} <StarFill />
              </Rating>
              {feed.comment}
            </Comment>
          </Reviews>
        ))}
      </Container>
    );
  }
  else{
    var no_feeds;
    no_feeds = (
      <Container>
        <RHeader>
          <h3>Ratings & Reviews:</h3>
          <h5 style={{ marginLeft: "10px", color: "gray" }}>
            ({feeds.length} Reviews)
          </h5>
        </RHeader>
      </Container>
    );
  }
  return(
    <>
    {no_feeds}
    {show_feeds}
    </>
  );
};

export default Feedbacks;
