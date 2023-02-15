import Data from '../data/dogs.json';
import { useState, useEffect } from 'react';
import Card from './Card';
import InfiniteScroll from 'react-infinite-scroll-component';
import TextField from '@mui/material/TextField';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';

function SearchResults() {
  const resultsPerPage = 4;
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setsearchText] = useState('');
  const [displayData, setDisplayData] = useState({
    items: filteredData,
    hasMore: true,
  });

  // filter and sort data
  useEffect(() => {
    setFilteredData(
      Data.filter((el) => {
        if (searchText.length < 3) {
          return el;
        } else {
          return el.name.toLowerCase().includes(searchText);
        }
      }).sort((a, b) => a.name.localeCompare(b.name)),
    );
  }, [searchText]);

  // slice filtered data
  useEffect(() => {
    console.log('oriznu a zobrazim co potrebuju');
    setDisplayData((prevState) => ({
      ...prevState,
      items: filteredData.slice(0, resultsPerPage),
    }));
  }, [filteredData]);

  //watch for event
  const inputHandler = (e) => {
    const lowerCase = e.target.value.toLowerCase();
    setsearchText(lowerCase);
  };

  // a fake async api call - show more data
  const fetchMoreData = () => {
    const allData = filteredData.length;
    const currentData = displayData.items.length;
    if (currentData >= allData) {
      setDisplayData((prevState) => ({
        ...prevState,
        hasMore: false,
      }));
      return;
    } else {
      setTimeout(() => {
        setDisplayData({
          items: displayData.items.concat(
            filteredData.slice(currentData, currentData + resultsPerPage),
          ),
          hasMore: true,
        });
      }, 500);
    }
  };

  const clearInput = () => {
    setDisplayData((prevState) => ({ ...prevState, hasMore: true }));
    setsearchText('');
  };

  return (
    <>
      <div className="search">
        <TextField
          id="outlined-basic"
          onChange={inputHandler}
          variant="outlined"
          fullWidth
          label="Hledat"
          value={searchText}
        />
        {searchText.length > 2 ? (
          <ClearIcon onClick={() => clearInput()} />
        ) : (
          <SearchIcon />
        )}
      </div>
      <span className="description">
        {filteredData.length > 0
          ? `Zobrazeno ${displayData.items.length} z ${filteredData.length} mazlíčků `
          : 'Jejda, nenasli jsme zadneho mazlíčka'}
      </span>
      <InfiniteScroll
        dataLength={displayData.items.length}
        next={() => fetchMoreData()}
        hasMore={displayData.hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          displayData.items.length > 0 ? (
            <p style={{ textAlign: 'center' }}>
              <b>Jejda! Viděli jste všechny pupíky</b>
            </p>
          ) : null
        }
      >
        <div className="search-results">
          {displayData.items.map((dog) => (
            <Card key={dog.id} dog={dog} />
          ))}
        </div>
      </InfiniteScroll>
    </>
  );
}

export default SearchResults;
