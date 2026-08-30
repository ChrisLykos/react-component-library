import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { userEvent } from "@testing-library/user-event";
import { useState, createRef } from "react";

import { Input } from "./Input";

describe("Input", () => {
  it("can be associated with a label", () => {
    render(
      <>
        <label htmlFor="email">Email</label>
        <Input id="email" />
      </>,
    );

    expect(screen.getByRole("textbox", { name: "Email" })).toBeInTheDocument();
  });

  it("calls onChange when the user types", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<Input aria-label="Name" onChange={handleChange} />);

    await user.type(screen.getByRole("textbox", { name: "Name" }), "Chris");

    expect(handleChange).toHaveBeenCalled();
  });

  it("update its value when used as an uncontrolled input", async () => {
    const user = userEvent.setup();

    render(<Input aria-label="Name" defaultValue="Chris" />);

    const input = screen.getByRole("textbox", { name: "Name" });

    await user.type(input, " Lykos");

    expect(input).toHaveValue("Chris Lykos");
  });

  it("update its value when used as an controlled input", async () => {
    const user = userEvent.setup();

    function ControlledInput() {
      const [value, setValue] = useState("Chris");

      return (
        <Input
          aria-label="Name"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      );
    }

    render(<ControlledInput />);

    const input = screen.getByRole("textbox", { name: "Name" });

    await user.clear(input);
    await user.type(input, "Alex");

    expect(input).toHaveValue("Alex");
  });

  it("forwards the aria-invalid state", () => {
    render(<Input aria-label="Email" aria-invalid="true" />);

    expect(screen.getByRole("textbox", { name: "Email" })).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });

  it("does not allow typing when disabled", async () => {
    const user = userEvent.setup();

    render(<Input aria-label="Name" disabled />);

    const input = screen.getByRole("textbox", { name: "Name" });

    await user.type(input, "Chris");

    expect(input).toHaveValue("");
  });

  it("forwards the ref to the native input", () => {
    const ref = createRef<HTMLInputElement>();

    render(<Input ref={ref} aria-label="Name" />);

    expect(ref.current).toBe(screen.getByRole("textbox", { name: "Name" }));
  });

  it("forwards native input attributes", () => {
    render(
      <Input
        aria-label="Email"
        name="email"
        placeholder="you@example.com"
        required
      />,
    );

    const input = screen.getByRole("textbox", { name: "Email" });

    expect(input).toHaveAttribute("name", "email");
    expect(input).toHaveAttribute("placeholder", "you@example.com");
    expect(input).toBeRequired();
  });
});
