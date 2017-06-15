import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import { Rating } from 'material-ui-rating'
import axios from 'axios';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, PieChart, Pie, Sector, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import chrono from 'chrono-node';
import PaymentButton from './PaymentButton.js';
import Wallet from 'material-ui/svg-icons/action/account-balance-wallet';
import {IntlProvider, FormattedNumber} from 'react-intl';
require('!style-loader!css-loader!../../../client/src/style.css')

class UserDashBoard extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      totalQuestions: 0,
      funds: undefined,
      ratingValue: 5,
      questionNumbers: {
        Math: 0.1,
        Geography: 0.1,
        History: 0.1,
        Art: 0.1,
        Physics: 0.1,
        Chemistry: 0.1,
        Grammar: 0.1,
        English: 0.1,
        Biology: 0.1
      },
      questionsByDate: {
        "0": 0,
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0,
        "6": 0,
        "7": 0
      },
      user: {
      }
    }
    this.addFunds = this.addFunds.bind(this);
  }

  addFunds(cashAmount) {
    var totalCash = this.state.funds + cashAmount;
    this.setState({funds: totalCash});
  }

  componentWillMount() {
    var newUser
    if (this.props.location) {
      var newUser = this.props.location.state.user || this.props.user
    }
    else {
      var newUser = this.props.user
    }
    console.log("THE NEW USER", newUser);
    this.setState({user: newUser})
    var date = new Date()
    this.setState({currentDate: date})
    this.setState({studentType: newUser.type})
    console.log("NEW USER", newUser)
    if (this.state.studentType === "tutor") {
	    axios
	    .get('/api/dashboard/rating', {params: { user: newUser}})
	    .then(response => {
	      var questions = response.data
	      var ratingTotal = 0
	      questions.forEach((question) => {
	        ratingTotal += question.feedback_rating
	        this.state.questionNumbers[question.tag_name] += 1
	        var date = chrono.parseDate(question.created_at).getTime() - this.state.currentDate.getTime();
	        var date = Math.round(Math.abs(date/(1000*60*60*24)));
	        if (date <= 7) {
	          var currentState = this.state.questionsByDate
	          currentState[date] += 1
	          this.setState({questionsByDate: currentState})
	           }
	        })
	      this.setState({ratingValue: Math.floor(ratingTotal / questions.length)})
	      this.setState({totalQuestions: questions.length})
	      })
	    }
   else {
   	axios
   	.get('/api/dashboard/student', {params: { user: newUser}})
    .then(response => {
      var questions = response.data
      var ratingTotal = 0
      questions.forEach((question) => {
        ratingTotal += question.feedback_rating
        this.state.questionNumbers[question.tag_name] += 1
        var date = chrono.parseDate(question.created_at).getTime() - this.state.currentDate.getTime();
        var date = Math.round(Math.abs(date/(1000*60*60*24)));
        if (date <= 7) {
          var currentState = this.state.questionsByDate
          currentState[date] += 1
          this.setState({questionsByDate: currentState})
           }
        })
      this.setState({ratingValue: Math.floor(ratingTotal / questions.length)})
      this.setState({totalQuestions: questions.length})
      })
    }
    var context = this;
    axios
    .get('/api/payments/' + newUser.id)
    .then(paymentsRespons => {
      context.setState({funds: paymentsRespons.data.funds})
    })
  }


  render() {
  	console.log("USER", this.state.user.id);
    console.log('STATE', this.state);
    var user = this.state.user
    const divStyle = {
      backgroundColor: "white",
      width: "75%"
    }
    const imageStyle = {
      position: "fixed",
      width: "100%",
      height: "100%"
    }
   const buttonStyle = {
    position: "absolute",
    top: "0px",
    right: "0px",
    color: "white"
  }
    const buttonStyle2 = {
    position: "absolute",
    top: "0px",
    left: "0px",
    color: "white"
  }
    const childrenProp = "hello"

    var Header = (props) => (
       <div>
      <Balance funds={props.funds} />         
      <div><strong>Total Questions Answered:</strong> {this.state.totalQuestions}</div>
      <div><strong>Summary:</strong> {this.state.user.description}</div>
       </div>
    )
    var Header2 = (props) => (
       <div>
      <Balance funds={props.funds} />
      <div><strong>Total Questions Asked:</strong> {this.state.totalQuestions}</div>
      <div><strong>Summary:</strong> {this.state.user.description}</div>
       </div>
    )

    var Balance = (props) => (
      <div style={{float:"right"}}>
        <container>
          <Wallet style={{"align":"right"}}/>
        </container>
        <br/>
        <FormattedNumber value={props.funds} style="currency" currency="USD" />
      </div>
    )

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    const RADIAN = Math.PI / 180;                    


    const data = [
      {name: 'Today', Questions: this.state.questionsByDate[0], amt: 2400},
      {name: '1 Day', Questions: this.state.questionsByDate[1], amt: 2210},
      {name: '2 Days', Questions: this.state.questionsByDate[2], amt: 2290},
      {name: '3 Days', Questions: this.state.questionsByDate[3], amt: 2000},
      {name: '4 Days', Questions: this.state.questionsByDate[4], amt: 2181},
      {name: '5 Days', Questions: this.state.questionsByDate[5], amt: 2500},
      {name: '6 Days', Questions: this.state.questionsByDate[6], amt: 2100},
]

const data02 = [
    { subject: 'Math', A: this.state.questionNumbers.Math, fullMark: 150 },
    { subject: 'Geography', A: this.state.questionNumbers.Geography, fullMark: 150 },
    { subject: 'History', A: this.state.questionNumbers.History, fullMark: 150 },
    { subject: 'Art', A: this.state.questionNumbers.Art, fullMark: 150 },
    { subject: 'Physics', A: this.state.questionNumbers.Physics, fullMark: 150 },
    { subject: 'Chemistry', A: this.state.questionNumbers.Chemistry, fullMark: 150 },
    { subject: 'Grammar', A: this.state.questionNumbers.Grammar, fullMark: 150 },
    { subject: 'English', A: this.state.questionNumbers.English, fullMark: 150 },
    { subject: 'Biology', A: this.state.questionNumbers.Biology, fullMark: 150 }



]


 if (this.state.studentType === "tutor") {

    return (    
    <div>
      {this.props.modal ? <div></div> : <img src ="/assets/chalk.jpeg" style = {imageStyle} />}

    <a href="/"> <FlatButton style = {buttonStyle} label="Home" /> </a>
    <a href="/edit"> <FlatButton style = {buttonStyle2} label="Edit Profile" /> </a>


    <div>
    <Card style={{opacity: "0.92", backgroundColor: "white", width: "80%", height:"100%", marginLeft: "auto", marginRight: "auto", marginBottom: "25%"}}>
    <CardHeader
      title={this.state.user.display}
      avatar={this.state.user.avatar}
      children={[<Rating
          value={this.state.ratingValue}
          max={5}
        />, 
        <Header style={{marginLeft: "25%"}} {...this.state.props} funds={this.state.funds} />
      ]}
    />
    <Divider />

    <CardText>
      <div className="container-fluid">
        <div className="row">

          <div className="charttitle">Weekly Question History </div>
            <div className="chart">
            
              <LineChart width={500} height={250} data={data}
                    margin={{top: 0, right: 10, left: 20}}>
               <XAxis dataKey="name"/>
               <YAxis/>
               <CartesianGrid strokeDasharray="3 3"/>
               <Tooltip/>
               <Legend />
               <Line type="monotone" dataKey="Questions" stroke="#82ca9d" />
              </LineChart>
            </div>

        </div>  

        <div className="row">
          <div className="charttitle"> Question Types Answered </div>
            <div className="chart">
              <RadarChart margin = {{top: 10, bottom: 0, left: 0, right: 0}}cx={300} cy={175} outerRadius={150} width={500} height={420} data={data02}>
                <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6}/>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis/>
              </RadarChart>
            </div>
          
        </div>
      </div>

    </CardText>
    <CardActions>
    </CardActions>
  </Card>
  </div>
  </div>
    )
} else if (this.state.studentType === "student") {
     return (
    <div>
      {this.props.modal ? <div></div> : <img src ="https://static.pexels.com/photos/226591/pexels-photo-226591.jpeg" style = {imageStyle} />
      }

    <a href="/"> <FlatButton style = {buttonStyle} label="Home" /> </a>
     <a href="/edit"> <FlatButton style = {buttonStyle2} label="Edit Profile" /> </a>


    <div>
    <Card style={{opacity: "0.92", backgroundColor: "white", width: "80%", height:"100%", marginLeft: "auto", marginRight: "auto", marginBottom: "25%"}}>
    <CardHeader
      title={this.state.user.display}
      avatar={this.state.user.avatar}
      children={
        <Header2 style={{marginLeft: "25%"}} {...this.state.props} funds={this.state.funds} />
      }
    />
    <Divider />

    <div className="container-fluid">
      <CardText>
          <div className="row">

            <div className="charttitle">Weekly Question History </div>
            <div className="chart">
              <LineChart width={500} height={250} data={data}
                    margin={{top: 0, right: 10, left: 20}}>
               <XAxis dataKey="name"/>
               <YAxis/>
               <CartesianGrid strokeDasharray="3 3"/>
               <Tooltip/>
               <Legend />
               <Line type="monotone" dataKey="Questions" stroke="#82ca9d" />
              </LineChart>
            </div> 

          </div>    
          
          <div className="row">
            <div className="charttitle"> Question Types Answered </div>
            <div className="chart">          
              <RadarChart margin = {{top: 10, bottom: 0, left: 0, right: 0}}cx={300} cy={175} outerRadius={150} width={500} height={420} data={data02}>
                <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6}/>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis/>
              </RadarChart>
            </div>  
            
          </div>
      </CardText>
      
      <div>
        <PaymentButton data={this.props} addFunds={this.addFunds} />
      </div>  
    </div>
    </Card>
    </div>
    </div>
    )

    }
  }
}

  export default UserDashBoard;