import "@splidejs/react-splide/css";
import type { NextPage } from "next";
import SubHeading2 from "../components/Subheading/Subheading";
import Carousel from "../components/carousel/Carousel";
import fetchBooks from "../utils/fetchBooks";
import { useQuery } from "@tanstack/react-query";
import { Book } from "@prisma/client";
import { orderBy } from "lodash";
import {
	HomeSearchBar,
	SearchParams,
} from "../components/SearchBars/HomeSearchbar/HomeSearchBar";
import { useEffect, useState } from "react";

const initialSearchParams: SearchParams = {
	query: "",
	zipCode: "",
	languages: {
		English: false,
		German: false,
		French: false,
		Arabic: false,
	},
};

const Home: NextPage = (props) => {
	const [searchParams, setSearchParams] = useState(initialSearchParams);
	const categories = ["Cookbooks", "Fantasy"];

	const categoryData = Object.fromEntries(
		categories.map((category) => [
			category,
			useQuery<Book[]>(["getBooks", category], () => fetchBooks({ category })),
		])
	);

	const recentUploadsQuery = useQuery<Book[]>(["getBooks", "createdAt"], () =>
		fetchBooks({ orderBy: "createdAt" })
	);

	return (
		<>
			<HomeSearchBar
				// onSubmit={() => {}}
				searchParams={searchParams}
				setSearchParams={setSearchParams}
				placeHodlerText={"in 04103"}
			/>
			<div className="pl-6">
				<section id="carousel">
					<div key="0">
						<SubHeading2>Recent Uploads</SubHeading2>
						{recentUploadsQuery.isLoading ? (
							<p>Loading...</p>
						) : (
							<Carousel books={recentUploadsQuery.data} />
						)}
					</div>
					{Object.entries(categoryData).map(([category, query], index) => {
						return (
							<div key={index + 1}>
								<SubHeading2>{category}</SubHeading2>
								{query.isLoading ? <p>Loading...</p> : <Carousel books={query.data} />}
							</div>
						);
					})}
				</section>
			</div>
		</>
	);
};

export default Home;
