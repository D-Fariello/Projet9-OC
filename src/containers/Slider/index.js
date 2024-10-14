import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  // Ensure data is available before sorting
 const byDateDesc = data?.focus?.length
 ? data.focus.sort((evtA, evtB) => new Date(evtB.date) - new Date(evtA.date))
  : [];


// Only set interval if byDateDesc has data
useEffect(() => {
 if (byDateDesc.length > 0) {
   const interval = setInterval(() => {
     setIndex((prevIndex) => (prevIndex + 1) % byDateDesc.length);
   }, 5000); // Slide change every 5 seconds


   return () => clearInterval(interval); // Cleanup interval on unmount
 }


 return undefined; // Return undefined if byDateDesc.length is 0
}, [byDateDesc.length]);


// Show a loading state or empty component if no data is available
if (byDateDesc.length === 0) {
 return <div>Loading...</div>;
}


  return (
    <div className="SlideCardList">
      {byDateDesc.map((event, idx) => (
          <div key={event.title}>
            <div
              className={`SlideCard SlideCard--${
                index === idx ? "display" : "hide"
              }`}
            >
              <img src={event.cover} alt="forum" />
              <div className="SlideCard__descriptionContainer">
                <div className="SlideCard__description">
                  <h3>{event.title}</h3>
                  <p>{event.description}</p>
                  <div className="month__description">{getMonth(new Date(event.date))}</div>
                </div>
              </div>
            </div>
            <div className="SlideCard__paginationContainer">
              <div className="SlideCard__pagination">
                {byDateDesc.map((_, radioIdx) => (
                  <input
                    key={`${byDateDesc[radioIdx].title}-${byDateDesc[radioIdx].date}`}
                    type="radio"
                    name="radio-button"
                    checked={index === radioIdx}
                    onChange={() => setIndex(radioIdx)}
                  />
                ))}
              </div>
            </div>
          </div>
      ))}
    </div>
  );
};

export default Slider;
