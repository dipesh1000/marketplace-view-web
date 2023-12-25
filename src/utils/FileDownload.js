import { axiosInstance } from "./AxiosInstance";

export const fileDownload = (order_code, file_id, fileName, chat_id, type) => {
  axiosInstance()
    .get(
      `${
        type === "chat"
          ? `/api/notification/download/media?chat_room_id=${chat_id}&file_id=${file_id}`
          : `/api/order/download/media?order_code=${order_code}&file_id=${file_id}`
      }`,
      { responseType: "arraybuffer" }
    )

    //   .then((response) => response.blob())
    .then((response) => {
      const blob = response.data;
      // Create blob link to download
      // const url = window.URL.createObjectURL(new Blob([response.data]));
      // const data = response.data;
      const blobb = new Blob([blob], {
        type: response?.headers["content-type"],
      });
      const extension = response?.headers["content-type"].substring(
        response?.headers["content-type"].indexOf("/") + 1
      );
      // // Append to html link element page
      const fileUrl = URL.createObjectURL(blobb);
      // const w = window.open(fileUrl, "_blank");
      // w && w.focus();
      const fileLink = document.createElement("a");
      fileLink.href = fileUrl;

      // it forces the name of the downloaded file
      fileLink.download = `${fileName ? fileName : "FileName"}.${extension}`;

      // triggers the click event
      fileLink.click();
    });
};
