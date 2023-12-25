const options = [
  { value: "1 Day", id: "1" },
  { value: "2 Days", id: "2" },
  { value: "3 Days", id: "3" },
  { value: "4 Days", id: "4" },
  { value: "5 Days", id: "5" },
  { value: "6 Days", id: "6" },
  { value: "7 Days", id: "7" },
];

const ExtraPriceList = ({ form, CustomSelect, CustomInput, active }) => {
  // const [extraFastUp, setExtraFastUp] = useState(false);
  const handleExtraFastUp = (e) => {
    form.setFieldValue(e.target.name, e.target.checked);
    form.setFieldValue(`package[0][extra_fast_price]`, "");
    form.setFieldValue(`package[0][extra_fast_day]`, "");
    form.setFieldValue(`package[1][extra_fast_price]`, "");
    form.setFieldValue(`package[1][extra_fast_day]`, "");
    form.setFieldValue(`package[2][extra_fast_price]`, "");
    form.setFieldValue(`package[2][extra_fast_day]`, "");
  };

  const handleChange = (e) => {
    form.setFieldValue(e.target.name, e.target.value);
  };

  return (
    <div className="extra-pricing-factor-list">
      <div className="title-wrapper">
        <div className="checkbox-wrapper">
          <input
            type="checkbox"
            name={`hasExtraFastDelivery`}
            defaultChecked={form.values?.hasExtraFastDelivery}
            onChange={(e) => handleExtraFastUp(e)}
          />
        </div>
        <div className="extra-title">Extra Fast Delivery</div>
      </div>
      {form.values?.hasExtraFastDelivery ? (
        <ul className="extra-list">
          <li>
            <div className="extra-subtitle">Basic</div>
            <div className="extra-detail">
              <span className="first-label">I'll deliver in only</span>
              <select
                name="package[0]['extra_fast_day']"
                className="form-control"
                value={form.values?.package[0]?.extra_fast_day}
                onChange={(e) => handleChange(e)}
              >
                <option value="">Select</option>
                {options?.map((opt) => (
                  <option value={opt.id} key={opt.id}>
                    {opt.value}
                  </option>
                ))}
              </select>
              <span className="second-label">for an extra</span>
              <input
                type="number"
                className="form-control"
                name="package[0]['extra_fast_price']"
                onChange={(e) => handleChange(e)}
                value={form.values?.package[0]?.extra_fast_price}
              />
              <span className="third-label">$</span>
            </div>
          </li>
          {form.values.hasMultiplePackage && (
            <li>
              <div className="extra-subtitle">Standard</div>
              <div className="extra-detail">
                <span className="first-label">I'll deliver in only</span>
                <select
                  name="package[1]['extra_fast_day']"
                  className="form-control"
                  onChange={(e) => handleChange(e)}
                  value={form.values?.package[1]?.extra_fast_day}
                >
                  <option value="">Select</option>
                  {options?.map((opt) => (
                    <option value={opt.id} key={opt.id}>
                      {opt.value}
                    </option>
                  ))}
                </select>
                <span className="second-label">for an extra</span>
                <input
                  type="number"
                  className="form-control"
                  name="package[1]['extra_fast_price']"
                  onChange={(e) => handleChange(e)}
                  value={form.values?.package[1]?.extra_fast_price}
                />
                <span className="third-label">$</span>
              </div>
            </li>
          )}
          {form.values.hasMultiplePackage && (
            <li>
              <div className="extra-subtitle">Premium</div>
              <div className="extra-detail">
                <span className="first-label">I'll deliver in only</span>
                <select
                  name="package[2]['extra_fast_day']"
                  className="form-control"
                  onChange={(e) => handleChange(e)}
                  value={form.values?.package[2]?.extra_fast_day}
                >
                  <option value="">Select</option>
                  {options?.map((opt) => (
                    <option value={opt.id} key={opt.id}>
                      {opt.value}
                    </option>
                  ))}
                </select>
                <span className="second-label">for an extra</span>
                <input
                  type="number"
                  className="form-control"
                  name="package[2]['extra_fast_price']"
                  onChange={(e) => handleChange(e)}
                  value={form.values?.package[2]?.extra_fast_price}
                />
                <span className="third-label">$</span>
              </div>
            </li>
          )}
        </ul>
      ) : (
        ""
      )}
    </div>
  );
};

export default ExtraPriceList;
