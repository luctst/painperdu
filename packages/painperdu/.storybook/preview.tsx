import type { Preview } from "@storybook/react";
import { MemoryRouter, Routes, Route, createMemoryRouter } from 'react-router-dom';
import '../src/index.css';

export const router = createMemoryRouter([
  {
    path: '/',
    element: <div>Heree</div>
  },
  {
    path: '/test',
    element: <div/>
  },
  {
    path: '/user',
    element: <div />
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
