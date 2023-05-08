import React from "react";
import debounce from "lodash.debounce"
import styles from "./Search.module.scss"
import { AppContext } from "../../App";


export const Search = () => {
 const [value, setValue] = React.useState();
 const { searchValue, setSearchValue } = React.useContext(AppContext)
 const inputRef = React.useRef();


 function onClickClear() {
        setSearchValue('');
        setValue('');
        inputRef.current.focus();
    };

 const updateSearchValue = React.useCallback(
    debounce((str) => {
       setSearchValue(str);
    }, 2000),
    [],
);

    const onChangeInput = event => {
        setSearchValue(event.target.value);
        updateSearchValue(event.target.value);
    };
   




    return (
        <div className={styles.root}>
        
<svg className={styles.icon} enableBackground="new 0 0 70 70" height="70px" id="Icons" version="1.1" viewBox="0 0 70 70" width="70px" xmlns="http://www.w3.org/2000/svg"><path d="M51.957,49.129l-8.713-8.713c1.75-2.337,2.799-5.229,2.799-8.373c0-7.732-6.268-14-14-14s-14,6.268-14,14s6.268,14,14,14  c3.144,0,6.036-1.049,8.373-2.799l8.713,8.713L51.957,49.129z M22.043,32.043c0-5.514,4.486-10,10-10c5.514,0,10,4.486,10,10  c0,5.514-4.486,10-10,10C26.529,42.043,22.043,37.557,22.043,32.043z"/></svg>
<input
    ref={inputRef}
    value={value}
    onChange={onChangeInput} className={styles.input} placeholder="Поиск пиццы..." />
    {searchValue && (
        <svg onClick={onClickClear} className={styles.clearIcon} data-name="Livello 1" id="Livello_1" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><title/><path d="M64,0a64,64,0,1,0,64,64A64.07,64.07,0,0,0,64,0Zm0,122a58,58,0,1,1,58-58A58.07,58.07,0,0,1,64,122Z"/><path d="M92.12,35.79a3,3,0,0,0-4.24,0L64,59.75l-23.87-24A3,3,0,0,0,35.88,40L59.76,64,35.88,88a3,3,0,0,0,4.25,4.24L64,68.25l23.88,24A3,3,0,0,0,92.13,88L68.24,64,92.13,40A3,3,0,0,0,92.12,35.79Z"/></svg>
    )}
    </div>
    )       
};


export default Search;