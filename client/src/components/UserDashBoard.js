import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import { Rating } from 'material-ui-rating'
import axios from 'axios';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, PieChart, Pie, Sector, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
var chrono = require('chrono-node');
import PaymentButton from './PaymentButton.js'





class UserDashBoard extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    	totalQuestionsAnswered: 0,
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
    	}
    }

  }

  componentDidMount() {
  	var date = new Date()
  	this.setState({currentDate: date})
  	axios
  	.get('/api/dashboard/rating', {params: { user: this.props.location.state.user}})
  	.then(response => {
  		console.log(response);
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
  		this.setState({totalQuestionsAnswered: questions.length})
  		})
  	}


  render() {
  	console.log(this.state.questionsByDate);
  	var user = this.props.location.state.user
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
    const childrenProp = "hello"

    var Header = (props) => (
       <div>
    	<div><strong>Total Questions Answered:</strong> {this.state.totalQuestionsAnswered}</div>
    	<div><strong>Summary:</strong> {this.props.location.state.user.description}</div>
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

console.log("NUMS", this.state.questionNumbers.History)

 

    return (
    <div>
       <img src ="https://static.pexels.com/photos/226591/pexels-photo-226591.jpeg" style = {imageStyle} />

    <a href="/"> <FlatButton style = {buttonStyle} label="Home" /> </a>

    <div>
    <Card style={{opacity: "0.92", backgroundColor: "white", width: "80%", height:"100%", marginLeft: "auto", marginRight: "auto", marginBottom: "25%"}}>
    <CardHeader
      title={this.props.location.state.user.display}
      avatar={this.props.location.state.user.avatar}
      children={[<Rating
      	  value={this.state.ratingValue}
          max={5}
        />,
        <Header style={{marginLeft: "25%"}} {...this.state.props} />
      ]}
    />
    <Divider />

    <CardText>
    <div>
    <h4 style={{marginLeft: "20%", display: "inlineBlock"}}>Weekly Question History</h4>
    <h4 style = {{marginLeft: "70%", display: "inlineBlock"}}>Question Types Answered</h4>
    <div style = {{display: "flex", flexDirection: "row"}}>
    	<LineChart width={600} height={300} data={data}
            margin={{top: 0, right: 10, left: 20}}>
       <XAxis dataKey="name"/>
       <YAxis/>
       <CartesianGrid strokeDasharray="3 3"/>
       <Tooltip/>
       <Legend />
       <Line type="monotone" dataKey="Questions" stroke="#82ca9d" />
      </LineChart>
      <RadarChart margin = {{top: 10, bottom: 0, left: 0, right: 0}}cx={300} cy={175} outerRadius={150} width={600} height={500} data={data02}>
          <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6}/>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis/>
        </RadarChart>
  </div>
  </div>
    </CardText>
    <CardActions>
    </CardActions>
    <PaymentButton data = {this.props}/>
  </Card>
  </div>
  </div>
  	)
  }
}

  export default UserDashBoard;