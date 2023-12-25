import React, { useEffect } from "react";
import { useForm } from "../common/form/useForm";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Field } from "formik";
import { useState } from "react";
import { fetchGigmetaByCategory } from "../GigList/redux/Action";
import FilterDropdown from "../GigList/FilterDropdown";
import SearchShowSelected from "./SearchShowSelected";
import { postSearch } from "./redux/Action";

function SearchFilterSection({
  total,
  searchTerm,
  language,
  countryList,
  gig_meta,
  filter_data,
}) {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.category);

  const delivery_options = [
    {
      label: "Express 24H",
      value: "1",
    },
    {
      label: "Up to 3 days",
      value: "3",
    },
    {
      label: "Up to 7 days",
      value: "7",
    },
    {
      label: "Anytime",
      value: "",
    },
  ];
  const options = [
    {
      id: "best_selling",
      value: "Best Selling",
    },
    {
      id: "recommended",
      value: "Recommended",
    },
    {
      id: "new",
      value: "New Gigs",
    },
  ];
  const initialValues = {
    sub_category: [],
    gig_meta: [],
    min_price: "",
    max_price: "",
    seller_country: [],
    seller_language: [],
    seller_level: [],
    delivery_time: "",
    sorting_by: options[2]?.id,
  };

  const validationSchema = yup.object({
    sub_category: yup.object().nullable(),
    gig_meta: yup.object().nullable(),
    seller_language: yup.object().nullable(),
    seller_level: yup.object().nullable(),
    seller_country: yup.object().nullable(),
    min_price: yup.number(),
    max_price: yup.number(),
  });

  const onSubmit = (values) => {
    dispatch(postSearch({ ...values, search: searchTerm }));
  };

  const { CustomForm, CustomRadio, CustomCheckbox, CustomInput, CustomSelect } =
    useForm({
      initialValues: filter_data || initialValues,
      validationSchema,
      onSubmit,
    });

  const findDeliveryLabel = (data) => {
    let filtered = delivery_options.filter((item) => item.value === data);
    return filtered[0].label;
  };

  return (
    <CustomForm>
      <div className="gig-filter-box">
        <ul className="gig-filter-list">
          <li>
            <FilterDropdown title="Category">
              <div className="service-wrapper">
                {data?.map((list) => (
                  <div className="service-inner-wrap" key={list.id}>
                    <div className="service-title">{list.title}</div>
                    <ul>
                      {list?.child?.map((item) => (
                        <li key={item?.id}>
                          <CustomRadio
                            name={`sub_category`}
                            value={item.id}
                            content={item.id?.toString()}
                            label={item.title}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </FilterDropdown>
          </li>
          <Field
            data={data}
            filter_data={filter_data}
            component={ServiceOptions}
            CustomCheckbox={CustomCheckbox}
          />
          <li>
            <FilterDropdown title="Seller Details">
              <div className="service-wrapper">
                <div className="service-inner-wrap">
                  <div className="service-title">Seller Speaks</div>
                  <ul>
                    {language?.map((item, index) => (
                      <li key={index}>
                        <CustomCheckbox
                          name={`seller_language`}
                          value={item.title}
                          content={item.title}
                          label={item.title}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="service-inner-wrap">
                  <div className="service-title">Seller Lives In</div>
                  <ul>
                    {countryList?.data?.map((item, index) => (
                      <li key={index}>
                        <CustomCheckbox
                          name={`seller_country`}
                          value={item.title}
                          content={item.title}
                          label={item.title}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FilterDropdown>
          </li>
          <li>
            <FilterDropdown title="Budget">
              <div className="budget-wrapper">
                <div className="budget-inner-wrap">
                  <div className="budget-title">Min</div>
                  <CustomInput
                    type="number"
                    placeholder="Any"
                    min="0"
                    max="50000"
                    addon="$"
                    name="min_price"
                  />
                </div>
                <div className="budget-inner-wrap">
                  <div className="budget-title">Max</div>
                  <CustomInput
                    type="number"
                    placeholder="Any"
                    min="0"
                    max="50000"
                    addon="$"
                    name="max_price"
                  />
                </div>
              </div>
            </FilterDropdown>
          </li>
          <li>
            <FilterDropdown title="Delivery Time">
              <div className="delivery-wrapper">
                <ul>
                  {delivery_options.map((item, index) => (
                    <li key={index}>
                      <CustomRadio
                        name="delivery_time"
                        label={item.label}
                        value={item.value}
                        content={item.value}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </FilterDropdown>
          </li>
        </ul>
      </div>
      <Field
        component={SearchShowSelected}
        filter_data={filter_data}
        findDeliveryLabel={findDeliveryLabel}
        data={data}
      />
      <div className="gig-list-sort-count">
        <div className="gig-count">{total} services available</div>
        <div className="gig-sort">
          Sort by{" "}
          <Field
            component={Sorting}
            CustomSelect={CustomSelect}
            options={options}
          />
        </div>
      </div>
    </CustomForm>
  );
}

export default SearchFilterSection;

const Sorting = ({ CustomSelect, options, field, form }) => {
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount((prev) => prev + 1);
    count > 0 && dispatch(postSearch(field.value));
    // eslint-disable-next-line
  }, [field.value?.sorting_by]);

  return (
    <div className="select-gig-wrap">
      <CustomSelect name="sorting_by" options={options} />
    </div>
  );
};

const ServiceOptions = ({ form, CustomCheckbox, data, filter_data }) => {
  const dispatch = useDispatch();

  const { gig_meta } = useSelector((state) => state.gigList);

  const slug = data
    ?.map((item) =>
      item?.child?.filter(
        (item) => item?.id?.toString() === filter_data?.sub_category?.toString()
      )
    )
    ?.find((item) => item);

  useEffect(() => {
    filter_data?.sub_category &&
      dispatch(fetchGigmetaByCategory(slug[0]?.slug));
    // eslint-disable-next-line
  }, [filter_data?.sub_category]);

  return (
    <>
      {filter_data?.sub_category && (
        <li>
          <FilterDropdown title="Service Options">
            <div className="service-wrapper">
              {gig_meta?.map((list) => (
                <div className="service-inner-wrap" key={list.id}>
                  <div className="service-title">{list?.title}</div>
                  <ul>
                    {list?.child?.map((item) => (
                      <li key={item?.id}>
                        <CustomCheckbox
                          name={`gig_meta`}
                          value={item?.id}
                          content={item?.id}
                          label={item?.title}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </FilterDropdown>
        </li>
      )}
    </>
  );
};
