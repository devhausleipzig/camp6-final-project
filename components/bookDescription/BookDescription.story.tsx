import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { FaTelegram } from "react-icons/fa";
import { GoLocation } from "react-icons/go";

import { CustomButton } from "../button/Button";
import BookDescription from "./BookDescription";

const tagslist = [
	"Fiction",
	"Comedy",
	"Children’s",
	"Mystery",
	"Horror",
	"Drama",
];

// export const taglist = tagslist.slice(0, randomNumber());

function randomNumber() {
	return Math.floor(Math.random() * 6);
}

export const tagColors = [
	"bg-blue",
	"bg-dustyRose",
	"bg-salmon",
	"bg-yellow",
	"bg-green",
	"bg-linen",
];

// export const colorrr = colorss.slice(0, randomNumber());

export function ExampleTags() {
	return (
		<div className="mt-4 ml-1 flex gap-2">
			{tagslist.map((x, index) => (
				<button
					key={index}
					className={`${
						tagColors[index % tagColors.length]
					} w-fit rounded-lg   px-2  py-1 text-black`}
				>
					<p>{x}</p>
				</button>
			))}
		</div>
	);
}

export default {
	title: "Book Review/BookDescripton",
	component: BookDescription,
	argTypes: {
		backgroundColor: { control: "color" },
	},
} as ComponentMeta<typeof BookDescription>;
const Template: ComponentStory<typeof BookDescription> = (args) => (
	<BookDescription {...args} />
);

export const ExampleBook = Template.bind({});

ExampleBook.args = {
	backgroundColor: "##fef1e0",
	title: "Surviving Franz",
	author: "Furkan",

	description:
		"Franz is a weird IT guy, who teaches in day light and kills by the night Here we are going to witness what is it like to live like a troubled,Typescriptlover",
	image:
		"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.getap.com.tr%2Fwp-content%2Fuploads%2F2018%2F09%2Fkitap.jpg&f=1&nofb=1",
	children: [
		<ExampleTags />,
		<CustomButton functionality="ExternalApp" onClick={() => {}}>
			<FaTelegram />
			Message user
		</CustomButton>,
		<CustomButton functionality="ExternalApp" onClick={() => {}}>
			<GoLocation className="text-white" />
			Open in maps
		</CustomButton>,
	],
};
