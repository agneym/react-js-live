import React, { Component } from "react";
import PropTypes from "prop-types";

import styles from "./styles.module.css";
import Editor from "./Editor";
import constructSnippets from "./utils/constructSnippet";
import Header from "./Header";
import Result from "./Result";

class JSLive extends Component {
  constructor(props) {
    super(props);
    const { snippets, mode } = props;
    const currentTab = {
      left: mode === "js" ? "js" : "html",
      right: mode === "js" ? "console" : "result"
    };
    this.state = {
      snippets: snippets,
      currentTab: currentTab
    };
  }
  onChangeCode = (code, language) => {
    this.setState(prevState => ({
      snippets: {
        ...prevState.snippets,
        [language]: code
      }
    }));
  };
  onChangeTab = (value, side) => {
    this.setState(prevState => ({
      currentTab: {
        ...prevState.currentTab,
        [side]: value
      }
    }));
  };
  render() {
    const { id } = this.props;
    const { snippets, currentTab } = this.state;
    const codeSnippet = constructSnippets(snippets, id);
    return (
      <div className={styles.frame}>
        <Header
          activeCode={currentTab.left}
          activeRes={currentTab.right}
          onChange={this.onChangeTab}
        />
        <div className={styles.showArea}>
          <div>
            <Editor
              language={currentTab.left}
              code={snippets[currentTab.left]}
              onChange={this.onChangeCode}
            />
          </div>
          <div>
            <Result id={id} active={currentTab.right} code={codeSnippet} />
          </div>
        </div>
      </div>
    );
  }
}

JSLive.defaultProps = {
  snippets: {
    html: "",
    css: "",
    js: ""
  },
  mode: "js"
};

JSLive.propTypes = {
  snippets: PropTypes.shape({
    html: PropTypes.string,
    css: PropTypes.string,
    js: PropTypes.string
  }),
  mode: PropTypes.oneOf(["html", "js"]),
  theme: PropTypes.any,
  id: PropTypes.string.isRequired
};

export default JSLive;
