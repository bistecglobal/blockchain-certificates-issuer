import React from 'react'
import { Card } from "antd";
import { DeleteOutlined} from '@ant-design/icons';


function TraineesCardView({ traineeData }) {
  

  return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {traineeData.map((trainee, index) => (
    <Card title={`${trainee.FirstName} ${trainee.LastName}` } key={index}
    actions={[
      <DeleteOutlined style={{display: "flex", justifyContent: "flex-end", marginLeft: "-15px", color: "red"}}  key="delete" />
    ]}

    >{trainee.FirstName}</Card>
  ))}
</div>
}

export default TraineesCardView
