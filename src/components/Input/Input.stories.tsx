import type { Meta, StoryObj } from "@storybook/react-vite";

import { Input } from "./Input";

const meta = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  args: {
    id: "name",
    type: "text",
    placeholder: "Enter your name",
    disabled: false,
    required: false,
    "aria-invalid": false,
  },
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "search", "tel", "url"],
    },
    disabled: {
      control: "boolean",
    },
    required: {
      control: "boolean",
    },
    "aria-invalid": {
      control: "boolean",
    },
  },
  render: (args) => (
    <>
      <label htmlFor={args.id}>Name</label>
      <Input {...args} />
    </>
  ),
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const Disabled = {
  args: {
    disabled: true,
  },
} satisfies Story;

export const Required = {
  args: {
    required: true,
  },
} satisfies Story;

export const Invalid = {
  args: {
    "aria-invalid": true,
    "aria-describedby": "name-error",
  },
  render: (args) => (
    <>
      <label htmlFor={args.id}>Name</label>
      <Input {...args} />
      <p id="name-error">Please enter a valid name</p>
    </>
  ),
} satisfies Story;
