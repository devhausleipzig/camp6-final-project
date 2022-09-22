import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ToggleSwitch } from "./ToggleSwitch";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: "Book Share/Components/ToggleSwitch",
	component: ToggleSwitch,
	// More on argTypes: https://storybook.js.org/docs/react/api/argtypes
	argTypes: {},
} as ComponentMeta<typeof ToggleSwitch>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ToggleSwitch> = (args) => (
	<ToggleSwitch {...args} />
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
	pinDesign: 0,
	switchDesign: 1,
};

export const alternatePinDesign = Template.bind({});
alternatePinDesign.args = {
	pinDesign: 1,
	switchDesign: 2,
};

export const Large = Template.bind({});
Large.args = {
	size: "large",
	label: "Button",
};

export const Small = Template.bind({});
Small.args = {
	size: "small",
	label: "Button",
};
