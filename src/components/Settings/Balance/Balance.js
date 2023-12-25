import React from 'react'
import SettingsLayout from '../SettingsLayout'

const Balance = () => {
    return (
        <SettingsLayout>
            <div className="balance-header-section">
                <div className="balance-header">
                    Your Account Balance
                </div>
                <div className="balance-subtitle">
                    When available, we use your funds and credits as your primary payment method for new orders.
                </div>
            </div>
            <div className="payment">
                <div className="payment-methods">
                    <div className="payment-methods-title">
                        <div className="title-text">FIVERR BALANCE</div>
                        <div className="title-total">TOTAL $0.00</div>
                    </div>
                </div>
                <div className="payment-methods">
                    <div className="payment-methods-earnings">
                        <div className="earnings-text">Your Earnings</div>
                        <div className="earnings-total">$0.00</div>
                    </div>
                </div>
                <div className="payment-methods">
                    <div className="payment-methods-reimbursements">
                            <div className="reimbursements-text">Your Reimbursements&nbsp;
                                <i class="fa fa-question-circle"></i><br/>
                                <p>Funds that were credited back to your account for canceled orders.</p>
                            </div>
                        <div className="reimbursements-total">$0.00</div>
                    </div>
                    </div>
                </div>
        </SettingsLayout>
    )
}

export default Balance
