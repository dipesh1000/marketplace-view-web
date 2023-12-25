import React, { useEffect } from "react";
import FilterDropdown from "./FilterDropdown";
import { useForm } from "../common/form/useForm";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { fetchGigByCategory } from "./redux/Action";
import { Field } from "formik";
import { useState } from "react";
import { useParams } from "react-router";
import ShowSelected from "./ShowSelected";

function FilterSection({ gig_meta, seller_details, filter_data, total }) {
  const dispatch = useDispatch();
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
  const { slug } = useParams();
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
    gig_meta: yup.object().nullable(),
    seller_language: yup.object().nullable(),
    seller_level: yup.object().nullable(),
    seller_country: yup.object().nullable(),
    min_price: yup.number(),
    max_price: yup.number(),
  });
  const onSubmit = (values) => {
    dispatch(fetchGigByCategory(slug, values));
  };

  const { CustomForm, CustomRadio, CustomCheckbox, CustomInput, CustomSelect } =
    useForm({
      initialValues: filter_data || initialValues,
      validationSchema,
      onSubmit,
    });

  const findDeliveryLabel = (data) => {
    let filtered = delivery_options.filter((item) => item.value === data);
    return filtered[0]?.label;
  };
  let child = [];
  // eslint-disable-next-line
  const gigmetaChild = gig_meta?.map((item) => {
    item?.child?.map((list) => child.push(list));
  });
  const findGigmetaTitle = (id) => {
    let filtered = child?.filter(
      (item) => item.id?.toString() === id?.toString()
    );
    return filtered[0]?.title;
  };

  return (
    <CustomForm>
      <div className="gig-filter-box">
        <ul className="gig-filter-list">
          <li>
            <FilterDropdown title="Service Options">
              <div className="service-wrapper">
                {gig_meta?.map((list) => (
                  <div className="service-inner-wrap" key={list.id}>
                    <div className="service-title">{list.title}</div>
                    <ul>
                      {list?.child?.map((item, index) => (
                        <li key={item.id}>
                          <CustomCheckbox
                            name={`gig_meta`}
                            value={item.id}
                            content={item.id}
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
          <li>
            <FilterDropdown title="Seller Details">
              <div className="service-wrapper">
                <div className="service-inner-wrap">
                  <div className="service-title">Seller Speaks</div>
                  <ul>
                    {seller_details?.seller_language?.map((item, index) => (
                      <li key={index}>
                        <CustomCheckbox
                          name={`seller_language`}
                          value={item.slug}
                          content={item.slug}
                          label={item.title}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="service-inner-wrap">
                  <div className="service-title">Seller Lives In</div>
                  <ul>
                    {seller_details?.seller_country?.map((item, index) => (
                      <li key={index}>
                        <CustomCheckbox
                          name={`seller_country`}
                          value={item.slug}
                          content={item.slug}
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
        component={ShowSelected}
        filter_data={filter_data}
        findGigmetaTitle={findGigmetaTitle}
        findDeliveryLabel={findDeliveryLabel}
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

export default FilterSection;

const Sorting = ({ CustomSelect, options, field }) => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const [count, setCount] = useState(0);
  useEffect(() => {
    setCount((prev) => prev + 1);
    count > 0 && dispatch(fetchGigByCategory(slug, field.value));
    // eslint-disable-next-line
  }, [field.value?.sorting_by]);
  return (
    <div className="select-gig-wrap">
      <CustomSelect name="sorting_by" options={options} />
    </div>
  );
};
