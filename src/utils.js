export function renderChildren (children) {
  if (typeof children === 'function') {
    return children();
  }

  return children;
}
