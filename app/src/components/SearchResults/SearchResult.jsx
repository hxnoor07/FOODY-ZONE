import styled from "styled-components";
import { BASE_URL, Button } from "../../App";
const SearchResult = ({ data: foods }) => {
  //data props set to foods using :
  /*?=agr data nhi hai toh null return karo
  otherwise use array map method and return data,if array is available*/
  return (
    <FoodCardContainer>
      <FoodCards>
        {foods?.map(({ name, image, text, price }) => (
          <FoodCard key={name}>
            <div className="food_image">
              <img src={BASE_URL + image} />
              {/*food.image is pointing to localhost:5173 but the image is on localhost:9000
              so,the base_url has to be exported and given so that img taken directly from backend
              and triggered*/}
            </div>
            <div className="food_info">
              <div className="info">
                <h3>{name}</h3>
                <p>{text}</p>
              </div>
              {/*toFixed(2)=no. of digits after the decimal point*/}
              <Button>${price.toFixed(2)}</Button>
            </div>
          </FoodCard>
        ))}
      </FoodCards>
    </FoodCardContainer>
  );
};
const FoodCard = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap");
  .food_info {
    display: flex;
    flex-direction: column;
    align-items: end;
    justify-content: space-between;
    h3 {
      margin-top: 8px;
      font-family: "Inter", sans-serif;
      font-size: 16px;
      font-weight: 500;
    }
    p {
      margin-top: 6px;
      font-weight: 100;
      font-size: 13px;
      font-family: "Inter", sans-serif;
      color: #e3e3e3;
    }
    button {
      font-size: 14px;
    }
  }
  padding: 13px;
  display: flex;
  width: 340px;
  height: 167px;
  border: 0.66px solid;

  border-image-source: radial-gradient(
      80.69% 208.78% at 108.28% 112.58%,
      #eabfff 0%,
      rgba(135, 38, 183, 0) 100%
    ),
    radial-gradient(
      80.38% 222.5% at -13.75% -12.36%,
      #98f9ff 0%,
      rgba(255, 255, 255, 0) 100%
    );
  background: url(.png),
    radial-gradient(
      90.16% 143.01% at 15.32% 21.04%,
      rgba(165, 239, 255, 0.2) 0%,
      rgba(110, 191, 244, 0.044) 77.08%,
      rgba(70, 144, 213, 0) 100%
    );
  background-blend-mode: overlay, normal;
  backdrop-filter: blur(13.1842px);
  border-radius: 20px;
`;
const FoodCards = styled.div`
  max-width: 1200px;
  row-gap: 32px;
  padding-top: 80px;
  align-items: center;
  column-gap: 20px;
  justify-content: center;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
`;
const FoodCardContainer = styled.section`
  background-image: url("/backg.png");
  min-height: calc(100vh - 200px);
  background-size: cover;
`;
export default SearchResult;
