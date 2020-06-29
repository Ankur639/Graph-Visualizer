import PropTypes from "prop-types";
import React from "react";
import ReactDom from "react-dom";
import $ from "jquery";
import Header from "./Components/header";
import TreeContainer from "./Components/treeContainer";
import DropDown from "./Components/DropDown";
import Store from "./Reducers/store";
import { setActiveNode } from "./Reducers/actions";
import { s } from "./s";
import { connect, Provider } from "react-redux";
import { resize } from "./Reducers/actions";
import { setFilter } from "./Reducers/actions";
import Message from "./Components/Message";

import "./style.css";
const fetch = require("node-fetch");

$(window).on("resize", resize);

const propTypes = {
  activeNode: PropTypes.string,
  filter: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
};

export default class App extends React.PureComponent {
  state = {
    dropdown1: [],
    dropdown2: [],
    data: null,
    data1: [],
    flag: 0,
    hover: false,
    currentDependencies: [],
    message: [],
  };

  onChange1 = async (event) => {
    await this.setState({ dropdown1: event.target.value });
  };
  onChange2 = async (event) => {
    await this.setState({ dropdown2: event.target.value });
  };

  onSubmit = async () => {
    this.setState({ flag: 1 });
    // const r = await fetch(`/runBusiness/${this.state.dropdown1}`);
    // const response = await r.json();
     const response = s;
    const t = [];
    const x = { name: response.solutionName, children: [] };
    response.projects.forEach((eachProject, index) => {
      if (index < this.state.dropdown2)
        t.push({
          name: eachProject.projectName,
          children: [],
        });
    });

    x.children = t;
    await this.setState({ data: x, flag: 0 });
  };

  handleClick = async (event, nodeKey) => {
    let projectsList = this.state.data;

    const r = await fetch(
      `/savetoneo/getalldep/${this.state.dropdown1}/${nodeKey}`
    );

    const response = await r.json();
    console.log("ff", response);
    let m = [];
    if (response.length) {
      response[0].projects[0].dependencies.forEach((d) => {
        m.push({
          name: d.projectName,
          children: [],
        });
      });
      this.findNode(projectsList.children, m, nodeKey);
      await this.setState({ data: projectsList });
      setActiveNode(nodeKey);
    }
  };

  findNode = (ParentChildren, m, nodeKey) => {
    ParentChildren.forEach((e) => {
      if (e.name === nodeKey) {
        e.children = m;
        return;
      } else if (e.children.length) this.findNode(e.children, m, nodeKey);
    });
  };

  handleBack = async () => {
    const originaldata = this.state.data;

    originaldata.children.forEach((d) => {
      d.children = [];
    });

    await setActiveNode(this.state.dropdown1);
    await this.setState({ data: originaldata });
  };
  active = () => {
    setActiveNode(null);
    setFilter("");
    setActiveNode(this.state.dropdown1);
  };

  handleHover = async (event, nodeKey) => {
    console.log("Entered");

    if (
      this.props.activeNode === null ||
      this.props.activeNode === this.state.dropdown1
    ) {
      const r = await fetch(
        `/savetoneo/getalldep/${this.state.dropdown1}/${nodeKey}`
      );
      const response = await r.json();
      const d = [];
      d.push({
        endState: response[0].projects[0].endState,
        sameSolution: response[0].projects[0].sameSolution,
        technology: response[0].projects[0].technology,
        millennium: response[0].projects[0].millennium,
        dependencies: response[0].projects[0].dependencies.length
          ? `Yes`
          : "No",
      });
      this.setState({
        message: `EndState:${d[0].endState}  sameSolution:${d[0].sameSolution}   technology:${d[0].technology}   Millennium:${d[0].millennium}  dependencies:${d[0].dependencies}`,
      });
    } else {
      const r = await fetch(
        `/savetoneo/getalldep/${this.state.dropdown1}/${this.props.activeNode}`
      );
      const response = await r.json();
      const d = [];
      if (response[0]) {
        response[0].projects[0].dependencies.forEach((each) => {
          if (each.projectName === nodeKey) {
            d.push({
              endState: each.endState,
              sameSolution: each.sameSolution,
              technology: each.technology,
              millennium: each.millennium,
              dependencies: each.dependencies === null ? "No" : "Yes",
            });
          }
        });
        if (d.length)
          this.setState({
            message: `EndState:${d[0].endState} sameSolution:${d[0].sameSolution}  technology:${d[0].technology}  Millennium:${d[0].millennium}  dependencies:${d[0].dependencies}`,
          });
      }
    }
    this.setState(this.toggleHoverState);
  };

  toggleHoverState = () => {
    return {
      hover: !this.state.hover,
    };
  };

  render() {
    return (
      <div>
        <DropDown
          dropdown1={this.onChange1}
          dropdown2={this.onChange2}
          submit={this.onSubmit}
          handleHome={this.handleBack}
        ></DropDown>

        {this.state.flag ? (
          <div className="lds-roller center">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        ) : (
          ""
        )}
        {this.state.data ? (
          <div style={{ backgroundColor: "black", marginTop: "20px" }}>
            <div className="conatiner">
              <div style={{ padding: "10px 75px" }}>
                <Header filter={this.props.filter} active={this.active} />
              </div>
              <TreeContainer
                data={this.state.data}
                filter={this.props.filter}
                height={this.props.height}
                width={this.props.width}
                onclick={this.handleClick}
                activeNode={this.props.activeNode}
                handleMouseHover={this.handleHover}
              />
            </div>
            {this.state.hover && (
              <Message information={this.state.message}></Message>
            )}
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

App.propTypes = propTypes;
App = connect((state) => state)(App);
