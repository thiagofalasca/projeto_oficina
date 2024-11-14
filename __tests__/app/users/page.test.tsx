import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Page from '@/app/users/page';
import users from '@/tests/__mocks__/users.json';

describe('Page Component', () => {
  test('renders a list of users', () => {
    render(<Page />);
    users.forEach((user) => {
      expect(screen.getByText(user.nome)).toBeInTheDocument();
    });
  });
});
