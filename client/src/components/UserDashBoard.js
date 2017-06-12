import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import { Rating } from 'material-ui-rating'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, PieChart, Pie, Sector, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';





class UserDashBoard extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    	value: 1,
    	description: "I'm a munstah"
    }

  }

  componentDidMount() {

  	console.log(this.props.location.state.user);
  }

  render() {
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
    	<div><strong>Total Questions Answered:</strong> {this.state.value}</div>
    	<div><strong>Summary:</strong> {this.state.description}</div>
       </div>

        )

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    const RADIAN = Math.PI / 180;                    


    const data = [
      {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
      {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
      {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
      {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
      {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
      {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
      {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
]

const data02 = [
    { subject: 'Math', A: 120, B: 110, fullMark: 150 },
    { subject: 'Chinese', A: 98, B: 130, fullMark: 150 },
    { subject: 'English', A: 86, B: 130, fullMark: 150 },
    { subject: 'Geography', A: 99, B: 100, fullMark: 150 },
    { subject: 'Physics', A: 85, B: 90, fullMark: 150 },
    { subject: 'History', A: 65, B: 85, fullMark: 150 },
]

 

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
      	  value={this.state.value}
          max={5}
        />,
        <Header style={{marginLeft: "25%"}} {...this.state.props} />
      ]}
    />
    <Divider />

    <CardText>
    <div>
    <h4 style={{marginLeft: "25%", display: "inlineBlock"}}>Question History</h4>
    <h4 style = {{marginLeft: "75%", display: "inlineBlock"}}>Question Type</h4>
    <div style = {{display: "flex", flexDirection: "row"}}>
    	<LineChart width={600} height={300} data={data}
            margin={{top: 0, right: 10, left: 20}}>
       <XAxis dataKey="name"/>
       <YAxis/>
       <CartesianGrid strokeDasharray="3 3"/>
       <Tooltip/>
       <Legend />
       <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r: 8}}/>
       <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      </LineChart>
      <RadarChart margin = {{top: 0, bottom: 0, left: 0, right: 0}}cx={300} cy={150} outerRadius={150} width={600} height={500} data={data02}>
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
  </Card>
  </div>
  </div>
  	)
  }
}

  export default UserDashBoard;