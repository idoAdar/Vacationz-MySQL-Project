import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createVacation } from '../../store/actions/adminAction';
import { withRouter } from 'react-router-dom';
import { motion } from 'framer-motion';

import InputElement from '../../components/InputElement/InputElement';
import Spinner from '../../components/UIElemets/Spinner/Spinner';
import VectorImage from './4005526.jpg';
import './NewVacationScreen.css'; 

const NewVacationScreen = props => {
    const isLoading = useSelector(state => state.userReducer.isLoading);
    const dispatch = useDispatch();

    const [formState, setFormState] = useState({
        destination: '',
        description: '',
        starts_at: '',
        ends_at: '',
        image: '',
        price: 0
    });

    const { destination, description, starts_at, ends_at, image, price } = formState;

    const [errorState, setErrorState] = useState({
        destinationError: null,
        descriptionError: null,
        startsAtError: null,
        endsAtError: null,
        imageError: null,
        priceError: null
    });

    const updateState = e => {
        e.preventDefault();
        setFormState(prevState => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            }
        })
    };

    const validator = () => {
        let destinationErr = null;
        let descriptionErr = null;
        let startsAtErr = null;
        let endsAtErr = null;
        let imageErr = null;
        let priceErr = null;  

        if (destination.trim() === '') destinationErr = 'Please insert Destination field';
        if (description.trim() === '') descriptionErr = 'Please insert Description field';
        if (starts_at.trim() === '') startsAtErr = 'Please insert starting Date';
        if (ends_at.trim() === '') endsAtErr = 'Please insert ending Date';
        if (image.trim() === '') imageErr = 'Please insert Image';
        if (price <= 0) priceErr = 'Please insert vacation Price';

        if (destinationErr || descriptionErr || startsAtErr || endsAtErr || imageErr || priceErr) {
            setErrorState(prevState => {
                return {
                    ...prevState,
                    destinationError: destinationErr,
                    descriptionError: descriptionErr,
                    startsAtError: startsAtErr,
                    endsAtError: endsAtErr,
                    imageError: imageErr,
                    priceError: priceErr
                }
            })
            return false;
        }
        return true;
    };

    const send = e => {
        e.preventDefault();
        const isValid = validator();
        if (isValid) {
            dispatch(createVacation(formState, props.history));
        }
    };

    // Framer Motion Animation:
    const pageTransition = {
        in: {
            opacity: 1,
            y: 0
        },
        out: {
            opacity: 0,
            y: '-100vh'
        }
    };

    return (
        <motion.div exit={'out'} animate={'in'} initial={'out'} variants={pageTransition}>
            <div className={'new-vacation-grid'}>
                <div className={'new-vacation-header'}>
                    <h1><i className="far fa-calendar-plus fa-lg"></i> New Vacation</h1>
                </div>  
                <form onSubmit={send}>
                    <InputElement icon={'fas fa-plane'}
                        inputType={'text'}
                        holder={'Destination...'}
                        name={'destination'}
                        insertFunc={updateState}
                        error={errorState.destinationError}/>
                    <InputElement icon={'fas fa-comment-medical'}
                        inputType={'textarea'}
                        holder={'Description...'}
                        name={'description'}
                        insertFunc={updateState}
                        error={errorState.descriptionError}/>
                    <InputElement icon={'fas fa-hourglass-start'}
                        inputType={'date'} 
                        name={'starts_at'}
                        insertFunc={updateState}
                        error={errorState.startsAtError}/>   
                    <InputElement icon={'fas fa-hourglass-end'}
                        inputType={'date'} 
                        name={'ends_at'}
                        insertFunc={updateState}
                        error={errorState.endsAtError}/>   
                    <InputElement icon={'fas fa-images'}
                        inputType={'text'}
                        holder={'Image URL...'}
                        name={'image'}
                        insertFunc={updateState}
                        error={errorState.imageError}/>
                    <InputElement icon={'fas fa-dollar-sign'}
                        inputType={'number'}
                        holder={'Price...'}
                        name={'price'}
                        insertFunc={updateState}
                        error={errorState.priceError}/>               
                    <button type={'submit'}>Create</button>
                </form>
                <div className={'new-vacation-vector-image'}>
                    <img src={VectorImage} alt={'login-vector-icon'}/>
                </div>
            </div>
            {isLoading && <Spinner />}
        </motion.div>
    )
}

export default withRouter(NewVacationScreen);