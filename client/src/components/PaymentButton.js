import React from 'react';


class PaymentButton extends React.Component {
	constructor(props){
    super(props)
    this.state = {

    }
  }

  render() {
  	console.log('THE PROPS BITCH ', this.props)
  	return (
  		<div>
  			Pay me bitch
  		</div>
		)
  }
}

export default PaymentButton;