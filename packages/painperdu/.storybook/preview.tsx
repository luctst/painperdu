import type { Preview } from "@storybook/react";
import { MemoryRouter, Routes, Route, createMemoryRouter } from 'react-router-dom';
import '../src/style.css';

export const router = createMemoryRouter([
  {
    path: '/',
    element: <div>Heree</div>
  },
  {
    path: 'user',
    element: <div />
  },
  {
    path: 'test',
    element: <div/>,
    children: [
      {
        path: ':id'
      },
      {
        path: 'user/:id'
      },
      {
        path: 'user/test/:test-id'
      },
      {
        path: 'user/test/:test-about'
      },
      {
      }
    ],
  },
  {
    path: 'about',
    element: <div/>,
    children: [
      {
        path: ':id'
      },
      {
        path: 'about/:id'
      },
      {
        path: 'about/test/:test-id'
      },
      {
        path: 'about/test/:test-about'
      },
      {
        path: 'contact'
      },
    ],
  },
  {
    path: 'coucou',
    element: <div/>,
    children: [
      {
        path: ':id'
      },
      {
        path: 'coucou/:id'
      },
      {
        path: 'coucou/test/:test-id'
      },
      {
        path: 'coucou/test/:test-about'
      },
      {
        path: 'contact'
      },
    ],
  },
]);

const preview: Preview = {
  decorators: [
    (Story) => {
      return (
        <MemoryRouter>
          <Routes>
            <Route path="/" element={<Story args={ router.routes } />} />
            <Route path="/test" element={<Story args={ router.routes } />} />
            <Route path="/user" element={<Story args={ router.routes }/>} />
          </Routes>
        </MemoryRouter>
      );
    },
  ],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
