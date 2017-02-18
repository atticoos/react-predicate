import React from 'react';
import {shallow, mount} from 'enzyme';
import {Condition, If, ElseIf, Else} from './condition';

const createIf = (satisfied, value) => (
  <If condition={satisfied}><span>{value}</span></If>
);

test('If', () => {
  const satisfiedOutput = shallow(createIf(true, 'pass'));
  const unsatisfiedOutput = shallow(createIf(false, 'fail'));

  expect(satisfiedOutput.text()).toEqual('pass');
  expect(unsatisfiedOutput.text()).toEqual('');
});

function ConditionTest ({value}) {
  return (
    <Condition>
      <If condition={value === 0}><span>0</span></If>
      <ElseIf condition={value === 1}><span>1</span></ElseIf>
      <ElseIf condition={value === 2}><span>2</span></ElseIf>
      <ElseIf condition={value === 3}><span>3</span></ElseIf>
      <Else><span>4</span></Else>
    </Condition>
  );
}

test('Condition', () => {
  for (let i = 0; i < 5; i++) {
    expect(mount(<ConditionTest value={i} />).text()).toEqual(`${i}`);
  }
});
