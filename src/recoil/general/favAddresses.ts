import { atom, useRecoilState } from "recoil";

type FavAddress = {
  address: string;
  crypto: string;
  moniker: string;
  note?: string;
  img?: string;
};

export const favAddressesState = atom({
  key: "favAddresses",
  default: [] as FavAddress[],
});

export const useFavAddresses = () => {
  const [favAddresses, setFavAddresses] = useRecoilState(favAddressesState);

  const update = (addresses: FavAddress[]) => {
    setFavAddresses(addresses);
  };

  const addFavAddress = (address: FavAddress) => {
    const exist = favAddresses.some((v) => {
      v.address === address.address;
    });
    if (!exist) {
      const newValidatorsList = [...favAddresses, address];
      update(newValidatorsList);
    }
  };

  return { favAddresses, addFavAddress };
};
