import {useEffect} from 'react';
import { Pie } from 'react-chartjs-2';

export const data = {
    labels: [
      'Red',
      'Blue',
      'Yellow'
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [300, 50, 100],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  };
  function Chart(){
    useEffect(()=>{
        const fetchData = () => {
        fetch('http://11.0.0.9090/create_personal_app/api/getDashboardData').then(data =>{
            console.log("data" , data)

        })
        // .catch(e=>{
        //     console.log("error", e)
        // })
    }
    fetchData();
    },[])
    return(
        <div className="Chart">
            <Pie data ={data}/>
        </div>
    );
  }
  export default Chart;