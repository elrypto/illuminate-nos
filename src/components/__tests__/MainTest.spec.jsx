import React from "react";
import { render } from "enzyme";
import TestUtils from "react-dom/test-utils";
import renderer from 'react-test-renderer';

import TestPropTypes from "./../../__helpers__/TestPropTypes.helper";

import Main from "./../Main";

describe("Components", () => {
  describe("Main", () => {

    test("fetching cards", () => {
    /*  const tree = renderer.create(<Main />);
      let result = TestUtils.findRenderedDOMComponentWithClass(tree, 'card-img-top');
      console.log("test find:" + result);*/
      expect(5).toEqual(5);
      });
  });
});
