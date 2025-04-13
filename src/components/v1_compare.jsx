// var React = require('react');
// var ReactDOM = require('react-dom')

// class Section extends React.Component {
//   render() {
//     const style = {
//       backgroundColor: this.props.color,
//       width: '100%',
//       height: this.props.height
//     }
//     return (
//       <div className="d-flex align-items-start justify-content-center" style={style}>
//         {this.props.children}
//       </div>
//     )
//   }
// }

// class Column extends React.Component {
//   color(i) {
//     switch (i) {
//       case 1:
//         return '#EF5229'
//       case 2:
//         return '#93366B'
//       case 0:
//         return '#fff'
//       case 1.5:
//         return '#45223A'
//     }
//   }

//   render() {
//     // TODO: cleanup
//     const col_height = 300;
//     const style = {
//       height: '300px',
//       paddingLeft: '0.5%',
//       paddingRight: '0.5%',
//       backgroundColor: this.color(0),
//       color: 'black',
//       flex: 1,
//     }
//     const { min1, max1, min2, max2, globalMin, globalMax } = this.props;
//     let range = this.props.globalMax - this.props.globalMin;
//     let m = col_height / range
//     let h0 = globalMin
//     let h1;
//     let h2;
//     let h3;
//     let h4;
//     let c2;
//     let c3;
//     let c4;
//     if (min1 < min2) {
//       // start with color 1
//       h1 = min1
//       c2 = this.color(1)
//       if (max1 <= min2) {
//         // no overlap
//         h2 = max1;
//         c3 = this.color(0);
//         h3 = min2;
//         c4 = this.color(2)
//         h4 = max2;
//       } else {
//         // overlap section
//         h2 = min2;
//         c3 = this.color(1.5)
//         if (max1 <= max2) {
//           // end with color 2
//           h3 = max1;
//           c4 = this.color(2)
//           h4 = max2;
//         } else {
//           // end with color 1 again
//           h3 = max2;
//           c4 = this.color(1);
//           h4 = max1;
//         }
//       }
//     } else {
//       // start with color 2
//       h1 = min2
//       c2 = this.color(2)
//       if (max2 <= min1) {
//         // no overlap
//         h2 = max2;
//         c3 = this.color(0);
//         h3 = min1;
//         c4 = this.color(1)
//         h4 = max1;
//       } else {
//         // overlap section
//         h2 = min1;
//         c3 = this.color(1.5)
//         if (max2 <= max1) {
//           // end with color 1
//           h3 = max2;
//           c4 = this.color(1)
//           h4 = max1;
//         } else {
//           // end with color 2 again
//           h3 = max1;
//           c4 = this.color(2);
//           h4 = max2;
//         }
//       }
//     }

//     return (
//       <div className="d-flex flex-column-reverse align-items-end" style={style}>
//         <Section height={(h1-h0) * m} color={this.color(0)}/>
//         <Section height={(h2-h1) * m} color={c2}/>
//         <Section height={(h3-h2) * m} color={c3}></Section>
//         <Section height={(h4-h3) * m} color={c4}/>
//       </div>
//     )
//   }
// }

// class DataSet extends React.Component {
//   render() {
//     let allPoints = [];
//     for (let z = 0; z < this.props.years; z++) {
//       let points = this.props.maxData1.map( (p, i) => 
//         <Column key={(z * 12) + i} month={i}
//             max1={p} min1={this.props.minData1[i]}
//             max2={this.props.maxData2[i]} min2={this.props.minData2[i]}
//             globalMax={this.props.globalMax} globalMin={this.props.globalMin}/>
//       )
//       allPoints.push(... points)
//     }
    
//     return (
//       <div className="d-flex flex-nowrap justify-content-around">
//         {allPoints}
//       </div>
//     )
//   }
// }

// class TimeControl extends React.Component {
//   constructor(props) {
//     super(props);
//     this.handleChange = this.handleChange.bind(this);
//   }

//   handleChange(event) {
//     this.props.onChange(event.target.id, event.target.value)
//   }

//   render() {
//     const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
//     const style1 = {
//       flex: '1',
//       fontSize: '10px',
//       wordBreak: 'break-all',
//       color: 'white',
//       backgroundColor: '#EF5229',
//       height: '24px'
//     }
//     const style2 = {
//       flex: '1',
//       fontSize: '10px',
//       wordBreak: 'break-all',
//       color: 'white',
//       backgroundColor: '#93366B',
//       height: '24px'
//     }
//     for (let i=1; i<this.props.years; i++) {
//       months.push( ...months )
//     }
//     console.log("shift is", this.props.shift)
//     let months2 = shift_data(months, this.props.shift)
//     return (
//       <div className="mb-3" style={ {marginTop: '-20px'} }>
//         <div className="d-flex flex-nowrap justify-content-around">
//           {months.map((m, i) => <div key={m + i} className="d-flex justify-content-center align-items-center" style={style1}>{m[0]}</div>)}
//         </div>
//         <div className="d-flex flex-nowrap justify-content-around">
//           {months2.map((m, i) => <div key={m + i} className="d-flex justify-content-center align-items-center" style={style2}>{m[0]}</div>)}
//         </div>
//       </div>
//     )
//   }
// }

// class ControlPanel extends React.Component {
//   constructor(props) {
//     super(props);
//     this.handleChange = this.handleChange.bind(this);
//   }

//   handleChange(event) {
//     this.props.onChange(event.target.id, event.target.value)
//   }

//   render() {
//     const { data, city1, city2, city1_type, city2_type, city2_shift, years } = this.props;
//     return (
//       <div className="row d-flex no-gutters justify-content-between">
//         <div className="col" style={ {flex: '1 0 25%', paddingLeft: '0.5%', paddingRight: '0.5%'} }>
//           <div className="btn-group w-100">
//             <button type="button" className="btn btn-warning btn-sm dropdown-toggle w-100 d-flex justify-content-between align-items-center" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//               {data[city1].name}
//             </button>
//             <div className="dropdown-menu">
//               {Object.keys(data).map(city => 
//                 <button key={city} id='city1' value={city} className="dropdown-item" onClick={this.handleChange}>{data[city].name}</button>)}
//             </div>
//           </div>
//         </div>
//         <div className="col-xs-4 col-sm-2 mx-1" style={ {paddingLeft: '0.5%', paddingRight: '0.5%'} }>
//           <select id="city1_type" className="form-control form-control-sm" 
//               onChange={this.handleChange} value={city1_type}>
//             <option value='avg'>Average</option>
//             <option value='record'>Record</option>
//           </select>
//         </div>
//         <div className="col mx-1" style={ {flex: '1 0 25%', paddingLeft: '0.5%', paddingRight: '0.5%'} }>
//           <div className="btn-group w-100">
//             <button type="button" className="btn btn-info btn-sm dropdown-toggle w-100 d-flex justify-content-between align-items-center" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//               {data[city2].name}
//             </button>
//             <div className="dropdown-menu">
//               {Object.keys(data).map(city => 
//                 <button key={city} id='city2' value={city} className="dropdown-item" onClick={this.handleChange}>{data[city].name}</button>)}
//             </div>
//           </div>
//         </div>
//         <div className="col-xs-4 col-sm-2 mx-1" style={ {paddingLeft: '0.5%', paddingRight: '0.5%',} }>
//           <select id="city2_type" className="form-control form-control-sm" 
//               onChange={this.handleChange} value={city2_type}>
//             <option value='avg'>Average</option>
//             <option value='record'>Record</option>
//           </select>
//         </div>
//       </div>
//     )
//   }
// }

// function shift_data(data, k) {
//   let shifted = data.slice()
//   for (let i=0; i<k; i++) {
//       let pop = shifted.shift();
//       shifted.push(pop);
//     }
//   return shifted
// }

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       city1: 'miami',
//       city1_type: 'avg',
//       city2: 'clw',
//       city2_type: 'avg',
//       shift: 0,
//       years: 1,
//       key: 'humidity',
//     };
//     this.updateState = this.updateState.bind(this);
//   }

//   updateState(key, value) {
//     this.setState({[key]: value})
//   }

//   temp_data(i, min_or_max) {
//     let data = this.props.data[this.state['city'+i]][min_or_max][this.state['city'+i+'_type']]
//     if (i == 2 && this.state.shift > 0) {
//       data = shift_data(data, this.state.shift)
//     }
//     return data;
//   }

//   city_data(i, key) {
//         let data = this.props.data[this.state['city'+i]][key]
//     if (i == 2 && this.state.shift > 0) {
//       data = shift_data(data, this.state.shift)
//     }
//     return data;
//   }

//   render() {
//     let max = Math.max( ...this.props.data[this.state.city1].max[this.state.city1_type], 
//               ...this.props.data[this.state.city2].max[this.state.city2_type] )
//     let min = Math.min( ...this.props.data[this.state.city1].min[this.state.city1_type], 
//               ...this.props.data[this.state.city2].min[this.state.city2_type] )
//     let rain_max = Math.max( ...this.props.data[this.state.city1]['rain'], 
//                     ...this.props.data[this.state.city2]['rain'])
//     return (
//       <div className="app container-fluid">
//         <div className="col">
//           <div className="card">
//             <div className="card-header">
//               <ControlPanel onChange={this.updateState} data={this.props.data} {...this.state} />
//             </div>
//           </div>
//         </div>
//         <div className="row">
//           <Chart maxData1={this.temp_data(1, 'max')} maxData2={this.temp_data(2, 'max')} 
//                  minData1={this.temp_data(1, 'min')} minData2={this.temp_data(2, 'min')} 
//                  globalMax={max} globalMin={min} years={this.state.years} shift={this.state.shift}/>
//           <Chart maxData1={this.city_data(1, 'rain')} maxData2={this.city_data(2, 'rain')} 
//                  minData1={new Array(12).fill(0)} minData2={new Array(12).fill(0)} 
//                  globalMax={rain_max} globalMin={0} years={this.state.years} shift={this.state.shift}/>
//           <Chart maxData1={this.city_data(1, 'humidity')} maxData2={this.city_data(2, 'humidity')} 
//                  minData1={new Array(12).fill(0)} minData2={new Array(12).fill(0)} 
//                  globalMax={100} globalMin={0} years={this.state.years} shift={this.state.shift}/>
//         </div>
//       </div>
//     )
//   }
// }

// class Chart extends React.Component {
//   render() {
//     return (
//       <div className="col">
//         <div className="card">
//           <div className="card-block" style={ {paddingRight: '0px', paddingLeft: '0px' } }>
//             <TimeControl years={this.props.years} shift={this.props.shift}/>
//             <DataSet {...this.props}/>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// const data = {
//   sf: {
//     name: 'San Francisco',
//     max: {
//       avg: [19.6, 22.5, 24.3, 27.9, 28.2, 30, 28.4, 29.7, 32, 31.2, 24.5, 19.1], 
//       record: [26, 27, 31, 34, 36, 39, 37, 37, 38, 39, 30, 24]
//     },
//     min: {
//       avg: [7.6, 8.6, 9.2, 9.6, 10.6, 11.6, 12.3, 12.8, 12.8, 12.1, 10.1, 7.8],
//       record: [-2, -1, 1, 4, 6, 8, 8, 8, 8, 6, 3, -3]
//     },
//     rain: [114, 113, 82.8, 37.1, 17.8, 4.1, 0.0, 1.5, 5.3, 28.4, 80.3, 115.8],
//     humidity: [78.3, 75.8, 73.2, 70.9, 71.2, 71.4, 73.2, 74.5, 71.9, 71.9, 74.8, 77.5],
//   }, 
//   santiago: {
//     name: 'Santiago',
//     max: {
//       avg: [29.4, 28.9, 26.9, 22.8, 18.2, 14.8, 14.3, 16.2, 18.4, 22.0, 25.3, 28.1],
//       record: [37.7, 36.6, 36.8, 32.3, 31.1, 26.7, 28.2, 29.9, 32.9, 33.3, 34.7, 35.0],
//     },
//     min: {
//       avg: [11.8, 11.1, 9.4, 6.9, 4.9, 3.3, 2.5, 3.4, 5.2, 7.2, 9.0, 10.9],
//       record: [2.7, 1.2, 0.7, -2.6, -5.9, -6.5, -6.8, -6.2, -4.5, -2.8, 0.7, 3.2]
//     },
//     rain: [0.3, 1.3, 3.8, 12.9, 44.2, 69.8, 69.3, 38.1, 22.5, 11.0, 7.0, 1.7],
//     humidity: [57, 60, 65, 71, 80, 84, 84, 81, 78, 71, 63, 58],
//   },
//   addis: {
//     name: 'Addis Ababa',
//     max: {
//       avg: [23.5, 24.5, 25.4, 24.8, 25.2, 23.4, 20.7, 20.7, 21.7, 22.7, 23.0, 22.9],
//       record: [30, 28, 30, 29, 30, 29, 29, 32, 28, 27, 30, 28],
//     },
//     min: {
//       avg: [7.4, 8.7, 10.5, 11.1, 10.8, 10.6, 11.1, 11.0, 10.7, 8.7, 6.7, 7.0],
//       record: [1, 1, 3, 6, 6, 1, 0, 6, 4, 2, 0, 0]
//     },
//     rain: [13, 30, 58, 82, 84, 138, 280, 290, 149, 27, 7, 7],
//     humidity: [47, 51.5, 47.5, 54.5, 53, 67.5, 79.5, 79, 71.5, 47.5, 48, 45.5]
//   },
//   dubai: {
//     name: 'Dubai',
//     max: {
//       avg: [23.9, 25.4, 28.4, 33.0, 37.7, 39.5, 40.9, 41.3, 38.9, 35.4, 30.6, 26.2],
//       record: [31.6, 37.5, 41.3, 43.5, 47.0, 46.7, 52.1, 48.7, 45.1, 42.0, 41.0, 35.5],
//     },
//     min: {
//       avg: [14.3, 15.5, 17.7, 21.0, 25.1, 27.3, 30.0, 30.4, 27.7, 24.1, 20.1, 16.3],
//       record: [6.1, 6.9, 9.0, 13.4, 15.1, 18.2, 20.4, 23.1, 16.5, 15.0, 11.8, 8.2],
//     },
//     rain: [18.8, 25, 22.1, 7.2, 0.4, 0, 0.8, 0, 0, 1.1, 2.7, 16.2],
//     humidity: [65, 65, 63, 55, 53, 58, 56, 57, 60, 60, 61, 64],
//   },
//   moscow: {
//     name: 'Moscow',
//     max: {
//       avg: [-4, -3.7, 2.6, 11.3, 18.6, 22.0, 24.3, 21.9, 15.7, 8.7, 0.9, -3],
//       record: [8.6, 8.3, 19.7, 28.9, 33.2, 34.9, 38.2, 37.3, 32.3, 24.0, 16.2, 9.6],
//     },
//     min: {
//       avg: [-9.1, -9.8, -4.4, 2.2, 7.7, 12.1, 14.4, 12.5, 7.4, 2.7, -3.3, -7.6],
//       record: [-42.2, -38.2, -32.4, -21, -7.5, -2.3, 1.3, -1.2, -8.5, -16.1, -32.8, -38.8]
//     },
//     rain: [52, 41, 35, 37, 49, 80, 85, 82, 68, 71, 55, 52],
//     humidity: [83, 80, 74, 67, 64, 70, 74, 77, 81, 81, 84, 85],
//   },
//   bcn: {
//     name: 'Barcelona',
//     max: {
//       avg: [14.8, 15.6, 17.4, 19.1, 22.5, 26.1, 28.6, 29.0, 26.0, 22.5, 17.9, 15.1],
//       record: [22.4, 24.8, 28.8, 27.7, 31.6, 35.8, 36.8, 38.2, 33.4, 32.6, 26.1, 23.1],
//     },
//     min: {
//       avg: [8.8, 9.3, 10.9, 12.5, 16.1, 19.8, 22.7, 23.1, 20.0, 16.5, 11.9, 9.5],
//       record: [-1.0, 0.6, 0.4, 6.2, 6.3, 12.4, 15.5, 15.2, 12.5, 5.4, 1.7, 0.7]
//     },
//     rain: [43.7, 31.4, 33, 47.7, 47.4, 32.5, 25.1, 40.8, 81.9, 96.5, 45.1, 46.8],
//   },
//   clw: {
//     name: 'Clearwater',
//     max: {
//       avg: [21.9, 21.9, 24.5, 27.3, 30.1, 31.7, 32.2, 32, 31.4, 28.7, 24.7, 22.2],
//       record: [30, 31, 32, 33, 36, 36, 36, 36, 35, 34, 32, 31],
//     },
//     min: {
//       avg: [11.6, 11.8, 14.3, 17.1, 20.1, 22.6, 23.4, 23.4, 22.7, 19.2, 14.5, 12.1],
//       record: [-4, -3, -2, 5, 12, 16, 17, 18, 16, 7, -3, -7]
//     },
//     rain: [50, 89, 89, 50, 53, 157, 241, 241, 183, 71, 46, 64],
//     humidity: [74.9, 73.0, 71.8, 69.0, 69.8, 74.4, 76.6, 78.4, 77.6, 74.2, 75.0, 75.0],
//   },
//   miami: {
//     name: 'Miami',
//     max: {
//       avg: [24.7, 25.6, 26.8, 28.4, 30.6, 31.9, 32.7, 32.8, 31.8, 30.1, 27.6, 25.5],
//       record: [31, 32, 34, 36, 36, 37, 38, 37, 36, 35, 33, 32],
//     },
//     min: {
//       avg: [15.5, 16.8, 18.3, 20.2, 22.7, 24.4, 25.2, 25.2, 24.7, 23.1, 20.1, 17.2],
//       record: [-2, -3, 0, 4, 10, 16, 19, 19, 17, 7, 2, -1]
//     },
//     rain: [41.1, 57.2, 76.2, 79.8, 135.6, 245.6, 165.1, 225.6, 250.4, 160.8, 83.1, 51.8],
//     humidity: [72.7, 70.9, 69.5, 67.3, 71.6, 76.2, 74.8, 76.2, 77.8, 74.9, 73.8, 72.5],
//   }
// }

// ReactDOM.render(
//   <App data={data}/>,
//   document.getElementById('app')
// );