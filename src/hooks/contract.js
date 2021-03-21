import React, { useCallback, useState } from 'react';

const BOATLOAD_OF_GAS = 300000000000000

export const ContractContext = React.createContext();

export const ContractContextProvider = ({ Contract, children }) => {

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [creating, setCreating] = useState(false)
  const [created, setCreated] = useState(false)
  const [transfering, setTransfering] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const [corgis, setCorgis] = useState(null)
  const [corgi, setCorgi] = useState(null)
  const [displayCorgis, setDisplay] = useState([])

  const createCorgi = useCallback(
    (name, color, backgroundColor, quote) => {
      setCreating(true)
      Contract.create_corgi(
        { name, color, background_color: backgroundColor, quote },BOATLOAD_OF_GAS)
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
      Contract.transfer_with_message({ receiver, id, message }, BOATLOAD_OF_GAS)
        .then(() => setTransfering(false))
        .catch((error) => setError(error));
    },
    [Contract]
  );

  const deleteCorgi = useCallback(
    (id) => {
      setDeleting(true)
      Contract.delete_corgi({ id }, BOATLOAD_OF_GAS)
        .then(() => setDeleting(false))
        .catch((error) => setError(error));
    },
    [Contract]
  );

  const getCorgisList = useCallback(
    (owner) => {
      setLoading(true)
      Contract.get_corgis_by_owner({ owner })
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
      Contract.get_corgi({ id })
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
    Contract.display_global_corgis()
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
    setCreated,
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
