import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter, defer } from "react-router-dom";
import { Cart } from "./pages/cart/cart.tsx";
import { Error as ErropPage } from "./pages/Error/Error.tsx";
import { Layout } from "./layout/Menu/Layout.tsx";
import { Product } from "./pages/Product/Product.tsx";
import axios from "axios";
import { PREFIX } from "./helpers/API.ts";
import { AuthLayout } from "./layout/Layout/Auth/AuthLayout.tsx";
import { Login } from "./pages/Login/Login.tsx";
import { Register } from "./pages/Register/Register.tsx";
import { RequireAuth } from "./helpers/RequireAuth.tsx";
const Menu = lazy(() => import("./pages/Menu/Menu"));
const router = createBrowserRouter([
	{
		path: "/",
		element: <RequireAuth><Layout /></RequireAuth>,
		children: [
			{
				path: "/",
				element: <Suspense fallback={<>Загрузка...</>}><Menu /></Suspense>
			},
			{
				path: "/cart",
				element: <Cart />
			},
			{
				path: "/product/:id",
				element: <Product />,
				errorElement: <>Ошибка</>,
				loader: async ({ params }) => {
					return defer({
						data: new Promise((resolve, reject) => {
							setTimeout(() => {
								axios.get(`${PREFIX}/products/${params.id}`).then(data => resolve(data)).catch(e => reject(e));
							}, 100);
						})
					});
				}
			}
		]
	},
	{
		path:"/auth",
		element: < AuthLayout/>,
		children: [
			{
				path:"login",
				element:<Login></Login>
			},
			{
				path:"register",
				element:<Register></Register>
			}
		]
	},
	{
		path: "*",
		element: <ErropPage />
	}
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router = {router}></RouterProvider>
	</React.StrictMode>
);
