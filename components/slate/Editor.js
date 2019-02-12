import React from "react";
import { Editor } from "slate-react";
import Html from "slate-html-serializer";
import { Value } from "slate";

import { renderMark, renderNode } from "./components/renderers";
import { initialValue } from "./initial-value";
import { rules } from "./rules";
import HoverMenu from "./HoverMenu";
import ControlMenu from "./components/ControlMenu";

import { MaterialIcons } from "../shared/CssLibs";

const html = new Html({ rules });

class SlateEditor extends React.Component {
  state = { value: initialValue, isLoaded: false };

  componentDidMount() {
    const { edit, displayValue } = this.props;
    const value = edit
      ? Value.fromJSON(html.deserialize(displayValue))
      : this.state.value;
    this.updateMenu();
    this.setState({ isLoaded: true, value });
  }

  componentDidUpdate() {
    this.updateMenu();
  }

  onChange = ({ value }) => {
    this.setState({ value });
  };

  onKeyDown = (event, change, next) => {
    const { isLoading } = this.props;
    if (!isLoading && event.which === 83 && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      this.save();
      return;
    }
    next();
  };

  updateMenu = () => {
    const menu = this.menu;
    if (!menu) return;

    const { value } = this.state;
    const { fragment, selection } = value;

    if (selection.isBlurred || selection.isCollapsed || fragment.text === "") {
      menu.removeAttribute("style");
      return;
    }

    const native = window.getSelection();
    const range = native.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    menu.style.opacity = 1;
    menu.style.top = `${rect.top + window.pageYOffset - menu.offsetHeight}px`;

    menu.style.left = `${rect.left +
      window.pageXOffset -
      menu.offsetWidth / 2 +
      rect.width / 2}px`;
  };

  getTitle = () => {
    const {
      value: { document }
    } = this.state;

    let title = document.getBlocks().get(0);
    let subTitle = document.getBlocks().get(1);

    title = title ? title.text : "No Title";
    subTitle = subTitle ? subTitle.text : "No subtitle";

    return { title, subTitle };
  };

  save = () => {
    const { isSaving } = this.props;
    const headingValues = this.getTitle();
    const text = html.serialize(this.state.value);
    !isSaving && this.props.saveBlog(headingValues, text);
  };

  render() {
    const { isLoaded } = this.state;
    return (
      <React.Fragment>
        {isLoaded && (
          <Editor
            {...this.props}
            placeholder="Enter some text..."
            value={this.state.value}
            onChange={this.onChange}
            onKeyDown={this.onKeyDown}
            renderEditor={this.renderEditor}
            renderMark={renderMark}
            renderNode={renderNode}
          />
        )}
      </React.Fragment>
    );
  }

  renderEditor = (props, editor, next) => {
    const children = next();
    const edit = props.edit || false;
    return (
      <React.Fragment>
        <ControlMenu
          edit={edit}
          isSaving={props.isSaving}
          saveBlog={this.save}
        />
        {children}
        <HoverMenu innerRef={menu => (this.menu = menu)} editor={editor} />
        <MaterialIcons />
      </React.Fragment>
    );
  };
}

export default SlateEditor;
