import React, { useReducer, useCallback, useState } from 'react';

const BOATLOAD_OF_GAS = 300000000000000

const [loading, setLoading] = useState(false)
const [error, setError] = useState(null)

const [creating, setCreating] = useState(false)
const [created, setCreated] = useState(false)
const [transfering, setTransfering] = useState(false)
const [deleting, setDeleting] = useState(false)

const [corgis, setCorgis] = useState(null)
const [corgi, setCorgi] = useState(null)
const [displayCorgis, setDisplay] = useState([])

export const ContractContext = React.createContext();

export const ContractContextProvider = ({ Contract, children }) => {

  const createCorgi = useCallback(
    (name, color, backgroundColor, quote) => {
      setCreating(true)
      Contract.createCorgi(
        { name, color, backgroundColor, quote },BOATLOAD_OF_GAS)
        .then(() => {
          setCreating(false)
          setCreated(true)
        })
        .catch((error) => setError(error));
    },
    [Contract]
  );

  const transferCorgi = useCallback(
    (receiver, id, message) => {
      setTransfering(true)
      Contract.transferCorgi({ receiver, id, message }, BOATLOAD_OF_GAS)
        .then(() => setTransfering(false))
        .catch((error) => setError(error));
    },
    [Contract]
  );

  const deleteCorgi = useCallback(
    (id) => {
      setDeleting(true)
      Contract.deleteCorgi({ id }, BOATLOAD_OF_GAS)
        .then(() => setDeleting(ture))
        .catch((error) => dispatchContract({ type: 'FAIL', error }));
    },
    [Contract]
  );

  const getCorgisList = useCallback(
    (owner) => {
      setLoading(true)
      Contract.getCorgisList({ owner })
        .then((corgis) => {
          setCorgis(corgis)
          setLoading(false)
        })
        .catch((error) => setError(error));
    },
    [Contract]
  );

  const getCorgi = useCallback(
    (id) => {
      setLoading(true)
      Contract.getCorgi({ id })
        .then((corgi) => {
          setCorgi(corgi)
          setLoading(false)
        })
        .catch((error) => setError(error));
    },
    [Contract]
  );

  const getDisplayCorgis = useCallback(() => {
    setLoading(true)
    Contract.displayGolbalCorgis()
      .then((corgis) => {
        setDisplay(corgis)
        setLoading(false)
      })
      .catch((error) => setError(error));
  }, [Contract]);

  const value = {
    loading,
    error,
    corgi,
    corgis,
    displayCorgis,
    creating,
    created,
    transfering,
    deleting,
    createCorgi,
    deleteCorgi,
    transferCorgi,
    getCorgi,
    getCorgisList,
    getDisplayCorgis,
  };

  return (
    <ContractContext.Provider value={value}>
      {children}
    </ContractContext.Provider>
  );
};

export default ContractContextProvider;
