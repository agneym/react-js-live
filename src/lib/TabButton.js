import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import styles from "./styles.module.css";

const TabButton = ({ active, children, onClick, ...rest }) => (
  <button
    className={classNames({
      [styles.tabButton]: true,
      [styles.activeTabBtn]: active
    })}
    onClick={onClick}
    {...rest}
  >
    {children}
  </button>
);

TabButton.defaultProps = {
  active: false
};

TabButton.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
};

export default TabButton;
