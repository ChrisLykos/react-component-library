import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { userEvent } from '@testing-library/user-event'
import { createRef } from "react"

import { Button } from "./Button";


describe('Button', () => {
    it('renders with an accessible name', () => {
        render(<Button>Save</Button>)

        expect(
            screen.getByRole('button', { name: 'Save' }),
        ).toBeInTheDocument()
    })

    it('uses "button" as the default type', () => {
        render(<Button>Save</Button>)

        expect(
            screen.getByRole('button', { name: 'Save' }),
        ).toHaveAttribute('type', 'button')
    })

    it('allows the type attribute to be overridden', () => {
        render(<Button type="submit">Save</Button>)

        expect(
            screen.getByRole('button', { name: 'Save' }),
        ).toHaveAttribute('type', 'submit')
    })

    it('calls onClick when clicked', async () =>{
        const user = userEvent.setup()
        const handleClick = vi.fn()

        render(<Button onClick={handleClick}>Save</Button>)

        await user.click(
            screen.getByRole('button', { name: 'Save' }),
        )

        expect(handleClick).toHaveBeenCalledOnce()
    })

    it('does not call onClick when disabled', async () =>{
        const user = userEvent.setup()
        const handleClick = vi.fn()

        render(<Button disabled onClick={handleClick}>Save</Button>)

        await user.click(
            screen.getByRole('button', { name: 'Save' }),
        )

        expect(handleClick).not.toHaveBeenCalled()
    })

    it('forwards native button atributes', () => {
        render(<Button name="action" value="save">Save</Button>)

        const button = screen.getByRole('button', { name: 'Save'})

        expect(button).toHaveAttribute('name', 'action')
        expect(button).toHaveAttribute('value', 'save')
    })

    it('preserves a custom className', () => {
        render(<Button className="custom-class">Save</Button>)

        expect(
            screen.getByRole('button', { name: 'Save' }),
        ).toHaveClass('custom-class')
    })

    it('forwards the ref to the native button', () => {
        const ref = createRef<HTMLButtonElement>()

        render(<Button ref={ref}>Save</Button>)

        expect(ref.current).toBe(
            screen.getByRole('button', { name: 'Save' }),
        )
    })
})