import React from 'react'
import './TrangChu.css'

const DashboardPage = () => {
  return (
    <div className='container admin-home'>
      <section className="status-section">
        <div className='status-traffic'>
          <p>Số lượng truy cập:</p> <span style={{color: 'green'}}>100</span>
        </div>
        <div className='status-class-done'>
          <p>Số lớp đã đầy:</p> <span style={{color: 'blue'}}>10</span>
        </div>
        <div className='status-class-wait'>
          <p>Số lớp chờ đầy:</p> <span style={{color: 'red'}}>5</span>
        </div>
      </section>
      <section className="chart-section">
        <p>Biểu đồ đường</p>
      </section>
    </div>
  )
}

export default DashboardPage
