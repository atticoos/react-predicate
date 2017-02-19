# react-predicate

A control-flow library for React.

This library offers two categories of predicate components: `Condition` and `Switch`.

```js
<Condition>
  <If condition={value === 'foo'}>
    <span>Foo</span>
  </If>
  <ElseIf condition={value === 'bar'}>
    <span>Bar</span>
  </ElseIf>
  <Else>
    <span>The value was neither foo nor bar</span>
  </Else>
</Condition>
```
```js
<Switch on={value}>
  <Case when="foo" break>
    <span>Foo</span>
  </Case>
  <Case when="bar" break>
    <span>Bar</span>
  </Case>
  <Default>
    <span>The value was neither foo nor bar</span>
  </Default>
</Switch>
```

### Condition

`Condition` wraps a set of `If`, `ElseIf`, and `Else` components. Each component has a `condition` property, where the first to evaluate as `true` becomes rendered. If none evaluate to `true`, then `Else` becomes rendered if it exists. Alternatively, `If` can be used on its own when there is no alternative behavior.

#### Condition Example

```js
class Counter extends React.Component {
  state = {count: 0};

  increment() {
    this.setState({count: this.state.count + 1});
  }

  decrement() {
    this.setState({count: this.state.count - 1});
  }

  render() {
    return (
      <div>
        <button onClick={() => this.decrement()}>Decrement</button>
        <span>{this.state.count}</span>
        <button onClick={() => this.increment()}>Increment</button>
        <OddOrEven count={this.state.count}</OddOrEven>
      </div>
    );
  }
}

function OddOrEven ({count}) {
  return (
    <Condition>
      <If condition={count % 2 === 0}>
        <span>The number is even</span>
      </If>
      <Else>
        <span>The number is odd</span>
      </Else>
    </Condition>
  );
}
```

#### If example

In this example we use `If` without a parent `Condition`. When `If` is not wrapped by a `Condition`, the statements are not aware of each other. Unlike `Condition`, if one evaluates to `true`, the other remains unaffected.

```js
class Counter extends React.Component {
  state = {count: 0};

  increment() {
    this.setState({count: this.state.count + 1});
  }

  decrement() {
    this.setState({count: this.state.count - 1});
  }

  render() {
    return (
      <div>
        <button onClick={() => this.decrement()}>Decrement</button>
        <span>{this.state.count}</span>
        <button onClick={() => this.increment()}>Increment</button>
        <If condition={this.state.count % 2 === 0}>
          <span>The number is even</span>
        </If>
        <If condition={this.state.count % 2 === 0}>
          <span>The number is still even</span>
        </If>
        <If condition={this.state.count % 2 !== 0}>
          <span>The number is odd</span>
        </If>
      </div>
    );
  }
}
```

### Lazy evaluation

In certain scenarios it's important that you conditional content is not rendered unless the predicate passes.
For any of the predicate components, a function can be provided as the child.
```js
<If condition={1 + 1 === 2}>
  {() => <ConditionalComponent />}
</If>
```

```js
class LazyEvaluation extends React.Component {
  state = {person: null};

  createModel() {
    this.setState({
      person: {name: 'Hello World'}
    });
  }

  render() {
    return (
      <div>
        <button onClick={() => this.createModel()}>Create</button>

        <Condition>
          <If condition={!!this.state.person}>
            {() => <Person person={this.state.person} />}
          </If>
          <Else>
            <span>A person does not yet exist</span>
          </Else>
        </Condition>
      </div>
    );
  }
}
```
