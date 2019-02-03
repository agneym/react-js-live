import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";

import Console from "./Console";
import styles from "./styles.module.css";

class Result extends Component {
  state = {
    logs: []
  };
  componentDidMount() {
    if (typeof window !== "undefined") {
      const { id } = this.props;
      window.addEventListener("message", data => {
        if (data.data.source === `frame-${id}`) {
          this.setState(prevState => ({
            logs: [...prevState.logs, ...data.data.message]
          }));
        }
      });
    }
  }
  frameStyling = () => {
    const { active } = this.props;
    if (active === "console") {
      return {
        position: "absolute",
        opacity: 0,
        top: -1024,
        left: -1024
      };
    } else {
      return {};
    }
  };
  render() {
    const { id, active, code } = this.props;
    return (
      <div className={styles.resultArea}>
        <iframe
          height="100%"
          width="100%"
          title={id}
          frameBorder="0"
          srcDoc={code}
          style={this.frameStyling()}
        />
        {active === "console" && <Console logs={this.state.logs} />}
      </div>
    );
  }
  componentDidUpdate(prevProps) {
    if (prevProps.code !== this.props.code) {
      this.setState({
        logs: []
      });
    }
  }
}

Result.defaultProps = {
  active: "result"
};

Result.propTypes = {
  active: PropTypes.oneOf(["result", "console"]),
  code: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
};

export default Result;
