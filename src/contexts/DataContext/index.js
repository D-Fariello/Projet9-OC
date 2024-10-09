import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const DataContext = createContext({});

export const api = {
  loadData: async () => {
    const json = await fetch("/events.json");
    return json.json();
  },
};

export const DataProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  // Creation of a new ordered table eventByDateDesc from data.events, with the events sorted by date from most recent to oldest.
  const eventsByDateDesc =
    data && data.events
      ? [...data.events].sort((evtA, evtB) =>
          new Date(evtA.date) < new Date(evtB.date) ? 1 : -1
        )
      : [];

  // Define last to retrieve data from the most recent event (ordered table eventsByDateDesc). If the table is empty, last is null, fixing the footer display bug (last provider shown).
  const last = eventsByDateDesc.length > 0 ? eventsByDateDesc[0] : null;

  const getData = useCallback(async () => {
    try {
      setData(await api.loadData());
    } catch (err) {
      setError(err);
    }
  }, []);
  useEffect(() => {
    if (data) return;
    getData();
  });
  
  return (
    <DataContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        data,
        error,
        last,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const useData = () => useContext(DataContext);

export default DataContext;
