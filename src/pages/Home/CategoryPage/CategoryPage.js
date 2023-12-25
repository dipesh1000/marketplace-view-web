import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router";
import CategoryList from "../../../components/category/CategoryList";
import HomeLayout from "../../../layout/homeLayout/HomeLayout";
import {getCategoryBySlug} from "../../../redux/Category/Category.action";

function CategoryPage() {
	const slug = useParams();
	const dispatch = useDispatch();
	const childCategory = useSelector(state => state.category);
	useEffect(() => {
		dispatch(getCategoryBySlug(slug.category));
	}, [dispatch, slug.category]);

	return (
		<>
			<HomeLayout>
				<CategoryList categoryList={childCategory} />
			</HomeLayout>
		</>
	);
}

export default CategoryPage;
