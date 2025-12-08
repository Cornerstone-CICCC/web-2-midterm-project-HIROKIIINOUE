import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { searchMovie } from '../Hooks/useFetch';
import { useMovies } from '../Context/MovieContext';

const SearchBar = () => {
  const [inputValue, setInputValue] = useState("")
  const { setMovies } = useMovies();

  const handleSearch = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    const query = inputValue.trim();
    if (!query) return;
    const results = await searchMovie(query);
    setMovies(results);
  }

  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, height: 60, boxShadow: "0px 10px 20px -5px" }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1, p: '20px' }}
        placeholder="Search Movies"
        inputProps={{ 'aria-label': 'search google maps' }}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <IconButton type="submit" sx={{ p: '20px' }} aria-label="search" onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleSearch(e)}>
        <SearchIcon />
      </IconButton>
    </Paper>
  )
}

export default SearchBar
