import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import MarkIcon from '../icons/Remark';
import Navlink from '../navlink/Navlink';
import InputField from '../input/InputField';
import Magnifier from '../icons/Magnifier';
import { ReusableButton, ReusableDropdown, ReusableWrapper }
  from '../common/ReusableElements';
import data from './data.json';
import './searchanything.scss';
import { useSearchContext } from '../../context/SearchContext';

const { defaultSearch, searchData } = data;

const SearchInputField = ({ handleChange }) => (
  <InputField
    type="text"
    name="searchLocation"
    placeholderText="Search for anything..."
    classNames="searchanything-text-field inherit-bg searchlocation"
    handleChange={handleChange}
    autoComplete="off"
  />
);

const DefaultSearchCategories = () => (
  <div className="search-padding">
    <div className="search-result-head">
      cuisines
    </div>
    <div className="row">
      {defaultSearch.map(searchList => (
        <Navlink
          href={`/search?q=${searchList.split(' ').join('-')}`}
          classNames="col-6 defualt-search-category pointer text-dark"
        >
          <div
            key={searchList}
            className="col-12 px-0 defualt-search-category"
          >
            {searchList}
          </div>
        </Navlink>
      ))}
    </div>
  </div>
);

const SearchHead = ({ title }) => (
  <div className="search-result-head p-3">
    {title}
  </div>
);

const SearchItem = ({ searchObj }) => (
  <Navlink
    href={`/search?q=${searchObj.title.split(' ').join('-')}`}
    classNames="search-link pointer"
  >
    <div className="row px-3 py-1 pointer">
      <div className="col-12 text-dark search-category">
        {searchObj.title}
        <span className="icon">
          <MarkIcon />
        </span>
      </div>
      <div className="col-12 text-muted font-size14">{searchObj.location}</div>
    </div>
  </Navlink>
);

const ViewAllSearch = ({ searchText }) => (
  <Fragment>
    <hr />
    <div className="row px-3 pt-1 pb-2 pointer">
      <div className="col-12 text-color search-text">
        View all results for {'"'}{searchText}{'"'}
      </div>
    </div>
  </Fragment>
);

const SearchTextMatch = ({ matchText }) => (
  matchText &&
  <div className="row px-3 pt-1 pb-2 pointer">
    <div className="col-10 text-muted search-text">
      {matchText}
    </div>
    <span className="pb-3 icon">
      <Magnifier />
    </span>
  </div>
);

const headerTexts = ['for delivery', 'for pickup', 'items'];

const lists = ['delivery', 'pickup', 'items'];

const SearchLists = ({ item }) => (
  <Fragment>
    {searchData.map(search => (
      search.items.map((itm) => {
        if (itm.includes(item)) {
          return (
            <Navlink
              classNames="link"
              key={item.slug}
              href={`/search?q=${item.split(' ').join('-')}`}
            >
              <SearchTextMatch matchText={itm} />
            </Navlink>
          );
        }
        return null;
      })
    ))}

    {lists.map((list, index) => (
      <Fragment key={list + index}>
        <hr className="my-1" />
        <SearchHead title={headerTexts[index]} />
        {searchData.map((search) => {
          if (search.type === list) {
            return <SearchItem searchObj={search} />;
          }
          return null;
        })}
      </Fragment>
    ))}
    <ViewAllSearch searchText={item} />
  </Fragment>
);

const SearchAnything = (props) => {
  const { setSearch } = useSearchContext();
  const [search, setState] = useState('');

  const handleChange = ({ target: { value } }) => {
    setSearch(value);
    setState(value);
  };

  return (
    <ReusableWrapper>
      <ReusableButton classNames="inherit-bg" {...props}>
        <span className="current-location-button-icon custom-mt-minus19">
          <Magnifier />
        </span>
        <div>
          <div className="current-location-button-text">
            <SearchInputField handleChange={handleChange} />
          </div>
        </div>
      </ReusableButton>
      {props.focus &&
      <ReusableDropdown classNames="search-anything-scene">
        <div className="search-result-content">
          <div>
            {search === '' ?
              <DefaultSearchCategories />
              : <SearchLists item={search} />
            }
          </div>
        </div>
      </ReusableDropdown>
      }
    </ReusableWrapper>
  );
};

export default SearchAnything;

SearchLists.defaultProps = {
  searchText: ''
};

ViewAllSearch.propTypes = {
  searchText: PropTypes.string.isRequired
};

SearchAnything.defaultProps = {
  handleSearch: () => {},
};

SearchAnything.propTypes = {
  handleSearch: PropTypes.func,
  focus: PropTypes.bool.isRequired
};

SearchInputField.propTypes = {
  handleChange: PropTypes.func.isRequired
};

SearchHead.propTypes = {
  title: PropTypes.string.isRequired
};

SearchLists.defaultProps = {
  item: ''
};

SearchLists.propTypes = {
  item: PropTypes.string,
};

SearchItem.propTypes = {
  searchObj: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.arrayOf(
        PropTypes.string
      )
    ])
  ).isRequired
};
