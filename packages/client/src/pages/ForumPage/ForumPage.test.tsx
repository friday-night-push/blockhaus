import React from 'react';

import { render, screen, waitFor } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';

import { PAGE_ROUTES } from 'src/utils/constants';

import { ForumPage, topicsLoader } from './ForumPage';

test('renders topics links', async () => {
  const routes = [
    {
      path: PAGE_ROUTES.FORUM,
      element: <ForumPage />,
      loader: topicsLoader,
    },
  ];

  const router = createMemoryRouter(routes, {
    initialEntries: [PAGE_ROUTES.FORUM],
  });

  render(<RouterProvider router={router} />);

  await waitFor(() => {
    const announcementLink = screen.getByText('Announcement');
    const complaintsLink = screen.getByText('Complaints');

    expect(announcementLink).toBeInTheDocument();
    expect(announcementLink.getAttribute('href')).toBe(
      `${PAGE_ROUTES.FORUM}/1/1`
    );

    expect(complaintsLink).toBeInTheDocument();
    expect(complaintsLink.getAttribute('href')).toBe(`${PAGE_ROUTES.FORUM}/2`);
  });
});
