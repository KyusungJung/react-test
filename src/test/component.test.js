import React from "react";
import { shallow, mount } from "enzyme";
import renderer from "react-test-renderer";
import User from "../components/User";
import EntryEMail from "../components/EntryEMail";
import HelloWorld from "../components/HelloWorld";

describe("test component", () => {
  test("shllow render User", () => {
    const wrapper = shallow(
      <User
        user={"apple"}
        onMount={() => {}}
        onUpdate={() => {}}
        error={true}
      />
    );

    expect(wrapper.contains("Error Status")).toBeTruthy();
  });

  test("test EMail Component", () => {
    const mockFunc = jest.fn();
    const wrapper = mount(<EntryEMail onClick={mockFunc} />);

    wrapper.find("button").simulate("click");
    expect(mockFunc).toHaveBeenCalled();
  });

  test("renderer HellowWorld", () => {
    const result = renderer.create(<HelloWorld />).toJSON();
    expect(result).toMatchSnapshot();
  });
});
