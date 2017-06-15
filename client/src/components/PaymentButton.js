import React from 'react';
import Slider from 'material-ui/Slider';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import {IntlProvider, FormattedNumber} from 'react-intl';

class PaymentButton extends React.Component {
	constructor(props){
    super(props)
    this.state = {
    	slider: Math.pow(10, 4)
    }
    this.handleSlider = this.handleSlider.bind(this);
    this.onToken = this.onToken.bind(this);
  }

  handleSlider(event, value) {
  	this.setState({slider: transform(value)});
  }

  onToken(token) {
    var context = this;
  	console.log('Token: ', token);
  	axios.post('/api/payments/' , {
  		token,
  		amount: this.state.slider * 100,
  		userID: this.props.data.location.state.user.id
  	})
  	.then((response) => {
  		console.log('Success: ', response);
  	})
  	.catch((error) => {
  		console.log('Error: ', error);
  	});
    this.props.addFunds(this.state.slider * 100);
  }

  render() {
  	var thisReference = this;
  	return (
  		<div className="paymentbox">
	  			Input money to your Tutora account:
	        <Slider
	        	style={{width: '50%'}}
	          min={min}
	          max={max}
	          step={max / 100}
	          value={reverse(this.state.slider)}
	          onChange={this.handleSlider}
	        />
	  			<span>{'Chosen amount: '}</span>
	  			<span>
            <FormattedNumber value={this.state.slider} style="currency" currency="USD" />
          </span>
	  			<br/>
					<StripeCheckout
					  name="Tutora"
					  ComponentClass="div"
					  panelLabel="Pay"
					  amount={this.state.slider * 100}
					  currency="USD"
					  stripeKey="pk_test_HPEYwoUk5MyewgpXvRhizhjC"
					  billingAddress={true}
					  zipCode={false}
					  email={this.props.data.location.state.user.email}
					  bitcoin
					  allowRememberMe
					  token={this.onToken}
					  reconfigureOnUpdate={false}
					  allowRememberMe={false}
					  >
					</StripeCheckout>
  
  		</div>
    )
  }
}

const min = 0;
const max = Math.pow(10, 6);
const power = 20;

function transform(value) {
  return Math.round((Math.exp(power * value / max) - 1) / (Math.exp(power) - 1) * max);
}

function reverse(value) {
  return (1 / power) * Math.log(((Math.exp(power) - 1) * value / max) + 1) * max;
}

export default PaymentButton;
