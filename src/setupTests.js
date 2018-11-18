/**
 *
 * The utility script for setting up Jest
 *
 */

/* enzyme */
import {
  configure,
  shallow,
  mount,
  render,
} from 'enzyme';

/* enzyme-to-json */
import { createSerializer } from 'enzyme-to-json';

import Adapter from 'enzyme-adapter-react-16';

/* emotion */
import * as emotion from 'emotion';

/* jest-emotion */
import {
  createMatchers,
} from 'jest-emotion';

/* configure enzyme to grab the adaptor for react */
configure({ adapter: new Adapter() });

/* expose enzyme mehods globally */
global.shallow = shallow;
global.mount = mount;
global.render = render;

/* substitue the assertion with additional seializers and matchers */
expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));
expect.extend(createMatchers(emotion));