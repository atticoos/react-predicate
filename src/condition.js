import React from 'react';
import {renderChildren} from './utils';

export class If extends React.Component {
  render () {
    if (this.props.condition) {
      return renderChildren(this.props.children);
    }
    return null;
  }
}

export const ElseIf = If;

export class Else extends React.Component {
  render () {
    return renderChildren(this.props.children);
  }
}

export class Condition extends React.Component {
  static If = If;
  static ElseIf = If;
  static Else = Else;

  render () {
    var children = React.Children.toArray(this.props.children).filter(child => !!child);

    for (let i = 0; i < children.length; i++) {
      let child = children[i];
      if (child.type === If && child.props.condition) {
        // Render the child if the component is a passin `If` condition.
        return renderChildren(child);
      } else if (child.type === Else) {
        // Otherwise render the Else case.
        return renderChildren(child);
      }
    }

    return null;
  }
}
