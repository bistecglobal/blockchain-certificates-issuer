import React from 'react'
import { Card } from "antd";

function TraineesCardView({ traineeData }) {
  

  return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {traineeData.map((trainee, index) => (
    <Card title={`${trainee.FirstName} ${trainee.LastName}` } key={index}>{trainee.FirstName}</Card>
  ))}
</div>
}

export default TraineesCardView
