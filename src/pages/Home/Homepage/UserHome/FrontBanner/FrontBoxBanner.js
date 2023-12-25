import React from 'react'
import FrontBoxBannerComponent from '../../../../../components/userHome/FrontBoxBannerComponent'
import "./FrontBanner.css";

const data = [
    {
        id: 1,
        url: "https://fiverr-res.cloudinary.com/q_auto,f_auto/attachments/generic_asset/asset/579aa581549375f6f765229f28786684-1614853429793/Social%20Media.jpg",
        title: "Convert web visitors into customers",
        subtitle: "Unlock the secrets of conversion rate optimization with this course."
    },
    {
        id: 2,
        url: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/579aa581549375f6f765229f28786684-1614853429803/Personal%20Branding.jpg",
        title: "Facebook ads. Know it all.",
        subtitle: "Scale your business with best practices covered in this course."
    },
    {
        id: 3,
        url: "https://fiverr-res.cloudinary.com/q_auto,f_auto/attachments/generic_asset/asset/579aa581549375f6f765229f28786684-1614853429793/Social%20Media.jpg",
        title: "Master social media platforms",
        subtitle: "Learn how to monetize your online presence with this course."
    },
    {
        id: 4,
        url: "https://fiverr-res.cloudinary.com/q_auto,f_auto/attachments/generic_asset/asset/579aa581549375f6f765229f28786684-1614853429793/Social%20Media.jpg",
        title: "Build a strong online presence",
        subtitle: "Boost your business with this course on personal branding techniques."
    }
]
function FrontBoxBanner() {
    return (
        <>
            <FrontBoxBannerComponent data={data} />
        </>
    )
}

export default FrontBoxBanner
