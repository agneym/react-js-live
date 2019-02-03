import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import SimpleEditor from "react-simple-code-editor";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwl";

import Header from "./Header";
import style from "./styles.module.css";

const styles = {
  root: {
    boxSizing: "border-box",
    fontFamily: '"Dank Mono", "Fira Code", monospace',
    height: "calc(100% - 3rem)",
    ...theme.plain
  }
};

class Editor extends Component {
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

  onValueChange = code => {
    this.props.onChange(code, this.props.language);
  };

  onChangeCodeTabs = event => {
    const value = event.target.value;
    this.props.onChangeTab(value, "left");
  };

  highlight = code => (
    <Highlight
      {...defaultProps}
      theme={theme}
      code={code}
      language={this.props.language}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Fragment>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </Fragment>
      )}
    </Highlight>
  );

  render() {
    const { code, language } = this.props;
    return (
      <div className={style.editorArea}>
        <Header
          tabs={this.snippets}
          active={language}
          onChange={this.onChangeCodeTabs}
        />
        <SimpleEditor
          value={code}
          onValueChange={this.onValueChange}
          highlight={this.highlight}
          padding={10}
          style={styles.root}
        />
      </div>
    );
  }
}

Editor.defaultProps = {
  language: "js",
  code: "",
  theme
};

Editor.propTypes = {
  code: PropTypes.string,
  language: PropTypes.oneOf(["html", "css", "js"]),
  onChange: PropTypes.func.isRequired,
  onChangeTab: PropTypes.func.isRequired,
  theme: PropTypes.any
};

export default Editor;
