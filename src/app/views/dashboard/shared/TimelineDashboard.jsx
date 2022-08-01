import React from 'react';
import 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import {Chart as ChartJs , Tooltip , Title , ArcElement ,Legend, CategoryScale,LinearScale} from 'chart.js';
ChartJs.register(Tooltip, Title , ArcElement ,Legend,CategoryScale,LinearScale)



const TimelineDashboard = (props) => {

    console.log(props.num)
    let arr = [props.num.Approve, props.num.Reject, props.num.Sent, props.num.InProgress]

    const data = {
    
        labels:[ 
          'Approved',
          'Rejected',
          'In-Progress',
          'Draft'
        ],
        datasets: [{
          label: ' Status ',
          data: arr,
          backgroundColor: [
            '#4caf50',
            '#c62828',
            '#fbc02d',
            '#1565c0'
          ],
          borderColor: [
            '#4caf50',
            '#c62828',
            '#fbc02d',
            '#1565c0'
          ],
          hoverOffset: 4,
          borderWidth: 1
        }]
      };
    return (
        
        <>
        <div className="dougnut">
        <Line data ={data}  style={{ marginBottom:"1rem" , backgroundColor:"#ffffff" }}/>
        </div>
        </>
    )
}

export default TimelineDashboard;