import React from "react";
import PropTypes from "prop-types";

import TabButton from "./TabButton";
import styles from "./styles.module.css";

class Header extends React.Component {
  snippets = [
    {
      label: "HTML",
      value: "html"
    },
    {
      label: "CSS",
      value: "css"
    },
    {
      label: "JS",
      value: "js"
    }
  ];
  onChangeCodeTabs = event => {
    const value = event.target.value;
    this.props.onChange(value, "left");
  };
  onChangeResultTabs = event => {
    const value = event.target.value;
    this.props.onChange(value, "right");
  };
  render() {
    const { activeCode, activeRes } = this.props;
    return (
      <div className={styles.header}>
        <div className="left-content">
          {this.snippets.map(code => (
            <TabButton
              key={code.value}
              value={code.value}
              active={code.value === activeCode}
              onClick={this.onChangeCodeTabs}
            >
              {code.label}
            </TabButton>
          ))}
        </div>
        <div className="right-content">
          <TabButton
            value="result"
            active={activeRes === "result"}
            onClick={this.onChangeResultTabs}
          >
            Result
          </TabButton>
          <TabButton
            value="console"
            active={activeRes === "console"}
            onClick={this.onChangeResultTabs}
          >
            Console
          </TabButton>
        </div>
      </div>
    );
  }
}

Header.defaultProps = {
  activeCode: "js",
  activeRes: "console"
};

Header.propTypes = {
  activeCode: PropTypes.oneOf(["html", "css", "js"]),
  activeRes: PropTypes.oneOf(["result", "console"]),
  onChange: PropTypes.func.isRequired
};

export default Header;
