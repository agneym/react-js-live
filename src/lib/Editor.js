import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import SimpleEditor from "react-simple-code-editor";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwl";

const styles = {
  root: {
    boxSizing: "border-box",
    fontFamily: '"Dank Mono", "Fira Code", monospace',
    height: "100%",
    ...theme.plain
  }
};

class Editor extends Component {
  onValueChange = code => {
    this.props.onChange(code, this.props.language);
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
    return (
      <SimpleEditor
        value={this.props.code}
        onValueChange={this.onValueChange}
        highlight={this.highlight}
        padding={10}
        style={styles.root}
      />
    );
  }
}

Editor.defaultProps = {
  language: "js",
  code: ""
};

Editor.propTypes = {
  code: PropTypes.string,
  language: PropTypes.oneOf(["html", "css", "js"]),
  onChange: PropTypes.func.isRequired
};

export default Editor;
