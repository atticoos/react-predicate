import React from 'react';
import {mount} from 'enzyme';
import {Switch, Case, Default} from './switch';

describe('Switch', () => {
  test('matches with a corresponding Case', () => {
    function SwitchTest ({value}) {
      return (
        <Switch on={value}>
          <Case when={1} break><span>1</span></Case>
          <Case when={2} break><span>2</span></Case>
          <Case when={3} break><span>3</span></Case>
          <Case when={4} break><span>4</span></Case>
        </Switch>
      );
    }

    for (let i = 1; i <= 4; i++) {
      expect(mount(
        <SwitchTest value={i} />
      ).text()).toEqual(`${i}`);
    }
  });

  test('matches and falls through', () => {
    function SwitchTest ({value}) {
      return (
        <Switch on={value}>
          <Case when={1}><span>1</span></Case>
          <Case when={2}><span>2</span></Case>
          <Case when={3}><span>3</span></Case>
          <Case when={4}><span>4</span></Case>
        </Switch>
      );
    }

    for (let i = 1; i <= 4; i++) {
      let expectedOutput = '';
      for (let j = i; j <= 4; j++) {
        expectedOutput = `${expectedOutput}${j}`;
      }
      expect(mount(
        <SwitchTest value={i} />
      ).text()).toEqual(expectedOutput);
    }
  });

  test('falls back to default', () => {
    function SwitchTest ({value}) {
      return (
        <Switch on={value}>
          <Case when={1}><span>1</span></Case>
          <Default><span>2</span></Default>
        </Switch>
      );
    }

    expect(mount(
      <SwitchTest value={2} />
    ).text()).toEqual(`2`);
  });

  test('respects break statements', () => {
    function SwitchTest ({value}) {
      return (
        <Switch on={value}>
          <Case when={1}><span>1</span></Case>
          <Case when={2} break><span>2</span></Case>
          <Case when={3}><span>3</span></Case>
          <Case when={4} break><span>4</span></Case>
        </Switch>
      );
    }

    for (let i = 1; i <= 4; i++) {
      let expectedOutput = `${i}`;
      if (i % 2 > 0) {
        expectedOutput = `${expectedOutput}${i + 1}`;
      }

      expect(mount(
        <SwitchTest value={i} />
      ).text()).toEqual(expectedOutput);
    }
  });
});
