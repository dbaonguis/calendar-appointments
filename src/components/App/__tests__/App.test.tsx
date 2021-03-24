import { shallow, mount } from 'enzyme';
import React from 'react';
import App from './../App';
import Root  from './../../../Root';
import AppContainer from './../AppContainer';
import CalendarDay from './../../CalendarDay/CalendarDay';

describe('Main Calendar App/Screen', () => {
  test('renders disconnected App without crashing', () => {
    shallow(<App onFabAddClick={()=>{}} />);
  });

  test('renders the connected App without crashing', () => {
    mount(<Root><AppContainer /></Root>);
  });

  test('renders the connected App with the current date in store', () => {
    const wrapper = mount(<Root><AppContainer /></Root>);
    expect(wrapper.contains(App)).toBe(true);
  });

  test('renders the connected App with 42 \'CalendarDay\' components', () => {
    const wrapper = mount(<Root><AppContainer /></Root>);
    expect(wrapper.find(CalendarDay)).toHaveLength(42);
  });

  test('shows the Add Reminder dialog box when the main (+ / green) button is clicked', () => {
    const wrapper = mount(<Root><AppContainer /></Root>);
    wrapper.find('Fab[aria-label="Add"]').simulate('click');
    const addReminder = wrapper.find('AddReminder');
    expect(addReminder.prop('isOpen')).toBe(true);
  });
});