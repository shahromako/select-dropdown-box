import { useState, FC, useRef, useEffect } from 'react';
import './style.scss';

type OptionType = { [key: string]: any }

interface Props {
  defaultValue?: string;
  options: OptionType[] | undefined;
  placeholder: string;
  onClick?: (item: OptionType) => void;
  onPaginate: (limit: number) => void;
  totalRow: number;
  perPage: number;
  searchKey: string;
  loading: boolean;
}

export const Select: FC<Props> = (props) => {
  let {
    defaultValue,
    placeholder,
    onClick,
    options,
    onPaginate,
    totalRow,
    perPage,
    searchKey,
    loading,
  } = props;

  const ref = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState<string>('');
  const [limit, setLimit] = useState<number>(perPage);

  const loadData = () => {
    if (
      ref.current?.offsetHeight &&
      ref.current?.scrollTop &&
      (ref.current?.offsetHeight + ref.current?.scrollTop >= ref.current?.scrollHeight)
    ) {
      if (options && options.length < totalRow) {
        setLimit(prev => prev + perPage);
        onPaginate(limit);
      }
    }
  };

  const filterOptions = () => {
    return options?.filter(option => option[searchKey].toLocaleLowerCase().search(value.toLocaleLowerCase()) !== -1);
  };

  useEffect(() => {
    if (options && defaultValue) {
      const option = options.find(option => option.id === Number(defaultValue));
      setValue(option?.first_name);
      console.log(option)
    }
  }, [defaultValue, options])

  const menuItems = filterOptions()?.map((option, key) => (
    <span
      className="dropdown-item"
      onClick={() => {
        setValue(option[searchKey]);
        onClick && onClick(option);
      }}
      key={key}
    >
      {option[searchKey]}
    </span>
  ));

  return (
    <div className="Select">
      <div className="dropdown">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="select-input"
          id="select-input"
          data-toggle="dropdown"
          aria-haspopup="true"
        />
        <div className="dropdown-menu" aria-labelledby="select-input" ref={ref} onScroll={loadData}>
          {options && options.length > 0 ? menuItems : <span className="dropdown-item disabled">No items found</span>}
          {loading ? <span className="dropdown-item disabled">Loading...</span> : null}
        </div>
      </div>
    </div>
  );
};
