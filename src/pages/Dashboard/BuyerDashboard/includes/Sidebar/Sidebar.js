import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import serviceImg from '../../../../../images/Rectangle.png';
import styles from "./Sidebar.module.css";

const Sidebar = () => {
    const {user} = useSelector(state => state.auth);
    const history = useHistory()
    
    const handleRequest = () => {
      history.push('/users/manage_requests/new')
    }
    return (
        <>
          <div className={styles.user__infoBoard}>
            <div className={styles.userIcon__left}>
              {
                !user?.profile_image ? 
                  <div className={styles.profile_image} style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/profileimg.png'})`}}></div> 
                :
                <div className={styles.profile_image} style={{backgroundImage: `url(${user?.profile_image?.url?.resize})`}}></div>
              }    
            </div>
            <div className={styles.userInfo}>
              <Link to="/lists/mylist">View My List</Link>
              <a href='#!'>Invite Friends</a>
              <Link to="/seller_onboarding/personal_info" className={styles.active}>
                Start Selling
              </Link>
            </div>
          </div>

          <div className={styles.services__board}>
            <h3>What services are you looking for?</h3>
            <p>Make a request and receive offers from qualified sellers.</p>
            <div className={styles.service__img} style={{backgroundImage: `url(${serviceImg})`}}>
            </div>
            <button className={styles.request_btn} onClick={handleRequest}>Post a Request</button>
          </div>
        </>
    )
}

export default Sidebar
