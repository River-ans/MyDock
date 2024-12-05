export const SearchIcon = ({
  width = 16,
  height = 16,
  color = 'currentColor',
}) => {
  return (
    <svg
      width={width}
      height={height}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 16 16'
      fill={color}
      className='size-4'
    >
      <path
        fillRule='evenodd'
        d='M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z'
        clipRule='evenodd'
      />
    </svg>
  );
};