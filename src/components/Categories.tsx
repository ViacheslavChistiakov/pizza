import React from "react";


type CategoriesProps = {
  value: number;
  onClickChoose: any;
  
}  

const Categories: React.FC<CategoriesProps> = ( {value, onClickChoose} ) => {
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
  

}



  export default Categories;