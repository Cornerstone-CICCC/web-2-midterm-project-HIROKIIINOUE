import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = () => {
  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', m: '8px', display: 'flex', alignItems: 'center', width: 400 }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1, p: '20px' }}
        placeholder="Search Specific Movie"
        inputProps={{ 'aria-label': 'search google maps' }}

      />
      <IconButton type="button" sx={{ p: '20px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  )
}

export default SearchBar