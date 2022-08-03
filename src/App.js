import './App.css'
import React from 'react';
import ReactDOM from 'react-dom';

class Keypad extends React.Component {
  constructor(props) {
    super(props);
  }
  buttonClick(e) {
    this.props.clickHandle(e);
  }
  render() {
    return (
      <button id={this.props.type} onClick={this.buttonClick.bind(this)}>{this.props.buttonKey}</button>
    );
  }
}

class Screen extends React.Component {
  constructor() {
    super();
  }
  displayNumber2() {
    let number2 = this.props.num2;
    if (number2 !== 0) {
      return number2
    }
  }
  render() {
    return (
      <div id="Screen">
        <p>{this.props.input}</p>
        <p className='text-small'><span>{this.displayNumber2()}</span><span>{this.props.mode}</span></p>
      </div>
    );
  }
}

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      number: "0", 
      mode: '', 
      finished: false, 
      math: "",
      dot: false,
    }
  }

  
  displayClear() { 
    this.setState({
      number: "0",
      mode: '',
      finished: false,
      changingMode: false,
      math: "",
      dot: false,
    });
  }

  
  buttonClick(e) {
    let pressedButton = e.target.innerHTML;
    if (!this.state.finished) {
      if (this.state.number == "0") {
        this.setState({
          number: pressedButton,
        });
      } else {
        let number = this.state.number + pressedButton;
        this.setState({
          number,
        });
      }
    } else
      this.setState({
        number: pressedButton,
        finished: false
      });
  }

  
  calcResult() {
    let math = this.state.math;
    math = math.replace(/÷/i, "/");
    if (this.state.number !== 0) math += this.state.number; 
    else math = math.substring(0, math.length - 1);
    return eval(math); 
  }

  mathMode(e) { 
    let mode = e.target.innerHTML; 
    let number = this.state.number; 
    let math = this.state.math;

    if (number == "0") { 
      if (math[math.length - 1] !== mode) { 
        math = math.substring(0, math.length - 1) + mode;
      }
      this.setState({
        mode: "",
        math, 
      });
    } else { 
      this.setState({
        math: math + number + mode,
        number: "0",
        mode: "",
      });
    }
  }

  dotButtonClick() {
    if (this.state.number.indexOf(".") == -1) {
      let number = this.state.number.toString();
      number += ".";
      this.setState({
        dot: true,
        number: number,
      });
    }
  }

  mathResult() {
    let number = this.calcResult();
    if (this.state.mode == "") {
      this.setState({ 
        math: "",
        number,
        finished: true,
        mode: "",
        dot: false,
      });
    }
  }

  render () {
    return(
      <div className='center-block' id='Main'>
        <h1>React Calculator</h1>
        <Screen input={this.state.number} num2={this.state.math} mode={this.state.mode}/>
        <Keypad type='clear' clickHandle={this.displayClear.bind(this)} buttonKey={'Clear'} />
        {
          ['+','-','÷','*'].map((val, i) => {
            return <Keypad type={'math'} clickHandle={this.mathMode.bind(this)} key={i*3} buttonKey={val} />
          })
        }
        <div id="Keypad">
          {
            [1, 2, 3, 4, 5, 6, 7, 8, 9].map((val, i) => {
              return <Keypad clickHandle={this.buttonClick.bind(this)} key={i} buttonKey={val} />
            })
          }
          <Keypad clickHandle={this.buttonClick.bind(this)} buttonKey={0} />
          <Keypad clickHandle={this.dotButtonClick.bind(this)} buttonKey={"."} />
          <Keypad type='result' clickHandle={this.mathResult.bind(this)} buttonKey={'='} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById('app'));

function App (){
  return (
    <></>
  );
  }

export default App;
