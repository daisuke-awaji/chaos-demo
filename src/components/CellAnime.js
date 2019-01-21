import * as React from 'react'
import ReactDOM from 'react-dom';
import Cell from './Cell';
import anime from 'animejs';

class CellAnime extends React.Component {
  render() {
    const click = () => {
      const dom = ReactDOM.findDOMNode(this.refs.cellanime);
      console.log(dom);
      var min = 5;
      var max = 10;
      var rand = Math.floor(Math.random() * (max + 1 - min)) + min;
      anime({
        targets: dom,
        rotate: rand + 'turn',
        duration: 5000
      })
    }

    return (
      <div onClick={click} ref="cellanime">
        <Cell
          ref={ref => {
            const dom = ReactDOM.findDOMNode(ref);
            anime({
              targets: dom,
              rotate: '2turn',
              duration: 5000
            })
          }}
          instance={this.props.instance}
        />
      </div >
    )
  }
}
export default CellAnime;