import * as React from 'react'
import ReactDOM from 'react-dom';
import Cell from './Cell';
import anime from 'animejs';

class CellAnime extends React.Component {
    render() {
        return (
            <Cell key={this.props.instance.InstanceId}
                ref={ref => {
                    const dom = ReactDOM.findDOMNode(ref)
                    anime({
                        targets: dom,
                        rotate: '2turn',
                        duration: 5000
                    })
                }}
                instance={this.props.instance}
            />
        )
    }
}
export default CellAnime;