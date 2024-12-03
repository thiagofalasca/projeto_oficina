import React from 'react';
import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import Page from '@/app/users/page';
import users from '@/tests/__mocks__/users.json';

test('renders users page', () => {
  render(<Page />);
  expect(screen.getByText('Users')).toBeDefined();
  users.forEach((user) => {
    expect(screen.getByText(user.nome)).toBeDefined();
  });
});
