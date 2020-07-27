import React from 'react';
import './AddNutrition.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createNutritions } from '../../redux/actions';

class AddNutrition extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  createNutrition = (e) => {
    e.preventDefault();
    this.props.createNutritions(this.state);
    window.location.href = '/';
  }

  mapFormToLocalState = (e) => {
    const inputType = e.target.getAttribute('inputType');

    if(inputType === 'number') {
      this.setState({[e.target.name]: parseInt(e.target.value.trim())});
    } else {
      this.setState({[e.target.name]: e.target.value.trim()});
    }
  }

  allowOnlyNumbers = (e) => {
    if (!(e.charCode >= 48 && e.charCode <= 57) && !(e.charCode === 0)) {
        e.preventDefault()
    }
  }

  render () {    
    return (      
      <form className="measure center" onSubmit={(e) => this.createNutrition(e)}>
        <div className="mt1">
          <a className="pa2 input-reset ba bg-green hover-bg-green hover-white w-15 pointer f8 dib fw7" href="/">HOME</a>
        </div> 

        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
          <div className="mt3 bg-yellow" style={{padding: 10, color: 'white'}}>
            <legend className="f4 fw6 ph0 mh0">Please fill all details before you submit</legend>
          </div>
          <div className="mt3">
            <label className="db fw6 lh-copy f6" htmlFor="dessert">Dessert Name*</label>
            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" required inputType="string" name="dessert" placeholder="Enter Dessert Name" maxLength="70" onChange={(e) => this.mapFormToLocalState(e)} />
          </div>
          <div className="mt3">
            <label className="db fw6 lh-copy f6" htmlFor="calories">Calories*</label>
            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" required inputType="number" name="calories" placeholder="Enter Calories" maxLength="3" onKeyPress={(e) => this.allowOnlyNumbers(e)} onChange={(e) => this.mapFormToLocalState(e)} />
          </div>
          <div className="mt3">
            <label className="db fw6 lh-copy f6" htmlFor="fat">Fat*</label>
            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" required inputType="number" name="fat" placeholder="Enter Fat" maxLength="3" onKeyPress={(e) => this.allowOnlyNumbers(e)} onChange={(e) => this.mapFormToLocalState(e)} />
          </div>
          <div className="mt3">
            <label className="db fw6 lh-copy f6" htmlFor="carb">Carbs*</label>
            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" required inputType="number" name="carb" placeholder="Enter Carbs" maxLength="3" onKeyPress={(e) => this.allowOnlyNumbers(e)} onChange={(e) => this.mapFormToLocalState(e)} />
          </div>
          <div className="mt3">
            <label className="db fw6 lh-copy f6" htmlFor="protein">Proteins*</label>
            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" required inputType="number" name="protein" placeholder="Enter Proteins" maxLength="3" onKeyPress={(e) => this.allowOnlyNumbers(e)} onChange={(e) => this.mapFormToLocalState(e)} />
          </div>
          <div className="mt3">
            <input className="pa2 input-reset ba bg-green hover-bg-green hover-white w-100 pointer f8 dib fw7" type="submit" value="SUBMIT" />
          </div> 
        </fieldset>                       
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    nutritionCreated: state.nutritionCreated
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createNutritions: bindActionCreators(createNutritions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNutrition)