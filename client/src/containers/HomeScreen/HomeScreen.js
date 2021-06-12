import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { allVacation, userVacations } from '../../store/actions/userAction';
import Authentication from '../../utills/Authentication';

import Card from '../../components/Card/Card';
import Spinner from '../../components/UIElemets/Spinner/Spinner';
import './HomeScreen.css';

const HomeScreen = props => {
    const user = useSelector(state => state.authReducer.user);
    const isAdmin = useSelector(state => state.authReducer.isAdmin);
    const vacations = useSelector(state => state.userReducer.vacations);
    const note = useSelector(state => state.userReducer.note);
    const dispatch = useDispatch();

    useEffect(() => {
        const token = user?.token;
        Authentication(token);
        if (user && !isAdmin) {
            return dispatch(userVacations(props.history));
        }
        dispatch(allVacation(props.history));
    }, [note]);

    // Framer Motion Animation:
    const pageTransition = {
        in: {
            opacity: 1,
            x: 0
        },
        out: {
            opacity: 0,
            x: '-100vh'
        }
    };

    return (
        <motion.div exit={'out'} animate={'in'} initial={'out'} variants={pageTransition}>
            <div className={'home-main-title'}>
                <p>{note}</p>
                <h1>Welcome to VacationZ</h1>
                <small>VacationZ.Com is a simple fullstack web application, built with React, Nodejs, Express & MySQL</small>
            </div>
            <div className={'vacations-grid'}>
                {vacations ? vacations.map(vacation => {
                    return <Card key={vacation.id}
                        id={vacation.id}
                        image={vacation.image}
                        destination={vacation.destination}
                        description={vacation.description}
                        price={vacation.price}
                        followers={vacation.followers}
                        startsAt={vacation.starts_at}
                        endsAt={vacation.ends_at}
                        isAuth={vacation.user_id}/>
                }) : <Spinner />}
            </div>
        </motion.div>
    )
}

export default HomeScreen;