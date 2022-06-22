import Avatar from 'components/Element/avatar';
import { formatCoin, formatCoins, formatPercentage } from 'misc/utils';
import React from 'react';
import { Menu, MenuItem } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

const DelegationCard = ({
  chain,
  delegation,
  validator,
}: {
  chain: Chain;
  delegation: Delegation;
  validator?: Validator;
}) => {
  const { address } = useParams();

  const navigate = useNavigate();
  const { t } = useTranslation('account');
  const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>();
  const open = Boolean(menuAnchorEl);

  const handleManageClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setMenuAnchorEl(null);
  };

  const menuOptions = React.useMemo(() => {
    return [
      {
        label: t('staking.delegation.delegate'),
        onClick: () => {},
      },
      {
        label: t('staking.delegation.redelegate'),
        onClick: () => {
          navigate(`/redelegate/${address}/${validator.address}`);
        },
      },
      {
        label: t('staking.delegation.undelegate'),
        onClick: () => {
          navigate(`/undelegate/${address}/${validator.address}`);
        },
      },
      {
        label: t('staking.delegation.withdrawRewards'),
        onClick: () => {},
      },
    ];
  }, [validator]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Avatar size={9} src={validator?.image} />
          <div className="ml-2">
            <h4 className="text-primary-100 leading-none">{validator?.name}</h4>
            <p>Commission: {formatPercentage(validator?.commission)}</p>
          </div>
        </div>
        <button
          onClick={handleManageClick}
          type="button"
          className="bg-primary-100 rounded-md px-4 py-2 text-white nightwind-prevent hover:opacity-80"
        >
          Manage
        </button>
      </div>
      <div>
        <div className="flex justify-between">
          <p>Delegated</p>
          <p>{formatCoin(chain.chainId, delegation.balance)}</p>
        </div>
        <div className="flex justify-between">
          <p>Rewards</p>
          <p>{formatCoins(chain.chainId, delegation.rewards)}</p>
        </div>
      </div>
      <Menu anchorEl={menuAnchorEl} open={open} onClose={handleClose}>
        {menuOptions.map((option) => (
          <MenuItem key={option.label} onClick={option.onClick}>
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default DelegationCard;
