import * as csstree from 'css-tree'
import * as fs from 'fs'
import path from 'path'

import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '../App'

const cssCode = fs.readFileSync(
  path.resolve(__dirname, '../components/EvenOddApp/index.css'),
  'utf8',
)

describe(':::RJSCPM3DAE_TEST_SUITE_1:::Even Odd App tests', () => {
  it(':::RJSCPM3DAE_TEST_1:::Page should initially consist of an HTML heading element with text content as "Count 0":::5:::', () => {
    render(<App />)
    expect(screen.getByRole('heading', {name: /Count 0/i})).toBeInTheDocument()
  })

  it(':::RJSCPM3DAE_TEST_2:::Page should initially consist of an HTML paragraph element with text content as "Count is Even":::5:::', () => {
    render(<App />)
    const paragraphEl = screen.getByText(/Count is Even/i)
    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
  })

  it(':::RJSCPM3DAE_TEST_3:::Page should consist of an HTML button element with text content as "Increment":::5:::', () => {
    render(<App />)
    expect(screen.getByRole('button', {name: /Increment/i})).toBeInTheDocument()
  })

  it(':::RJSCPM3DAE_TEST_4:::Page should consist of an HTML paragraph element with text content as "Increase By Random Number Between 0 to 100":::5:::', () => {
    render(<App />)
    const paragraphEl = screen.getByText(
      /Increase By Random Number Between 0 to 100/i,
    )
    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
  })

  it(':::RJSCPM3DAE_TEST_5:::When the Increment button is clicked, the count should be increased by a random number between zero to hundred:::5:::', () => {
    render(<App />)
    const IncrementButton = screen.getByRole('button', {
      name: /Increment/i,
    })
    jest.spyOn(global.Math, 'random').mockReturnValue(0.16)
    userEvent.click(IncrementButton)
    expect(screen.getByRole('heading', {name: /Count 16/i})).toBeInTheDocument()
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  it(':::RJSCPM3DAE_TEST_6:::CSS code implementation should not contain "display" property with value "none":::5:::', () => {
    render(<App />)
    const ast = csstree.parse(cssCode)
    const displayDeclarations = csstree.findAll(
      ast,
      node => node.type === 'Declaration' && node.property === 'display',
    )
    const displayNoneEl = displayDeclarations.some(
      decl => csstree.generate(decl) === 'display:none',
    )
    expect(displayNoneEl).toBeFalsy()
  })

  it(':::RJSCPM3DAE_TEST_7:::When the Increment button is clicked, and the incremented count is even, then the HTML paragraph element text content should be changed to "Count is Even":::5:::', () => {
    render(<App />)
    const IncrementButton = screen.getByRole('button', {
      name: /Increment/i,
    })
    jest.spyOn(global.Math, 'random').mockReturnValue(0.12)
    userEvent.click(IncrementButton)
    expect(screen.getByText(/Count is Even/i)).toBeInTheDocument()
    expect(screen.queryByText(/Count is Odd/i)).not.toBeInTheDocument()
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  it(':::RJSCPM3DAE_TEST_8:::When the Increment button is clicked, and the incremented count is odd, then the HTML paragraph element text content should be changed to "Count is Odd":::5:::', () => {
    render(<App />)
    const IncrementButton = screen.getByRole('button', {
      name: /Increment/i,
    })
    jest.spyOn(global.Math, 'random').mockReturnValue(0.11)
    userEvent.click(IncrementButton)
    expect(screen.getByText(/Count is Odd/i)).toBeInTheDocument()
    expect(screen.queryByText(/Count is Even/i)).not.toBeInTheDocument()
    jest.spyOn(global.Math, 'random').mockRestore()
  })
})
