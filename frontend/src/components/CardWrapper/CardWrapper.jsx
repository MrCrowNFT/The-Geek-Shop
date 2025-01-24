import ProductCard from "../ProductCard/ProductCard";
import Arrow from "../../assets/icons/arrow.png"

//the idea would be for it to recieve an array of products, deconstruct them and pass
//them on to every Product Card
const CardWrapper = () => {
  return (
    <div className="card-wrapper">
        <div className="upper-card-wrapper">
            <ProductCard></ProductCard>
            <ProductCard></ProductCard>
            <ProductCard></ProductCard>
            <ProductCard></ProductCard>
            <ProductCard></ProductCard>
        </div>
        <div className="lower-card-wrapper">
            <ProductCard></ProductCard>
            <ProductCard></ProductCard>
            <ProductCard></ProductCard>
            <ProductCard></ProductCard>
            <div className="more-tab">
                <a href="">
                    More
                    <img src={Arrow} alt="See more" />
                </a>
            </div>
        </div>
    </div>
  );
};

export default CardWrapper;
