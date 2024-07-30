import { useEffect, useState } from "react";
import Headling from "../../components/Headling/Headling";
import Search from "../../components/Search/Search";
import { PREFIX } from "../../helpers/API";
import { Product } from "../../interfaces/product.interface";
import styles from "./Menu.module.css";
import axios, { AxiosError } from "axios";
import { MenuList } from "./MenuList/MenuList";

export function Menu(){
	const [products, setProducts] = useState<Product[]>([]);
	const [isLoading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | undefined>();

	const getMenu = async () => {
		
		try{
			setLoading(true);

			const {data} = await axios.get<Product[]>(`${PREFIX}/products`);
			setProducts(data);
			setLoading(false);
		} catch (e){
			console.error(e);
			if (e instanceof AxiosError){
				setError(e.message);
			}
			setLoading(false);
			return;
		}
	
	};
	useEffect (() => {
		getMenu();
	}, []);
	return <>
		<div className={styles["head"]}>
			<Headling>Menu</Headling>
			<Search placeholder="Введите блюдо или состав"></Search>
		</div>
		<div>
			{error &&<>{error}</>}
			{!isLoading && <MenuList products={products}/>}
			{isLoading &&<>Загружаем продукты</>}
			
		</div>
	</>;
}

export default Menu;