import { Backdrop } from '../BackDrop';
import SearchIcon from '@/assets/icons/search.svg';
export function SearchBox() {
  return (
    <Backdrop isVisible={true}>
      <div
        className='w-96 h-12 flex bg-primary-800/70 p-1 rounded-xl
      border border-primary-200/50 shadow-xl shadow-primary-800/40'
      >
        <div className='flex items-center '>
          <div className='px-2'>
            <SearchIcon
              width={18}
              height={18}
              className='text-primary-200/80'
            />
          </div>
          <input
            type='text'
            placeholder='search'
            className='bg-transparent text-primary-100 font-bold
          placeholder:text-primary-200/80    placeholder:text-lg
          placeholder:font-bold focus:outline-none'
          />
        </div>
      </div>
    </Backdrop>
  );
}
