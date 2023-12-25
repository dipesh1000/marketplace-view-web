import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { hideSpinner, showSpinner } from "../../common/Spinner/redux/Action";
import { getMedia, deleteGallery, uploadMedia } from "./redux/Action";
import "./style/GigGallery.scss";

function GigGalleryForm({ singleGig, slug, handleContinue }) {
  const dispatch = useDispatch();
  const { media, errors, loading } = useSelector((state) => state.gigGallery);

  useEffect(() => {
    if (loading) {
      dispatch(showSpinner());
    } else {
      dispatch(hideSpinner());
    }
  }, [loading, dispatch]);

  const loadGigMedia = () => {
    dispatch(getMedia(slug));
  };

  return (
    <div className="gallery">
      <div className="main-title">Showcase Your Services In A Gig Gallery</div>
      <div className="main-subtitle">
        Encourage buyers to choose your Gig by featuring a variety of your work.
      </div>
      <div className="info-wrap">
        <i className="fas fa-info-circle"> </i>
        <div>
          To comply with Fiverr’s terms of service, make sure to upload only
          content you either own or you have the permission or license to use.
        </div>
      </div>
      <div className="line-break"></div>
      {/* <CustomForm> */}
      <div className="gallery-wrapper">
        <div className="video-section">
          <div className="title">Video (one only)</div>
          <div className="subtitle">
            Capture buyers' attention with a video that showcases your service.
          </div>
          <div className="instruction">
            Please choose a video shorter than 75 seconds and smaller than 50MB
          </div>
          <VideoWrapper
            media={media}
            errors={errors}
            singleGig={singleGig}
            loadGigMedia={loadGigMedia}
          />
        </div>

        <div className="line-break"></div>
        <div className="image-section">
          <div className="title">Images (up to 3)</div>
          <div className="subtitle">
            Get noticed by the right buyers with visual examples of your
            services.
          </div>
          <ImageWrapper
            media={media}
            errors={errors}
            loadGigMedia={loadGigMedia}
            singleGig={singleGig}
          />
        </div>
        <div className="line-break"></div>
        <div className="document-section">
          <div className="title">Documents (up to 2)</div>
          <div className="subtitle">
            Show some of the best work you created in a document (PDFs only).
          </div>

          <DocumentWrapper
            media={media}
            singleGig={singleGig}
            loadGigMedia={loadGigMedia}
            errors={errors}
          />
        </div>
        <div className="line-break"></div>
      </div>
      <div className="d-flex justify-content-between mt-4">
        <Link to="/users/seller_dashboard/gigs" className="custom-btn cancel">
          Cancel
        </Link>
        <button
          onClick={() => handleContinue()}
          className="custom-btn successBtn"
        >
          Continue
        </button>
      </div>
      {/* </CustomForm> */}
    </div>
  );
}

export default React.memo(GigGalleryForm);

const ImageWrapper = ({ media, errors, loadGigMedia, singleGig }) => {
  const [fileUrl, setFileUrl] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    media?.gig_images && setFileUrl(gigImages());
    // eslint-disable-next-line
  }, [media?.gig_images]);

  const gigImages = () => {
    const images =
      media?.gig_images &&
      Object.keys(media?.gig_images).map((key, index) => {
        return {
          image: media?.gig_images[key].url.resize,
          id: media?.gig_images[key]?.id,
        };
      });
    return images;
  };

  const handleDelete = (data, id) => {
    id &&
      dispatch(
        deleteGallery(
          { type: "image", gig_id: singleGig?.id },
          id,
          loadGigMedia
        )
      );
  };
  let fileCount = fileUrl?.length;

  return (
    <>
      <div className="image-wrapper">
        {fileUrl?.map((list, index) => (
          <div className="upload-container solid" key={list?.id}>
            <div className="img-container">
              <img src={list.image} alt="" />
            </div>

            {fileCount > 1 ? (
              <div className="edit">
                <i
                  className="fa fa-trash"
                  onClick={() => handleDelete(index, list.id)}
                ></i>
              </div>
            ) : (
              <div className="edit">
                <CustomMediaUpload
                  name={`image[image${fileCount + 1}]`}
                  label="Browse"
                  type="image"
                  singleGig={singleGig}
                  action="replace"
                  action_id={list.id}
                  loadGigMedia={loadGigMedia}
                >
                  <i className="fa fa-pen"></i>
                </CustomMediaUpload>
              </div>
            )}

            {index === 0 && (
              <div className="primary">
                {" "}
                <i className="fa fa-star"></i> Primary
              </div>
            )}
          </div>
        ))}
        {fileCount >= 0 && fileCount < 3 && (
          <div className="upload-container dashed ">
            <div className="file-type image"></div>
            <div className="label">Drag a Photo or </div>
            <CustomMediaUpload
              name={`image[image${fileCount + 1}]`}
              label="Browse"
              type="image"
              singleGig={singleGig}
              loadGigMedia={loadGigMedia}
            />
          </div>
        )}
        {fileCount === 0 && (
          <>
            <div className="upload-container solid"></div>
            <div className="upload-container solid"></div>
          </>
        )}
        {fileCount === 1 && (
          <>
            <div className="upload-container solid"></div>
          </>
        )}
      </div>

      <div>
        <span className="error-message">{errors?.image}</span>
      </div>
    </>
  );
};

const DocumentWrapper = ({ media, singleGig, errors, loadGigMedia }) => {
  const [fileUrl, setFileUrl] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    media?.gig_document && setFileUrl(gigDocuments());
    // eslint-disable-next-line
  }, [media?.gig_document]);

  const gigDocuments = () => {
    const documents = media?.gig_document?.map((list) => {
      return {
        document: list.url,
        id: list.id,
      };
    });
    return documents;
  };

  const handleDelete = (id) => {
    const data = {
      type: "document",
      gig_id: singleGig?.id,
    };
    id && dispatch(deleteGallery(data, id, loadGigMedia));
  };
  return (
    <>
      <div className="document-wrapper">
        {fileUrl?.map((list, index) => (
          <div className="upload-container solid" key={index}>
            <div className="img-container">
              <embed
                src={list.document}
                width="250"
                height="200"
                className="pdf"
              ></embed>
            </div>
            <div className="edit">
              <i
                className="fa fa-trash"
                onClick={() => handleDelete(list.id)}
              ></i>
            </div>
          </div>
        ))}
        {fileUrl?.length >= 0 && fileUrl?.length < 2 && (
          <div className="upload-container dashed ">
            <div className="file-type document"></div>
            <div className="label">Drag a Document or </div>
            <CustomMediaUpload
              name={`document[document${fileUrl?.length + 1}]`}
              label="Browse"
              type="document"
              singleGig={singleGig}
              loadGigMedia={loadGigMedia}
            />
          </div>
        )}

        {fileUrl?.length === 0 && (
          <>
            <div className="upload-container solid"></div>
          </>
        )}
      </div>
      <div>
        <span className="error-message">{errors?.document}</span>
      </div>
    </>
  );
};

const VideoWrapper = ({ media, singleGig, errors, loadGigMedia }) => {
  const [video, setVideo] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    media?.gig_video && setVideo(media?.gig_video);
  }, [media?.gig_video]);

  const handleDelete = (id) => {
    const data = { type: "video", gig_id: singleGig?.id };
    id && dispatch(deleteGallery(data, id, loadGigMedia));
  };

  return (
    <>
      <div className="document-wrapper">
        {video?.name ? (
          <div className="upload-container solid">
            <div className="text-container">
              <i className="far fa-check-circle"></i>
              Filename "{video.name}" uploaded
            </div>
            <div className="edit">
              <i
                className="fa fa-trash"
                onClick={() => handleDelete(video?.id)}
              ></i>
            </div>
          </div>
        ) : (
          <div className="upload-container dashed ">
            <div className="file-type video"></div>
            <div className="label">Drag a Vidoe or </div>
            <CustomMediaUpload
              name="video"
              label="Browse"
              type="video"
              singleGig={singleGig}
              loadGigMedia={loadGigMedia}
            />
          </div>
        )}
      </div>
      <div>
        <span className="error-message">{errors?.video}</span>
      </div>
    </>
  );
};

const CustomMediaUpload = ({
  children,
  label,
  name,
  type,
  singleGig,
  action,
  action_id,
  loadGigMedia,
}) => {
  const dispatch = useDispatch();
  const uploadFile = (e) => {
    const file = e.target.files[0];
    if (typeof file == "object") {
      var formData = new FormData();
      formData.append("gig_id", singleGig.id);
      formData.append("type", type);
      formData.append(type, file);
      formData.append("action", action);
      formData.append("action_id", action_id);
      dispatch(uploadMedia(formData, loadGigMedia));
    }
  };

  return (
    <>
      <label className="custom-file-upload">
        <input
          type="file"
          style={{ display: "none" }}
          name={`${name}`}
          onChange={(event) => {
            uploadFile(event);
          }}
        />
        {label}
        {children}
      </label>
    </>
  );
};
