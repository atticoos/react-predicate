import React, {PropTypes} from 'react';
import {renderChildren} from './utils';

export class Case extends React.Component {
  static propTypes = {
    when: PropTypes.any,
    default: PropTypes.bool
  };

  render () {
    return renderChildren(this.props.children);
  }
}

export class Default extends Case {
  static defaultProps = {
    default: true
  };
}

/**
 * A swith statement component.
 * This component takes `Case` as children to evaluate the corresponding output for the `on` clause.
 *
 * <Switch on="foo">
 *   <Case when="foo" break>
 *     <span>Foo</span>
 *   </Case>
 *   <Case when="bar" break>
 *     <span>Bar</span>
 *   <Case>
 *   <Default>
 *     <span>FooBar</span>
 *   </Default>
 * </Switch>
 */
export class Switch extends React.Component {
  static propTypes = {
    on: PropTypes.any.isRequired,
    wrapper: PropTypes.node
  };

  static defaultProps = {
    wrapper: <div />
  };

  static Case = Case;

  render () {
    var children = React.Children.toArray(this.props.children).filter(child => !!child);
    var childrenToRender = [];

    for (let i = 0; i < children.length; i++) {
      let child = children[i];

      // Render the child if it matches.
      // Or if it is a default case.
      // Or if a previous case has passed, but did not break.
      if (child.props.when === this.props.on || child.props.default || childrenToRender.length > 0) {
        childrenToRender.push(renderChildren(child));
      }

      // If the case is marked to break, stop.
      if (child.props.break && childrenToRender.length > 0) {
        break;
      }
    }

    if (childrenToRender.length > 0) {
      return React.cloneElement(this.props.wrapper, {
        children: childrenToRender.map((child, key) => React.cloneElement(child, {key}))
      });
    }

    return null;
  }
}
