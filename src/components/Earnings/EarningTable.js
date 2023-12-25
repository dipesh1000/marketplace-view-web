import React from 'react'
import {Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function EarningTable() {
    return (
        <div className="earning-table">
            <Table hover size="sm">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>For</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="earning-date">Apr 14, 21</td>
                        <td className="earning-title">
                            Gig Purchased from Revenues
                            <Link to="#">(View Order)</Link>
                        </td>
                        <td className="earning-amount">
                            <span className="profit">$7.28</span>
                        </td>
                    </tr>
                    <tr>
                        <td className="earning-date">Apr 14, 21</td>
                        <td className="earning-title">
                            Gig Purchased from Revenues
                            <Link to="#">(View Order)</Link>
                        </td>
                        <td className="earning-amount">
                            <span className="loss">-$7.28</span>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}

export default EarningTable
