import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
  <ContentLoader 
    className="pizza-block"
    speed={2}
    width={280}
    height={460}
    viewBox="0 0 280 460"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle x="15" cx="135" cy="92" r="96" /> 
    <rect x="0" y="197" rx="10" ry="10" width="280" height="24" /> 
    <rect x="0" y="239" rx="0" ry="0" width="280" height="83" /> 
    <rect x="0" y="355" rx="10" ry="10" width="95" height="30" /> 
    <rect x="122" y="351" rx="30" ry="30" width="152" height="45" />
  </ContentLoader>
)

export default Skeleton