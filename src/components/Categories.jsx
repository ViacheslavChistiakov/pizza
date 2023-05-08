import React from "react";

function Categories( {value, onClickChoose} ){
    const [activeIndex, setActiveIndex] = React.useState(0);

    const categories = [
        "Все",
        "Мясные",
        "Вегетарианская",
        "Гриль",
        "Острые",
        "Закрытые",
    ]

    // const onClickCategory = (index) => {
    //     setActiveIndex(index); 
    // }



    return(
      <div className="categories">
      <ul>
       {categories.map((categoryName, index) => (
                <li key={index} onClick={() => onClickChoose(index)}
                className={value === index ? "active": ""}
                >{categoryName}
                </li>
            ))}
      </ul>
    </div>
    )
  }

  export default Categories;