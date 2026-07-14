import { blockImages } from "#shared/utils/extensions";
import { nodeView } from "#shared/utils/connection";
import { Selection } from "@tiptap/extensions";
import { Editor } from "@tiptap/core";

import Highlight from "@tiptap/extension-highlight";
import Document from "@tiptap/extension-document";
import Image from "@tiptap/extension-image";
//--------------------------------------------------------------------------------------------

const lowlight = createLowlight(all);

const details = Details.configure({
	persist: true,
	HTMLAttributes: { class: "details" },
});

const underline = Underline.configure({
	HTMLAttributes: {
		style: "text-underline-offset: 1px; text-decoration-color: #2563eb;",
	},
});

const link = Link.configure({
	openOnClick: false,
	HTMLAttributes: {
		style: "color: #1d4ed8; font-size: 1.125rem; text-decoration: underline; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;",
	},
});

const highlight = Highlight.configure({
	HTMLAttributes: {
		style: "background-color: #bfdbfe; border-radius: 0.375rem; padding: 0.2rem 0.25rem; text-align: center; font-size: 1rem; color: #1d4ed8;",
	},
});

const codelowBlock = CodeBlockLowlight.configure({
	lowlight,
	languageClassPrefix: "language-",
});

const image = Image.configure({
	inline: false,
	allowBase64: false,
});

const characterCount = CharacterCount.configure({
	limit: 2000000,
});

const articleDocument = Document.extend({
	content: "heading block*",
});

//--------------------------------------------------------------------------------------------

const articleStarterKit = StarterKit.configure({
	underline: false,
	document: false,
	link: false,
	trailingNode: false,
	codeBlock: false,
	gapcursor: false,
	bulletList: {
		HTMLAttributes: {
			style: "padding-left: 1.25rem; list-style-type: disc; list-style-position: outside;",
		},
	},
	orderedList: {
		HTMLAttributes: {
			style: "padding-left: 1.5rem; list-style-type: decimal; list-style-position: outside;",
		},
	},
});

//--------------------------------------------------------------------------------------------

const artcilePlaceholder = Placeholder.configure({
	placeholder: ({ node }) => {
		if (node.type.name === "heading") return "Schrijf hier je titel...";
		if (node.type.name === "details") return "";
		return "Schrijf hier je content...";
	},
});

//--------------------------------------------------------------------------------------------

export const articleExtensions = [
	details,
	nodeView,
	blockImages,
	DetailsSummary,
	DetailsContent,
	codelowBlock,
	articleStarterKit,
	Selection,
	image,
	characterCount,
	articleDocument,
	underline,
	link,
	highlight,
	artcilePlaceholder,
];
