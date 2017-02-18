var React = require('react');
var ReactDOM = require('react-dom')

const month = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']

class Section extends React.Component {
  render() {
    const style = {
      backgroundColor: this.props.color,
      width: '100%',
      height: this.props.height
    }
    return (
      <div className="d-flex align-items-start justify-content-center" style={style}>
        {this.props.children}
      </div>
    )
  }
}

class Column extends React.Component {
  color(i) {
    switch (i) {
      case 1:
        return '#59C9D5'
      case 2:
        return '#0062A3'
      case 0:
        return '#fff'
      case 1.5:
        return '#00939A'
    }
  }

  render() {
    // TODO: cleanup
    const col_height = 300;
    const style = {
      height: '300px',
      backgroundColor: this.color(0),
      color: 'black',
    }
    const { min1, max1, min2, max2, globalMin, globalMax } = this.props;
    let range = this.props.globalMax - this.props.globalMin;
    let m = col_height / range
    let h0 = globalMin
    let h1;
    let h2;
    let h3;
    let h4;
    let c2;
    let c3;
    let c4;
    if (min1 < min2) {
      // start with color 1
      h1 = min1
      c2 = this.color(1)
      if (max1 <= min2) {
        // no overlap
        h2 = max1;
        c3 = this.color(0);
        h3 = min2;
        c4 = this.color(2)
        h4 = max2;
      } else {
        // overlap section
        h2 = min2;
        c3 = this.color(1.5)
        if (max1 <= max2) {
          // end with color 2
          h3 = max1;
          c4 = this.color(2)
          h4 = max2;
        } else {
          // end with color 1 again
          h3 = max2;
          c4 = this.color(1);
          h4 = max1;
        }
      }
    } else {
      // start with color 2
      h1 = min2
      c2 = this.color(2)
      if (max2 <= min1) {
        // no overlap
        h2 = max2;
        c3 = this.color(0);
        h3 = min1;
        c4 = this.color(1)
        h4 = max1;
      } else {
        // overlap section
        h2 = min1;
        c3 = this.color(1.5)
        if (max2 <= max1) {
          // end with color 1
          h3 = max2;
          c4 = this.color(1)
          h4 = max1;
        } else {
          // end with color 2 again
          h3 = max1;
          c4 = this.color(2);
          h4 = max2;
        }
      }
    }

    return (
      <div className="col d-flex flex-column-reverse align-items-end" style={style}>
        <Section height={(h1-h0) * m} color={this.color(0)}/>
        <Section height={(h2-h1) * m} color={c2}/>
        <Section height={(h3-h2) * m} color={c3}>{month[this.props.month]}</Section>
        <Section height={(h4-h3) * m} color={c4}/>
      </div>
    )
  }
}

class DataSet extends React.Component {
  render() {
    let allPoints = [];
    for (let z = 0; z < this.props.cycles; z++) {
      let points = this.props.maxData1.map( (p, i) => 
        <Column key={(z * 12) + i} month={i}
            max1={p} min1={this.props.minData1[i]}
            max2={this.props.maxData2[i]} min2={this.props.minData2[i]}
            globalMax={this.props.globalMax} globalMin={this.props.globalMin}/>
      )
      allPoints.push(... points)
    }
    
    return (
      <div className="row no-gutters flex-nowrap">
        {allPoints}
      </div>
    )
  }
}

class WeatherChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city1: 'sf',
      city1_type: 'avg',
      city2: 'santiago',
      city2_type: 'avg',
      city2_shift: 0,
      years: 2,
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.setState({[event.target.id]: event.target.value})
  }

  city_data(i, min_or_max) {
    let data = this.props.data[this.state['city'+i]][min_or_max][this.state['city'+i+'_type']].slice()
    if (i == 2 && this.state.city2_shift > 0) {
      for (let j=0; j<this.state.city2_shift; j++) {
        let pop = data.shift();
        data.push(pop);
      }
    }
    return data;
  }

  render() {
    let max = Math.max( ...this.props.data[this.state.city1].max[this.state.city1_type], 
              ...this.props.data[this.state.city2].max[this.state.city2_type] )
    let min = Math.min( ...this.props.data[this.state.city1].min[this.state.city1_type], 
              ...this.props.data[this.state.city2].min[this.state.city2_type] )
    return (
      <div className="app">
        <div className="container">
          <div className="row no-gutters d-flex justify-content-center">
            <div className="col">
              <select id="city1" className="form-control form-control-sm" 
                  onChange={this.onChange} value={this.state.city1}>
                {Object.keys(this.props.data).map(city => 
                  <option key={city} value={city}>{this.props.data[city].name}</option>)}
              </select>
              <select id="city1_type" className="form-control form-control-sm" 
                  onChange={this.onChange} value={this.state.city1_type}>
                <option value='avg'>Average Temperatures</option>
                <option value='record'>Record Temperatures</option>
              </select>
            </div>
            <div className="col">
              <select id="city2" className="col form-control form-control-sm" 
                  onChange={this.onChange} value={this.state.city2}>
                {Object.keys(this.props.data).map(city => 
                    <option key={city} value={city}>{this.props.data[city].name}</option>)}
              </select>
              <select id="city2_type" className="form-control form-control-sm" 
                  onChange={this.onChange} value={this.state.city2_type}>
                <option value='avg'>Average Temperatures</option>
                <option value='record'>Record Temperatures</option>
              </select>
            </div>
            <div className="col">
              <input id="years" className="form-control form-control-sm" type="number" 
                 onChange={this.onChange} value={this.state.years}/>
                <input id="city2_shift" className="form-control form-control-sm" type="number" 
                 onChange={this.onChange} value={this.state.city2_shift}
                 min="0" max="12"/>
            </div>
            
            
          </div>
        </div>
        <div className="container">
          <DataSet maxData1={this.city_data(1, 'max')} maxData2={this.city_data(2, 'max')} 
               minData1={this.city_data(1, 'min')} minData2={this.city_data(2, 'min')} 
               globalMax={max} globalMin={min} cycles={this.state.years}
          />
        </div>
      </div>
    )
  }
}

const data = {
  sf: {
    name: 'San Francisco',
    max: {
      avg: [19.6, 22.5, 24.3, 27.9, 28.2, 30, 28.4, 29.7, 32, 31.2, 24.5, 19.1], 
      record: [26, 27, 31, 34, 36, 39, 37, 37, 38, 39, 30, 24]
    },
    min: {
      avg: [7.6, 8.6, 9.2, 9.6, 10.6, 11.6, 12.3, 12.8, 12.8, 12.1, 10.1, 7.8],
      record: [-2, -1, 1, 4, 6, 8, 8, 8, 8, 6, 3, -3]
    },
    rain: [],
  }, 
  santiago: {
    name: 'Santiago',
    max: {
      avg: [29.4, 28.9, 26.9, 22.8, 18.2, 14.8, 14.3, 16.2, 18.4, 22.0, 25.3, 28.1],
      record: [37.7, 36.6, 36.8, 32.3, 31.1, 26.7, 28.2, 29.9, 32.9, 33.3, 34.7, 35.0],
    },
    min: {
      avg: [11.8, 11.1, 9.4, 6.9, 4.9, 3.3, 2.5, 3.4, 5.2, 7.2, 9.0, 10.9],
      record: [2.7, 1.2, 0.7, -2.6, -5.9, -6.5, -6.8, -6.2, -4.5, -2.8, 0.7, 3.2]
    },
    rain: [],
  },
  addis: {
    name: 'Addis Ababa',
    max: {
      avg: [23.5, 24.5, 25.4, 24.8, 25.2, 23.4, 20.7, 20.7, 21.7, 22.7, 23.0, 22.9],
      record: [30, 28, 30, 29, 30, 29, 29, 32, 28, 27, 30, 28],
    },
    min: {
      avg: [7.4, 8.7, 10.5, 11.1, 10.8, 10.6, 11.1, 11.0, 10.7, 8.7, 6.7, 7.0],
      record: [1, 1, 3, 6, 6, 1, 0, 6, 4, 2, 0, 0]
    },
    rain: [],
  },
  dubai: {
    name: 'Dubai',
    max: {
      avg: [23.9, 25.4, 28.4, 33.0, 37.7, 39.5, 40.9, 41.3, 38.9, 35.4, 30.6, 26.2],
      record: [31.6, 37.5, 41.3, 43.5, 47.0, 46.7, 52.1, 48.7, 45.1, 42.0, 41.0, 35.5],
    },
    min: {
      avg: [14.3, 15.5, 17.7, 21.0, 25.1, 27.3, 30.0, 30.4, 27.7, 24.1, 20.1, 16.3],
      record: [6.1, 6.9, 9.0, 13.4, 15.1, 18.2, 20.4, 23.1, 16.5, 15.0, 11.8, 8.2],
    },
    rain: [],
  },
  moscow: {
    name: 'Moscow',
    max: {
      avg: [-4, -3.7, 2.6, 11.3, 18.6, 22.0, 24.3, 21.9, 15.7, 8.7, 0.9, -3],
      record: [8.6, 8.3, 19.7, 28.9, 33.2, 34.9, 38.2, 37.3, 32.3, 24.0, 16.2, 9.6],
    },
    min: {
      avg: [-9.1, -9.8, -4.4, 2.2, 7.7, 12.1, 14.4, 12.5, 7.4, 2.7, -3.3, -7.6],
      record: [-42.2, -38.2, -32.4, -21, -7.5, -2.3, 1.3, -1.2, -8.5, -16.1, -32.8, -38.8]
    },
    rain: [],
  }
}

ReactDOM.render(
  <WeatherChart data={data}/>,
  document.getElementById('app')
);