import { atom, useSetRecoilState } from 'recoil';
import { getStorage, setStorage } from './utils/chromeStorageEncryption';
import { UpdatedAddress } from '../components/AddressBook/EditAddressDialog';

export type FavAddress = {
  address: string;
  crypto: string;
  moniker: string;
  note?: string;
  img?: string;
};

export const favAddressesState = atom<FavAddress[]>({
  key: 'favAddresses',
  default: (async () => {
    const favAddresses = await getStorage('favAddresses');
    return favAddresses ? JSON.parse(favAddresses) : [];
  })(),
  effects: [
    ({ onSet }) => {
      onSet((addresses) => {
        const favAddresses = JSON.stringify(addresses);
        setStorage({ favAddresses });
      });
    },
  ],
});

export const useFavAddressesMutations = () => {
  const setFavAddresses = useSetRecoilState(favAddressesState);

  const addFavAddresses = (newAddress: FavAddress) => {
    setFavAddresses((vs) => {
      if (vs.find((e) => e.address === newAddress.address)) {
        return vs;
      }
      return [newAddress, ...vs];
    });
  };

  const updateFavAddresses = (updatedAddress: UpdatedAddress) => {
    setFavAddresses((vs) =>
      vs.map((add) => {
        if (add.address === updatedAddress.address) {
          return { ...updatedAddress, address: updatedAddress.newAddress, newAddress: null };
        }
        return add;
      })
    );
  };

  const deleteFavAddresses = (targetAddress: string) => {
    setFavAddresses((vs) =>
      vs.filter((add) => {
        return add.address !== targetAddress;
      })
    );
  };

  return { addFavAddresses, updateFavAddresses, deleteFavAddresses };
};
