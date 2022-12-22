declare module "storyblok-rich-text-react-renderer" {
  import { ReactNode } from "react";

  export type StoryblokRichtextContentType =
    | "heading"
    | "code_block"
    | "paragraph"
    | "blockquote"
    | "ordered_list"
    | "bullet_list"
    | "list_item"
    | "horizontal_rule"
    | "hard_break"
    | "image"
    | "blok";

  export type StoryblokRichtextMark =
    | "bold"
    | "italic"
    | "strike"
    | "underline"
    | "code"
    | "link"
    | "styled";

  export type StoryblokRichtextContent = {
    type: StoryblokRichtextContentType;
    attrs?: {
      level?: number;
      class?: string;
      src?: string;
      alt?: string;
      title?: string;
      order?: number;
      body?: Array<{
        _uid: string;
      }>;
    };
    marks?: {
      type: StoryblokRichtextMark;
      attrs?: {
        linktype?: string;
        href?: string;
        target?: string;
        anchor?: string;
        uuid?: string;
        class?: string;
      };
    }[];
    text?: string;
    content: StoryblokRichtextContent[];
  };

  export type StoryblokRichtext = {
    type: "doc";
    content: StoryblokRichtextContent[];
  };

  export const NODE_HEADING = "heading";
  export const NODE_CODEBLOCK = "code_block";
  export const NODE_PARAGRAPH = "paragraph";
  export const NODE_QUOTE = "blockquote";
  export const NODE_OL = "ordered_list";
  export const NODE_UL = "bullet_list";
  export const NODE_LI = "list_item";
  export const NODE_HR = "horizontal_rule";
  export const NODE_BR = "hard_break";
  export const NODE_IMAGE = "image";

  export const MARK_BOLD = "bold";
  export const MARK_ITALIC = "italic";
  export const MARK_STRIKE = "strike";
  export const MARK_UNDERLINE = "underline";
  export const MARK_CODE = "code";
  export const MARK_LINK = "link";
  export const MARK_STYLED = "styled";

  export interface RenderOptions {
    blokResolvers?: {
      [key: string]: (props: Record<string, unknown>, index: number) => JSX.Element | null;
    };
    defaultBlokResolver?: (
      name: string,
      props: Record<string, unknown> & { _uid: string },
      index: number
    ) => JSX.Element | null;
    markResolvers?: {
      [MARK_BOLD]?: (children: ReactNode, index: number) => JSX.Element | null;
      [MARK_CODE]?: (children: ReactNode, index: number) => JSX.Element | null;
      [MARK_ITALIC]?: (children: ReactNode, index: number) => JSX.Element | null;
      [MARK_STRIKE]?: (children: ReactNode, index: number) => JSX.Element | null;
      [MARK_UNDERLINE]?: (children: ReactNode, index: number) => JSX.Element | null;
      [MARK_LINK]?: (
        children: ReactNode,
        index: number,
        props: {
          linktype?: string;
          href?: string;
          target?: string;
          anchor?: string;
          uuid?: string;
        }
      ) => JSX.Element | null;
      [MARK_STYLED]?: (
        children: ReactNode,
        index: number,
        props: { class?: string }
      ) => JSX.Element | null;
    };
    nodeResolvers?: {
      [NODE_BR]?: (index: number) => JSX.Element | null;
      [NODE_CODEBLOCK]?: (
        children: ReactNode,
        index: number,
        props: { class: string }
      ) => JSX.Element | null;
      [NODE_HEADING]?: (
        children: ReactNode,
        index: number,
        props: { level: 1 | 2 | 3 | 4 | 5 | 6 }
      ) => JSX.Element | null;
      [NODE_HR]?: (index: number) => JSX.Element | null;
      [NODE_IMAGE]?: (
        children: ReactNode,
        index: number,
        props: {
          alt?: string;
          title?: string;
          src?: string;
        }
      ) => JSX.Element | null;
      [NODE_LI]?: (children: ReactNode, index: number) => JSX.Element | null;
      [NODE_OL]?: (children: ReactNode, index: number) => JSX.Element | null;
      [NODE_PARAGRAPH]?: (children: ReactNode, index: number) => JSX.Element | null;
      [NODE_QUOTE]?: (children: ReactNode, index: number) => JSX.Element | null;
      [NODE_UL]?: (children: ReactNode, index: number) => JSX.Element | null;
    };
    defaultStringResolver?: (str: string, index: number) => JSX.Element;
    textResolver?: (str: string, index: number) => string;
  }

  export function render(
    document: StoryblokRichtext | unknown,
    options?: RenderOptions
  );
}
