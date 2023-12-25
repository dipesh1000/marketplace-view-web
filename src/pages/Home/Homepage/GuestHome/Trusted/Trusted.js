import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import TrustedItem from './TrustedItem';
import styles from './Trusted.module.css';

function Trusted() {
    const brands = [
        {   
            title: "facebook", 
            bannerImg: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/facebook.31d5f92.png" 
        },
        { 
            title: "google",
            bannerImg: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/google.517da09.png" 
        },
        { 
            title: "netflix",
            bannerImg: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/netflix.e3ad953.png" 
        },
        { 
            title: "pandg",
            bannerImg: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/pandg.8b7310b.png" 
        },
        { 
            title: "paypal",
            bannerImg: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/paypal.ec56157.png" 
        }
    ]
    return (
        <>
            <div className={`${styles.trustedWrapper}`}>
            <Container>
            <Row className="justify-content-md-center align-items-center p-3
            ">
                <Col xs lg="2" className="text-right">
                    <strong>Trusted by:</strong>
                </Col>
                {
                    brands.map((brand) => (
                        <TrustedItem key={brand.title} logo={brand.bannerImg} logoTitle={brand.title} />
                    ))
                }
                <Col xs lg="1">
                </Col>
            </Row>
            </Container>
            </div>
        </>
    )
}

export default Trusted
