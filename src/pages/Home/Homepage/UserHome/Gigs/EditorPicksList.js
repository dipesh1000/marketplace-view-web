import React from 'react'
import EditorPicks from '../../../../../components/userHome/EditorPicks';
import "./GigLists.css";

const data = [
    {
        title: "I will design trendy and minimal logo",
        seller: "artsages",
        level: "Level 2 Seller",
        profile: "https://fiverr-res.cloudinary.com/t_profile_thumb,q_auto,f_auto/attachments/profile/photo/9251c93b31cae44260a39083b28b8a73-1576961479250/05a666e3-06b2-4793-a8fa-94272da5a4e2.jpg",
        works: [
            "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/142233545/original/e0073bd70f911b6c21cbe44691f9c5bd5fe12ed2.jpg",
            "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs2/142233545/original/92a448e03dde4088be266472f36d0656a3b1f823.jpg",
            "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/attachments/delivery/asset/9a7775e759a66f6d7b6f29533368d97b-1617712786/mockup.jpg",
            "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/attachments/delivery/asset/d4a5e892e876a2bac6d550c48de92afd-1599911964/Qubex.jpg"
        ],
    },
        
    {
        title: "I will do modern minimalist luxury and unique business logo design",
        seller: "creatives_sign",
        level: "",
        profile: "https://fiverr-res.cloudinary.com/t_profile_thumb,q_auto,f_auto/attachments/profile/photo/942c8fc60a95d0e60c847c12323c5792-1619719210735/8583661e-cb03-4b3c-8fa4-3eb54f914518.png",
        works: [
            "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/203456814/original/72a53d3b68a6a9090231ea130c6c8ce1042131e3.png",
            "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs2/203456814/original/5be31b0530dbb1ad5dac7bf91e9f6d4d7d444cac.png",
            "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs3/203456814/original/e0c5e563c938847c6a0ae71c09ffc4c643a8591e.png",
            "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/attachments/delivery/asset/d4a5e892e876a2bac6d550c48de92afd-1599911964/Qubex.jpg"
        ]
    },
    {
        title: "I will do modern minimalist luxury and unique business logo design",
        seller: "creatives_sign",
        level: "Level 2 Seller",
        profile: "https://fiverr-res.cloudinary.com/t_profile_thumb,q_auto,f_auto/profile/photos/23193518/original/Vintage_Logo_Vintage_style_Vintage_design__Retro_Logo_Retro_design__Retro_style_Rustic_Logo_Hand_drawn_Logo_illustration_Company_Logo_Business_Logo_Business_card_Modern_Logo_.jpg",
        works: [
            "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/attachments/delivery/asset/d4a5e892e876a2bac6d550c48de92afd-1599911964/Qubex.jpg",
            "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/203456814/original/72a53d3b68a6a9090231ea130c6c8ce1042131e3.png",
        ]
    },
    {
        title: "I will do modern minimalist luxury and unique business logo design",
        seller: "creatives_sign",
        level: "",
        profile: "https://fiverr-res.cloudinary.com/t_profile_thumb,q_auto,f_auto/attachments/profile/photo/942c8fc60a95d0e60c847c12323c5792-1619719210735/8583661e-cb03-4b3c-8fa4-3eb54f914518.png",
        works: [
            "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/203456814/original/72a53d3b68a6a9090231ea130c6c8ce1042131e3.png",
            "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs2/203456814/original/5be31b0530dbb1ad5dac7bf91e9f6d4d7d444cac.png",
            "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs3/203456814/original/e0c5e563c938847c6a0ae71c09ffc4c643a8591e.png",
            "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/attachments/delivery/asset/d4a5e892e876a2bac6d550c48de92afd-1599911964/Qubex.jpg"
        ]
    },
    {
        title: "I will do modern minimalist luxury and unique business logo design",
        seller: "creatives_sign",
        level: "Level 2 Seller",
        profile: "https://fiverr-res.cloudinary.com/t_profile_thumb,q_auto,f_auto/profile/photos/23193518/original/Vintage_Logo_Vintage_style_Vintage_design__Retro_Logo_Retro_design__Retro_style_Rustic_Logo_Hand_drawn_Logo_illustration_Company_Logo_Business_Logo_Business_card_Modern_Logo_.jpg",
        works: [
            "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/attachments/delivery/asset/d4a5e892e876a2bac6d550c48de92afd-1599911964/Qubex.jpg",
            "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/203456814/original/72a53d3b68a6a9090231ea130c6c8ce1042131e3.png",
        ]
    },
    {
        title: "I will design trendy and minimal logo",
        seller: "artsages",
        level: "Level 2 Seller",
        profile: "https://fiverr-res.cloudinary.com/t_profile_thumb,q_auto,f_auto/attachments/profile/photo/9251c93b31cae44260a39083b28b8a73-1576961479250/05a666e3-06b2-4793-a8fa-94272da5a4e2.jpg",
        works: [
            "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/142233545/original/e0073bd70f911b6c21cbe44691f9c5bd5fe12ed2.jpg",
            "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs2/142233545/original/92a448e03dde4088be266472f36d0656a3b1f823.jpg",
            "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/attachments/delivery/asset/9a7775e759a66f6d7b6f29533368d97b-1617712786/mockup.jpg",
            "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/attachments/delivery/asset/d4a5e892e876a2bac6d550c48de92afd-1599911964/Qubex.jpg"
        ]
    },
]
function EditorPicksLists() {

    return (
        <>
            <EditorPicks data={data} />
        </>
    )
}

export default EditorPicksLists
