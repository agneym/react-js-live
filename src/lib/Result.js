import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";

import Console from "./Console";

class Result extends Component {
  state = {
    logs: [],
  }
  componentDidMount() {
    if(window) {
      window.addEventListener("message", (data) => {
        if (data.data.source === "iframe") {
          this.setState(prevState => ({
            logs: [...prevState.logs, ...data.data.message],
          }));
        }
      });
    }
  }
  frameStyling = () => {
    const { active } = this.props;
    if(active === "console") {
      return {
        position: "absolute",
        opacity: 0,
        top: -1024,
        left: -1024,
      }
    } else {
      return {

      }
    }
  }
  render() {
    const { active, code } = this.props;
    return (
      <Fragment>
        <iframe
          height="100%"
          width="100%"
          title="result"
          frameBorder="0"
          srcDoc={code}
          style={this.frameStyling()}
        />
        {active === "console" && (
          <Console logs={this.state.logs} />
        )}
      </Fragment>
    );
  }
  componentDidUpdate(prevProps) {
    if(prevProps.code!==this.props.code) {
      this.setState({
        logs: [],
      });
    }
  }
}

Result.defaultProps = {
  active: "result",
}

Result.propTypes = {
  active: PropTypes.oneOf(["result", "console"]),
  code: PropTypes.string.isRequired
};

export default Result;
