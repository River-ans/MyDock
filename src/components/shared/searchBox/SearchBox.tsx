import { Backdrop } from '../BackDrop';
import { SearchInput } from './SearchInput';
export function SearchBox() {
  return (
    <Backdrop isVisible={true}>
      <SearchInput />
    </Backdrop>
  );
}
