import React from 'react';
import './search.css';
class SearchDropdown extends React.Component {

    
    constructor() {
        super();
        this.state = {
        showOptions: false,
        searchText: '',
        selectedOption:[]
    }
    }

    componentWillReceiveProps(newProps) {
       if(newProps.reset && newProps.reset.length === 0) {
           this.setState({
               selectedOption:[]
           })
       }
    }

    toggleOptions = () => {
        const {showOptions} = this.state;
        this.setState ({
            showOptions : !showOptions            
        })
    }


    constructOptions = () => {
        const  { options, isMultiSelect } = this.props;
        const {searchText, selectedOption} = this.state;
        const optionsList  = options.filter(item => item.includes(searchText))
        if(!isMultiSelect) {
        return ( optionsList.map(item => <div className="options text-align-center" onClick={() => this.setSelectedOption(item)}>{item}</div>))
        }
        else {
            return (
                options.map(item => { 
                    const isSelected = selectedOption.includes(item);
                return (
                <div className="options" onClick={() => this.setSelectedOption(item)}>
                   <input type="checkbox" checked={isSelected}  onChange={() => {}}/>
                    <span>{item}</span>
                </div>)
                })
            )
        } 
    }
    
    setSelectedOption= option=> {
        const selectedOption = this.state.selectedOption.concat(option)
        this.setState({
            searchText: option,
            showOptions: false,
            selectedOption:selectedOption
        })
        this.props.selectedOption(option)
    }
    handleOnChange = event => {
        this.setState({
            searchText: event.target.value
        })
    }
    render() {
        const {showOptions} = this.state;        
        const {isMultiSelect} = this.props;
        return (
            <div className="search-container">
                <div className="search-input">
                    <input type="text" className="input-text"  onFocus={this.toggleOptions}  onChange={this.handleOnChange} />
                </div>
               {showOptions && <div className={`option-container ${isMultiSelect ? 'multiselect-options' :''}`}>
                    {this.constructOptions()}
        </div> }
            
                </div>
        )
    }
}

export default SearchDropdown;