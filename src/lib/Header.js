import React from "react";
import PropTypes from "prop-types";

import TabButton from "./TabButton";
import styles from "./styles.module.css";

class Header extends React.Component {
  onChangeCodeTabs = event => {
    const value = event.target.value;
    this.props.onChange(value, "left");
  };
  onChangeResultTabs = event => {
    const value = event.target.value;
    this.props.onChange(value, "right");
  };
  render() {
    const { tabs, active } = this.props;
    return (
      <div className={styles.header}>
        {tabs.map(tab => (
          <TabButton
            key={tab.value}
            value={tab.value}
            active={tab.value === active}
            onClick={this.onChangeCodeTabs}
          >
            {tab.label}
          </TabButton>
        ))}
      </div>
    );
  }
}

Header.propTypes = {
  active: PropTypes.oneOf(["html", "css", "js", "result", "console"])
    .isRequired,
  onChange: PropTypes.func.isRequired
};

export default Header;
