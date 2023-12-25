import { useSelector } from "react-redux";

const SearchShowSelected = ({ filter_data, findDeliveryLabel, data, form }) => {
  const { gig_meta } = useSelector((state) => state.gigList);
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
  const handleRemove = (key) => {
    form.setFieldValue(key, "");
    form.submitForm(form.values);
  };

  const handleRemoveArray = (key, value) => {
    let newData = filter_data[key].filter((item) => item !== value);
    form.setFieldValue(key, newData);
    form.submitForm(form.values);
  };
  const handleRemovePrice = () => {
    form.setFieldValue("min_price", "");
    form.setFieldValue("max_price", "");
    form.submitForm(form.values);
  };
  const handleRemoveCategory = () => {
    form.setFieldValue("sub_category", "");
    form.setFieldValue("gig_meta", []);
    form.submitForm(form.values);
  };

  const slug = data
    ?.map((item) =>
      item?.child?.filter(
        (item) => item?.id?.toString() === filter_data?.sub_category?.toString()
      )
    )
    ?.find((item) => item);

  return (
    <div className="show-selected">
      <ul>
        {filter_data?.sub_category && (
          <li>
            <div className="item-wrap" onClick={handleRemoveCategory}>
              {slug[0]?.title} <i className="fa fa-times"></i>
            </div>
          </li>
        )}
        {filter_data?.min_price && filter_data?.max_price && (
          <li>
            <div className="item-wrap" onClick={handleRemovePrice}>
              ${filter_data.min_price} - ${filter_data.max_price}{" "}
              <i className="fa fa-times"></i>
            </div>
          </li>
        )}
        {filter_data?.delivery_time && (
          <li>
            <div
              className="item-wrap"
              onClick={() => handleRemove("delivery_time")}
            >
              {findDeliveryLabel(filter_data.delivery_time)}{" "}
              <i className="fa fa-times"></i>
            </div>
          </li>
        )}
        {filter_data?.seller_country?.map((item, index) => (
          <li key={index}>
            <div
              className="item-wrap"
              onClick={() => handleRemoveArray("seller_country", item)}
            >
              {item}
              <i className="fa fa-times"></i>
            </div>
          </li>
        ))}
        {filter_data?.seller_level?.map((item, index) => (
          <li key={index}>
            <div
              className="item-wrap"
              onClick={() => handleRemoveArray("seller_level", item)}
            >
              {item}
              <i className="fa fa-times"></i>
            </div>
          </li>
        ))}
        {filter_data?.seller_language?.map((item, index) => (
          <li key={index}>
            <div
              className="item-wrap"
              onClick={() => handleRemoveArray("seller_language", item)}
            >
              {item}
              <i className="fa fa-times"></i>
            </div>
          </li>
        ))}
        {filter_data?.gig_meta?.map((item, index) => {
          return (
            <li key={index}>
              <div
                className="item-wrap"
                onClick={() => handleRemoveArray("gig_meta", item)}
              >
                {findGigmetaTitle(item)} <i className="fa fa-times"></i>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SearchShowSelected;
