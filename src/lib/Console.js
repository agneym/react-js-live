import React from 'react';
import PropTypes from "prop-types";
import Inspector, { chromeDark } from "react-inspector";

import styles from "./styles.module.css";

class Console extends React.Component {
  render() {
    return (
      <div className={styles.consoleArea}>
        {this.props.logs.map((log, index) => (
          <Inspector data={log} key={index} theme={{...chromeDark, ...({ BASE_FONT_SIZE: "20px"})}} />
        ))}
      </div>
    );
  }
}

Console.propTypes = {
  logs: PropTypes.array.isRequired,
}

export default Console;