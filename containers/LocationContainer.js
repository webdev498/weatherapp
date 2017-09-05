import React,  { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import WaterConsumption from '../newsfeed/water_consumption';

const mapStateToProps = state => ({
    location: state.locationInfo.location
})

const mapDispatchToProps = (dispatch) => ({
    increment: () => { dispatch({ type : 'INCREMENT' }) }
})

export default connect(mapStateToProps, mapDispatchToProps)(WaterConsumption);




