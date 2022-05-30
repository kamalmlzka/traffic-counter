interface buttonizeProps {
  role: 'button';
  tabIndex: number;
  onClick: () => void;
  onKeyDown: (event: React.KeyboardEvent) => void; // eslint-disable-line
}

export default function buttonize(callback: () => void): buttonizeProps {
  return {
    role: 'button',
    tabIndex: 0,
    onClick: callback,
    onKeyDown: (event: React.KeyboardEvent) => {
      if (event.key === ' ' || event.key === 'Enter') (event.target as HTMLElement).click();
    },
  };
}
