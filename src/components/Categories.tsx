import React from "react";



type CategoriesProps = {
  value: number;
  onClickChoose: (index: number) => void;
  
}  

export const Categories: React.FC<CategoriesProps> = React.memo(({value, onClickChoose} ) => {
    const categories = [
        "Все",
        "Мясные",
        "Вегетарианская",
        "Гриль",
        "Острые",
        "Закрытые",
    ]

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
  

})



 