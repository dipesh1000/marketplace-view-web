import moment from "moment";
export const formatDate = (timestamp, format) => {
	return moment(timestamp).format(format);
};

formatDate.defaultProps = {
	format: "LLL",
};
