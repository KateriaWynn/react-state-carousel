import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Carousel from './Carousel';

// smoke test
it('renders without crashing', () => {
  render(<Carousel />);
});

// snapshot test
it('matches snapshot', () => {
  const { asFragment } = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
});

it('works when you click on the right arrow', function () {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(
    queryByAltText('Photo by Richard Pasquarella on Unsplash')
  ).toBeInTheDocument();
  expect(
    queryByAltText('Photo by Pratik Patel on Unsplash')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId('right-arrow');
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    queryByAltText('Photo by Richard Pasquarella on Unsplash')
  ).not.toBeInTheDocument();
  expect(
    queryByAltText('Photo by Pratik Patel on Unsplash')
  ).toBeInTheDocument();
});

it('works when you click on the left arrow', () => {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // move forward in carousel
  const rightArrow = queryByTestId('right-arrow');
  fireEvent.click(rightArrow);

  // expect second image to show, but not the first
  expect(
    queryByAltText('Photo by Pratik Patel on Unsplash')
  ).toBeInTheDocument();
  expect(
    queryByAltText('Photo by Richard Pasquarella on Unsplash')
  ).not.toBeInTheDocument();

  // move back in the carousel
  const leftArrow = queryByTestId('left-arrow');
  fireEvent.click(leftArrow);

  // expect first image to show, but not the second
  expect(
    queryByAltText('Photo by Richard Pasquarella on Unsplash')
  ).toBeInTheDocument();
  expect(
    queryByAltText('Photo by Pratik Patel on Unsplash')
  ).not.toBeInTheDocument();
});

it('hides left arrow on first image and right arrow on last image', () => {
  const { queryByTestId, queryByAltText } = render(<Carousel />);
  const rightArrow = queryByTestId('right-arrow');
  const leftArrow = queryByTestId('left-arrow');

  // expect first image to show, but not second image
  // expect left arrow to be hidden
  expect(
    queryByAltText('Photo by Richard Pasquarella on Unsplash')
  ).toBeInTheDocument();
  expect(
    queryByAltText('Photo by Pratik Patel on Unsplash')
  ).not.toBeInTheDocument();
  expect(leftArrow).toHaveClass('hidden');
  expect(rightArrow).not.toHaveClass('hidden');

  // move forward in carousel
  // expect both arrows to be visible
  fireEvent.click(rightArrow);

  expect(leftArrow).not.toHaveClass('hidden');
  expect(rightArrow).not.toHaveClass('hidden');

  // move forward in carousel again
  fireEvent.click(rightArrow);

  // expect third image to show, but not second image
  // expect right arrow to be hidden
  expect(queryByAltText('Photo by Josh Post on Unsplash')).toBeInTheDocument();
  expect(
    queryByAltText('Photo by Pratik Patel on Unsplash')
  ).not.toBeInTheDocument();
  expect(rightArrow).toHaveClass('hidden');
  expect(leftArrow).not.toHaveClass('hidden');
});

it('hides right arrow on last image', () => {
  const { queryByTestId, queryByAltText } = render(<Carousel />);
});
