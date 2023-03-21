import { render } from '@testing-library/react';
import NewToDoForm from './NewToDoForm';

test('renders without crashing', () => {
  render(<NewToDoForm />);
});