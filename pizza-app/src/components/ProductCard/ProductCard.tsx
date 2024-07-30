
import { Link } from "react-router-dom";
import styles from "./ProductCard.module.css";
import { ProductCardProps } from "./ProductCard.props";
function ProductCard(props: ProductCardProps){
	return (
		<Link to={`/product/${props.id}`} className={styles["link"]}>
			<div className={styles["card"]}>
				<div className={styles["head"]} style={{ backgroundImage: `url('${props.img}')` }}>
					<div className={styles["price"]}>
						{props.price}
						<span className={styles["currency"]}>&nbsp;₽</span>
					</div>
					<button className={styles["add-to-cart"]}>
						<img src="/cart-button-icon.svg" alt='Add to cart'></img>
					</button>
					<div className={styles["rating"]}>
						{props.rating}&nbsp;
						<img src="star-icon.svg" alt="rating icon"></img>
					</div>
				</div>
				<div className={styles["footer"]}>
					<div className={styles["title"]}>{props.title}</div>                
					<div className={styles["description"]}>{props.description}</div>
				</div>

			</div>
		</Link>

	);
}

export default ProductCard;