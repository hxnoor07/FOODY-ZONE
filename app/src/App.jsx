import styled from "styled-components";
import "./App.css";
import { useEffect, useState } from "react";
import SearchResult from "./components/SearchResults/SearchResult";
export const BASE_URL = "http://localhost:9000";
function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  //to filter the data accd to search results
  const [filteredData, setFilteredData] = useState(null);
  //to filter the data accd to button
  const [selectedButton, setSelectedButton] = useState("all");
  const [error, setError] = useState(null);
  /*calling fetchFoodData() in function App() before return makes react do re-rendering again and again*/
  /*to prevent this,the function is called inside useEffect() hook
  useEffect hook-before running of browser/UI or before react draws the elements on the webpage,this function is run*/
  /*pehle data lao from server/backend,and uske baad UI build karo,agar pehle krdiya,
  toh sahi se render nhi hota*/
  //useEffect hook triggers the part inside this before the rendering of the web page,takes a callback function
  useEffect(() => {
    const fetchFoodData = async () => {
      setLoading(true);
      try {
        const response = await fetch(BASE_URL);
        const json = await response.json();
        setData(json);
        setFilteredData(json);
        setLoading(false);
      } catch (error) {
        setError("Unable to fetch data");
      }
    };
    fetchFoodData();
  }, []);
  //[]-dependency array passed,if null,then useEffect function triggered only once
  //fetchFoodData();
  const searchFood = (e) => {
    const searchVal = e.target.value;
    if (searchVal == "") {
      setFilteredData(null);
    }
    //filter()=to filter the data
    //include()=applied on strings to check whether strings/substrings match or not
    const filter = data?.filter((food) =>
      food.name.toLowerCase().includes(searchVal.toLowerCase())
    );
    setFilteredData(filter);
  };
  const FilterFood = (type) => {
    if (type == "All") {
      setFilteredData(data);
      setSelectedButton("All");
      return;
    }
    const filter = data?.filter((food) =>
      food.type.toLowerCase().includes(type.toLowerCase())
    );
    setFilteredData(filter);
    setSelectedButton(type);
  };
  const filterBtns = [
    {
      name: "All",
      type: "all",
    },
    {
      name: "Breakfast",
      type: "breakfast",
    },
    {
      name: "Lunch",
      type: "lunch",
    },
    {
      name: "Dinner",
      type: "dinner",
    },
  ];
  if (error) return <div>{error}</div>;
  if (loading) return <div>loading...</div>;
  return (
    <>
      <Container>
        <TopContainer>
          <div className="logo">
            <img src="/Foody Zone.svg" alt="logo" />
          </div>
          <div className="search">
            <input onChange={searchFood} placeholder="Search Food...." />
          </div>
        </TopContainer>
        <FilterContainer>
          {filterBtns.map((value) => (
            <Button
              isSelected={selectedButton === value.type}
              key={value.name}
              onClick={() => FilterFood(value.type)}
            >
              {value.name}
            </Button>
          ))}
        </FilterContainer>
      </Container>
      <SearchResult data={filteredData} />
    </>
  );
}

export const Button = styled.button`
  background: ${({ isSelected }) => (isSelected ? "#f22f2f" : "#ff4343")};
  outline: 1px solid ${({ isSelected }) => (isSelected ? "white" : "#ff4343")};
  border-radius: 5px;
  color: white;
  padding: 6px 12px;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #ed1d1d;
  }
`;
const FilterContainer = styled.section`
  padding-bottom: 30px;
  display: flex;
  gap: 14px;
  justify-content: center;
`;
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
const TopContainer = styled.section`
  display: flex;
  justify-content: space-between;
  height: 140px;
  padding:16px;
  align-items: center;
  .search {
    input {
      background-color: transparent;
      color: white;
      border: 1px solid #ff0909;
      padding: 11px 15px;
      height: 40px;
      width: 285px;
      font-size: 16px;
      border-radius: 5px;
      &::placeholder{
        color:white;
      }
    }
  }
  @media (0 < width< 600px) {
    flex-direction: column;
    height: 120px;
  }
`;
export default App;
