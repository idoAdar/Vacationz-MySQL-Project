import React from 'react';
import { motion } from 'framer-motion';

import Chart from '../../components/Chart/Chart';
import './StatisticsScreen.css';

const StatisticsScreen = () => {
      // Framer Motion Animation:
      const pageTransition = {
        in: {
            opacity: 1,
            y: 0
        },
        out: {
            opacity: 0,
            y: '-75vh'
        }
    };

    return (
        <motion.div exit={'out'} animate={'in'} initial={'out'} variants={pageTransition}>
            <div className={'statistics-container'}>
                <div className={'chart-header'}>
                    <h1>Followers statistics</h1>
                    <small>Track after the most in damend vacations</small>
                </div>
                <Chart />
            </div>
        </motion.div>
    )
}

export default StatisticsScreen;