import FreelancerMetaContent from "./FreelancerMetaContent";
import FreelancerProfileInfo from "./FreelancerProfileInfo";

function FreelancerLeftContainer({ data }) {
  return (
    data && (
      <div>
        <FreelancerProfileInfo data={data} />
        <FreelancerMetaContent data={data} />
      </div>
    )
  );
}

export default FreelancerLeftContainer;
