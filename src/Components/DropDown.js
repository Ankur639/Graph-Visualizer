import React, { Component } from "react";

class DropDown extends Component {
  state = {};
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <select
              className="browser-default custom-select"
              onChange={this.props.dropdown1}
              value={this.state.value}
            >
              <option selected>Select Project</option>
              {/* <option value="PathNet -- Anatomic Pathology">
                PathNet -- Anatomic Pathology
              </option> */}

              <option value="PathNet -- Microbiology">
              PathNet -- Microbiology
              </option>


            </select>
          </div>

          <div className="col-md-4">
            <select
              className="browser-default custom-select"
              onChange={this.props.dropdown2}
              value={this.state.value}
            >
              <option selected>Select Limit</option>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="40">40</option>
              <option value="50">50</option>
            </select>
          </div>
          <div className="col-md-2">
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.props.submit}
            >
              Get Project
            </button>
          </div>
          <div className="col-md-2">
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.props.handleHome}
            >
              Back Plan
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default DropDown;
