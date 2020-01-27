import React, { Component } from 'react';
import Search from './components/search/search';
import {continentList} from './continents';
import './SearchFlag.css';

class SearchFlag extends Component {
  state= {
    continentList: [],
    selectedContinent: '',
    countriesList: [],
    selectedCountries: [],
    flags: []
  }
  componentWillMount() {
    const continent = continentList.map(item => item.continent);
    this.setState({
      continentList: continent
    })
  }

  resetFlags = () => {
    this.setState({
      flags:[],
      selectedCountries:[]
    })
  }

  selectedContinent = option => {
    const continentData = continentList.filter(item => item.continent === option)[0]
    const countriesList = continentData.countries.map(item => item.name)
    this.setState({
      selectedContinent: option,
      countriesList: countriesList
    })
  }

  selectedCountries = option => {

    const {selectedContinent, selectedCountries} = this.state;
    const newList = selectedCountries.concat(option);
    const continentData = continentList.filter(item => item.continent === selectedContinent)[0];

    const flagList = continentData.countries.filter(item => { 
      if(newList.includes(item.name)) {
          return item.flag
      }
    });
     
    this.setState({
      selectedCountries: newList,
      flags: flagList
    })
  }

  render() {
    const {continentList, countriesList, selectedContinent, flags, selectedCountries} = this.state;
    return (
      <div className="search-app">
        <div className="header">
          <span>Flag Picker</span>
        </div>
        <div className="info">
          <span>This app will help you to learn flages around world in <span className="text-decoration">3 Steps</span></span>
        </div>
        <div className="container">
          <div className="continent-container">
              <div className="step">Step 1</div>
              <div className="select-info">Select a continent</div>
              <Search options={continentList} isMultiSelect={false} selectedOption={(option) => this.selectedContinent(option)}/>
              {selectedContinent && <React.Fragment><div className="select-info"> You Selected</div>
              <div className="step">{selectedContinent}</div></React.Fragment>}
          </div>
          <div className="country-container">
          {countriesList.length >0   &&  <React.Fragment><div className="step"> Step 2</div>
              <div className="select-info">Now, Select a Country</div>
             <Search reset={selectedCountries} isMultiSelect={true}  selectedOption={(option) => this.selectedCountries(option)} options={countriesList}/>
             </React.Fragment>}</div>
          <div className="flag-container">
          {flags.length >0   &&  <React.Fragment><div className="step">Selected Flags</div>
          <div className="flags-container">{flags.map(item => <div className="flag">{item.flag}</div>)}</div>
          <button type="button" className="btn-clear" onClick={this.resetFlags}>Clear Flags</button>
          </React.Fragment>}
          </div>
        </div>
        </div>
    );
  }
}

export default SearchFlag;
