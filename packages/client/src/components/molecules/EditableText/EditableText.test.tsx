import { render, screen, fireEvent } from 'src/utils/tests';

import { EditableText } from './EditableText';

describe('EditableText', () => {
  it('renders the label and initial value', () => {
    render(
      <EditableText
        name="test"
        label="Test"
        value="Initial value"
        onChange={() => {
          return;
        }}
      />
    );
    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.getByText('Initial value')).toBeInTheDocument();
  });

  it('displays placeholder text when value is empty', () => {
    render(
      <EditableText
        name={'test'}
        value={''}
        onChange={() => {
          return;
        }}
      />
    );
    expect(screen.getByText('Click to edit')).toBeInTheDocument();
  });

  it('switches to edit mode on click', () => {
    render(
      <EditableText
        name={'test'}
        value={'Initial value'}
        onChange={() => {
          return;
        }}
      />
    );
    fireEvent.click(screen.getByText('Initial value'));
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('updates the value when typed', () => {
    render(
      <EditableText
        name={'test'}
        value={'Initial value'}
        onChange={() => {
          return;
        }}
      />
    );
    fireEvent.click(screen.getByText('Initial value'));
    const input = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'New value' } });
    expect(input.value).toBe('New value');
  });

  it('calls onChange with new value on blur', () => {
    const mockOnChange = jest.fn();
    render(
      <EditableText
        name={'test'}
        value={'Initial value'}
        onChange={mockOnChange}
      />
    );
    fireEvent.click(screen.getByText('Initial value'));
    const input = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'New value' } });
    fireEvent.blur(input);
    expect(mockOnChange).toHaveBeenCalledWith('test', 'New value');
  });

  it('does not call onChange when value is the same', () => {
    const mockOnChange = jest.fn();
    render(
      <EditableText
        name={'test'}
        value={'Initial value'}
        onChange={mockOnChange}
      />
    );
    fireEvent.click(screen.getByText('Initial value'));
    const input = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.blur(input);
    expect(mockOnChange).not.toHaveBeenCalled();
  });
});
