import PropTypes from "prop-types";
import React from "react";
import Filter from "./filter";
import { setActiveNode, setFilter, resize } from "../Reducers/actions";

const propTypes = {
  filter: PropTypes.string.isRequired,
  timestamp: PropTypes.string,
};

export default class Header extends React.PureComponent {
  componentDidMount() {
    resize();
  }

  

  render() {
    return (
      <div id="header">
        <Filter filter={this.props.filter} />
         {/* <button onClick={this.props.active}>Expand Total</button>  */}
      </div>
    );
  }
}

Header.propTypes = propTypes;
