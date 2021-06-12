import React, { useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addFollow, removeFollow } from '../../store/actions/userAction';
import { deleteVacation } from '../../store/actions/adminAction';
import { Link, withRouter } from 'react-router-dom';
import Moment from 'react-moment';

import Modal from '../UIElemets/Modal/Modal';
import './Card.css';

const Card = props => {
    const user = useSelector(state => state.authReducer.user);
    const isAdmin = useSelector(state => state.authReducer.isAdmin);
    const dispatch = useDispatch();

    const [modalState, setModalState] = useState(false);

    const openModal = () => setModalState(true);
    
    const closeModal = () => setModalState(false);

    return (
        <Fragment>
            <Modal show={modalState}
                header={'NOTICE!'}
                close={closeModal}
                delete={() => dispatch(deleteVacation(props.id, props.history))}>
                <div>
                    <p>Please note, this action cannot be undone therafter</p>
                </div>
            </Modal>
            <div className={'follow-card-main'}>
                <div className={'follow-card-img'}>
                    <img src={props.image} alt={'img'}/>
                </div>

                <div className={'follow-card-info'}>
                    <div>
                        <h3>{props.destination}</h3>
                        <p>{props.description}</p>
                        <strong>Only {props.price} $</strong>
                        {props.followers > 0 ? (
                            <p>Follows By <span>{props.followers}</span> Users</p>
                        ) : (
                            <p>New!</p>
                        )}
                    </div>
                    <div>
                        {props.isAuth && user && !isAdmin ?
                            (<button onClick={() => dispatch(removeFollow(props.id))} className={'button-red'}>
                                <i  className="fas fa-thumbs-down fa-sm"></i> Unfollow
                            </button>
                        ) : !props.isAuth && user && !isAdmin ? (<button onClick={() => dispatch(addFollow(props.id))} className={'button-blue'}>
                                <i  className="fas fa-thumbs-up fa-sm"></i> Follow
                            </button>
                        ) : null}
                        {user && isAdmin === 1 && 
                            <Fragment>
                                <button onClick={() => openModal()} className={'button-red'}>Remove</button>     
                                <Link to={{
                                    pathname: `/admin/update-vacation/${props.id}`,
                                    state: {
                                        destination: props.destination,
                                        description: props.description,
                                        starts_at: props.startsAt,
                                        ends_at: props.endsAt,
                                        image: props.image,
                                        price: props.price
                                    }
                                }} className={'button-blue'}>
                                Edit</Link>        
                            </Fragment>}
                    </div>
                    <small>
                        Date: <Moment date={props.startsAt} format={'DD-MM-YYYY'}/> : <Moment date={props.endsAt} format={'DD-MM-YYYY'}/>
                    </small>
                </div>
            </div>
        </Fragment>
    )
}

export default withRouter(Card);