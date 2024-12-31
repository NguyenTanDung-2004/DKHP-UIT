import React, { useState, useEffect } from 'react'
import './TrangChu.css'
import DataGridView from './DataGridView'  // Assuming this is the correct path for DataGridView
import classService from './classService'  // Assuming this is the correct import for classService

const DashboardPage = () => {
  const [classData, setClassData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterType, setFilterType] = useState('full');  // 'full' or 'waiting'

  // Function to fetch and filter classes based on the full or waiting status
  const fetchClasses = async (filterType) => {
    setLoading(true);
    try {
      const data = await classService.getAllClasses();
      
      // Filter based on the 'filterType' value
      const filteredClasses = data.filter((classItem) => {
        if (filterType === 'full') {
          return classItem.students.length > classItem.siso / 2;  // More than half students
        } else {
          return classItem.students.length <= classItem.siso / 2;  // Less than or equal to half students
        }
      });
      setClassData(filteredClasses);
    } catch (error) {
      console.error('Error fetching class data:', error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect hook to call fetchClasses when filterType changes
  useEffect(() => {
    fetchClasses(filterType);
  }, [filterType]);  // Dependency on filterType to re-fetch when it changes

  // Event handlers for clicking the sections
  const handleFullClassesClick = () => {
    setFilterType('full');  // Show classes that are full (>50% students)
  };

  const handleWaitingClassesClick = () => {
    setFilterType('waiting');  // Show classes that are waiting (<=50% students)
  };

  return (
    <div className='container admin-home'>
      <section className="status-section">
        <div className='status-traffic'>
          <p>Số lượng truy cập:</p> <span style={{color: 'green'}}>100</span>
        </div>
        <div className='status-class-done' onClick={handleFullClassesClick}>
          <p>Số lớp đã đầy:</p> <span style={{color: 'blue'}}>10</span>
        </div>
        <div className='status-class-wait' onClick={handleWaitingClassesClick}>
          <p>Số lớp chờ đầy:</p> <span style={{color: 'red'}}>5</span>
        </div>
      </section>
      <section className="chart-section">
        <p>Biểu đồ đường</p>
      </section>

      <section className="class-list-section">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <DataGridView
            listData={classData}
            canCheck={false}
            canEdit={false}
          />
        )}
      </section>
    </div>
  )
}

export default DashboardPage;
