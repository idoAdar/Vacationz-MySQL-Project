import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Bar } from 'react-chartjs-2';
import './Chart.css';

const Chart = () => {
    const vacations = useSelector(state => state.userReducer.vacations);

    const [chartState, setChartState] = useState({
        labels: [],
        followers: []
    });

    useEffect(() => {
        const labels = vacations.map(vac => {
            if (vac.followers > 0) {
                return vac.destination;
            }
        });
        const followers = vacations.map(vac => vac.followers);
        
        setChartState(() => {
            return {
                followers,
                labels
            }
        })
    }, [vacations])

    const chartConfig = {
        labels: chartState.labels,
        datasets: [
          {
            label: 'Followers',
            backgroundColor: '#fa4033',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: chartState.followers
          }
        ]
      }

    return ( 
        <div className={'chart'} >
            <Bar data={chartConfig}/>
        </div>
    )
}

export default Chart;