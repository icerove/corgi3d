import React, { useCallback, useState } from "react";

const BOATLOAD_OF_GAS = 300000000000000;
const PRICE = "3000000000000000000000000";
const UNIT = "000000000000000000000000";

export const ContractContext = React.createContext();

export const ContractContextProvider = ({ Contract, children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [creating, setCreating] = useState(false);
  const [created, setCreated] = useState(false);
  const [transfering, setTransfering] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [selling, setSelling] = useState(false);
  const [buying, setBuying] = useState(false);

  const [corgis, setCorgis] = useState([]);
  const [corgi, setCorgi] = useState(null);
  const [displayCorgis, setDisplay] = useState([]);

  const createCorgi = useCallback(
    (name, color, backgroundColor, quote) => {
      setCreating(true);
      Contract.create_corgi(
        { name, color, background_color: backgroundColor, quote },
        BOATLOAD_OF_GAS,
        PRICE
      )
        .then(() => {
          setCreating(false);
          setCreated(true);
        })
        .catch((error) => {
          console.log(error);
          setError(error);
        });
      setCreating(false);
      setCreated(true);
    },
    [Contract]
  );

  const transferCorgi = useCallback(
    (receiver, id, message) => {
      setTransfering(true);
      Contract.transfer_with_message(
        { new_owner_id: receiver, token_id: id, message },
        BOATLOAD_OF_GAS
      )
        .then(() => setTransfering(false))
        .catch((error) => {
          console.log(error);
          setError(error);
        });
      setTransfering(false);
    },
    [Contract]
  );

  const deleteCorgi = useCallback(
    (id) => {
      setDeleting(true);
      Contract.delete_corgi({ id }, BOATLOAD_OF_GAS)
        .then(() => {
          setDeleting(false);
          setDeleted(true);
        })
        .catch((error) => {
          console.log(error);
          setError(error);
        });
      setDeleting(false);
      setDeleted(true);
    },
    [Contract]
  );

  const sellCorgi = useCallback(
    (id, price) => {
      setSelling(true);
      Contract.sell_corgi({ id, price }, BOATLOAD_OF_GAS)
        .then(() => {
          setSelling(false);
        })
        .catch((error) => {
          console.log(error);
          setError(error);
        });
      setSelling(false);
    },
    [Contract]
  );

  const buyCorgi = useCallback(
    (id, price) => {
      setBuying(true);
      Contract.buy_corgi({ id }, BOATLOAD_OF_GAS, price + UNIT)
        .then(() => {
          setBuying(false);
        })
        .catch((error) => {
          console.log(error);
          setError(error);
        });
      setBuying(false);
    },
    [Contract]
  );

  const getCorgisList = useCallback(
    async (owner) => {
      setLoading(true);
      try {
        let corgis = await Contract.get_corgis_by_owner({ owner });
        setCorgis(corgis);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        console.log(e);
      }
    },
    [Contract]
  );

  const getCorgiOwner = useCallback(
    async (id) => {
      return await Contract.get_token_owner({ token_id: id });
    },
    [Contract]
  );

  const getCorgi = useCallback(
    async (id) => {
      setLoading(true);
      try {
        let _corgi = await Contract.get_corgi({ id });
        let owner = await getCorgiOwner(_corgi.id);
        _corgi.owner = owner;
        setCorgi(_corgi);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        console.log(e);
      }
    },
    [Contract, getCorgiOwner]
  );

  const getDisplayCorgis = useCallback(async () => {
    setLoading(true);
    try {
      let corgis = await Contract.display_global_corgis();
      setDisplay(corgis);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
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
    deleted,
    buying,
    selling,
    setDeleted,
    setCreated,
    createCorgi,
    deleteCorgi,
    transferCorgi,
    sellCorgi,
    buyCorgi,
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
