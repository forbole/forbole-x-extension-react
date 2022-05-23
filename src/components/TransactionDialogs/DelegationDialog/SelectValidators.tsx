import {
  Autocomplete,
  Button,
  Box,
  DialogActions,
  DialogContent,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Grid,
  CircularProgress,
  useTheme,
  Slider,
  Card,
} from '@mui/material'
import React from 'react'
import Avatar from '../../Element/avatar'
import { useTranslation } from 'react-i18next'
import useIconProps from '../../../misc/useIconProps'
import DropdownIcon from '../../../components/svg/DropdownIcon'
import { ReactComponent as RemoveIcon } from '../../../assets/images/icons/icon_clear.svg'
import MemoInput from '../../../components/MemoInput'
import { Loadable, useRecoilValueLoadable } from 'recoil'
import { randomizedValidatorsState } from '../../../recoil/validators'

interface SelectValidatorsProps {
  onConfirm(delegations: Array<{ amount: number; validator: Validator }>, memo: string): void
  delegations: Array<{ amount: number; validator: Validator }>
  //   price: number
  validators: Loadable<Validator[]>
  amount: number
  denom: string
  loading: boolean
  account: AccountDetail
  validatorsMap: { [name: string]: Validator }
}

const SelectValidators = ({
  account,
  onConfirm,
  delegations: defaultDelegations,
  validators,
  amount,
  denom,
  loading,
  validatorsMap,
}: SelectValidatorsProps) => {
  const { t } = useTranslation('common')
  const iconProps = useIconProps()
  const [consent, setConsent] = React.useState(true)
  const [memo, setMemo] = React.useState('')
  const [delegations, setDelegations] = React.useState<
    Array<{ amount: string; validator: any; percentage: string; showSlider: boolean }>
  >(
    defaultDelegations
      ? defaultDelegations.map((d) => ({
          amount: d.amount.toString(),
          validator: d.validator,
          percentage: ((100 * d.amount) / amount).toFixed(2),
          showSlider: false,
        }))
      : [{ amount: amount.toString(), validator: {}, percentage: '100', showSlider: false }]
  )

  const randomizedValidators = useRecoilValueLoadable(
    randomizedValidatorsState({
      chainId: account.chain,
    })
  )

  React.useMemo(() => {
    setDelegations((d) =>
      d.map((a, j) =>
        j < delegations.length - 1
          ? {
              ...a,
              percentage: String(((1 / delegations.length) * 100).toFixed(2)) || '',
              amount: String(amount * (1 / delegations.length)),
            }
          : {
              ...a,
              percentage:
                String(
                  (100 - (1 / delegations.length) * (delegations.length - 1) * 100).toFixed(2)
                ) || '',
              amount: String(amount * (1 - (1 / delegations.length) * (delegations.length - 1))),
            }
      )
    )
  }, [delegations.length])

  const totalAmount = React.useMemo(
    () => delegations.map((v) => Number(v.amount)).reduce((a, b) => a + b, 0),
    [delegations]
  )

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault()
        onConfirm(
          delegations
            .filter((v) => v.validator.name && Number(v.amount))
            .map((v) => ({
              validator: v.validator,
              amount: Number(v.amount),
            })),
          memo
        )
      }}
    >
      <Box minHeight={360} maxHeight={600}>
        <Box px={4} display="flex" sx={{ flexDirection: 'row', alignItems: 'flex-start' }}>
          <p>{t('total delegation amount')}</p>
          <p className="font-bold pl-2">{amount}</p>
        </Box>
        <Grid container spacing={4} padding={4}>
          <Grid item xs={6}>
            <Typography gutterBottom>{t('delegate to')}</Typography>
            {delegations.map((v, i) => (
              <Box
                key={i.toString()}
                display="flex"
                alignItems="center"
                ml={delegations.length <= 1 ? 0 : -5}
                mt={i === 0 ? 0 : 1}
              >
                {delegations.length <= 1 ? null : (
                  <IconButton
                    onClick={() => {
                      setDelegations((d) => d.filter((a, j) => j !== i))
                    }}
                  >
                    <RemoveIcon className={`${iconProps} mr-2 flex items-center`} />
                  </IconButton>
                )}
                {Array.isArray(randomizedValidators.contents) && validatorsMap !== null ? (
                  <Autocomplete
                    sx={(t) => ({
                      '.MuiFilledInput-root': { padding: t.spacing(1), paddingRight: t.spacing(1) },
                    })}
                    options={randomizedValidators.contents.map((val) => val)}
                    getOptionLabel={(option) => option.name}
                    openOnFocus
                    fullWidth
                    filterOptions={(options: Validator[], { inputValue }: any) =>
                      options.filter((o) =>
                        (o.name || '').toLowerCase().includes(inputValue.toLowerCase())
                      )
                    }
                    onChange={(_, value: Validator) => {
                      setDelegations((d) =>
                        d.map((a, j) => (j === i ? { ...a, validator: value || {} } : a))
                      )
                    }}
                    renderOption={(props: any, option: any) => {
                      const image = validatorsMap[props.key].image
                      return (
                        <Box
                          {...props}
                          display="flex"
                          alignItems="center"
                          flexDirection="row"
                          width="100%"
                        >
                          <Avatar size={8} src={image || ''} />
                          <Typography sx={{ marginLeft: '8px' }}>{props.key}</Typography>
                        </Box>
                      )
                    }}
                    renderInput={({ InputProps, inputProps, ...params }) => {
                      return (
                        <TextField
                          {...params}
                          variant="filled"
                          placeholder={t('select validator')}
                          inputProps={{
                            ...inputProps,
                            value: v.validator.name,
                          }}
                          // eslint-disable-next-line react/jsx-no-duplicate-props
                          InputProps={{
                            ...InputProps,
                            className: '',
                            disableUnderline: true,
                            startAdornment: v.validator.name ? (
                              <Box mr={1} padding={0}>
                                <Avatar size={8} src={v.validator.image} />
                              </Box>
                            ) : null,
                            endAdornment: (
                              <InputAdornment position="end">
                                <DropdownIcon />
                              </InputAdornment>
                            ),
                          }}
                        />
                      )
                    }}
                  />
                ) : (
                  <div>Loading...</div>
                )}
              </Box>
            ))}
            <Box mt={1}>
              <Button
                variant="text"
                color="secondary"
                onClick={() =>
                  setDelegations((d) => [
                    ...d,
                    { validator: '', amount: '', percentage: '', showSlider: false },
                  ])
                }
              >
                {t('add validator')}
              </Button>
            </Box>
            <Box mt={2}>
              <Typography gutterBottom>{t('memo')}</Typography>
              <MemoInput
                fullWidth
                multiline
                rows={3}
                placeholder={t('description optional')}
                InputProps={{
                  disableUnderline: true,
                }}
                value={memo}
                setValue={setMemo}
                consent={consent}
                setConsent={setConsent}
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Typography gutterBottom>{t('amount')}</Typography>
            {delegations.map((v, i) => (
              <Box position="relative">
                <Box key={i.toString()} display="flex" alignItems="center" mt={i === 0 ? 0 : 1}>
                  <TextField
                    sx={(t) => ({
                      '.MuiInputBase-input': {
                        padding: t.spacing(2),
                      },
                    })}
                    fullWidth
                    variant="filled"
                    placeholder="0"
                    type="number"
                    InputProps={{
                      disableUnderline: true,
                      endAdornment: <InputAdornment position="end">{denom}</InputAdornment>,
                    }}
                    value={v.amount}
                    onChange={(e) =>
                      setDelegations((d) =>
                        d.map((a, j) =>
                          j === i
                            ? {
                                ...a,
                                amount: e.target.value,
                                percentage: ((100 * Number(e.target.value)) / amount).toFixed(2),
                              }
                            : a
                        )
                      )
                    }
                  />
                  {/* isMobile condition: */}
                  <TextField
                    onFocus={() => {
                      setDelegations((d) =>
                        d.map((a, j) =>
                          j === i
                            ? {
                                ...a,
                                showSlider: true,
                              }
                            : a
                        )
                      )
                      const closeSlider = (e) => {
                        if (!e.target.className.includes('MuiSlider')) {
                          window.removeEventListener('click', closeSlider)
                          setDelegations((d) =>
                            d.map((a, j) => ({
                              ...a,
                              showSlider: false,
                            }))
                          )
                        }
                      }
                      setTimeout(() => window.addEventListener('click', closeSlider), 100)
                    }}
                    sx={(theme) => ({
                      width: theme.spacing(16),
                      marginLeft: theme.spacing(2),
                      '.MuiInputBase-input': {
                        padding: theme.spacing(2, 0.5, 2, 0),
                      },
                    })}
                    variant="filled"
                    placeholder="0"
                    type="number"
                    InputProps={{
                      disableUnderline: true,
                      endAdornment: <InputAdornment position="end">%</InputAdornment>,
                    }}
                    // eslint-disable-next-line react/jsx-no-duplicate-props
                    value={v.percentage}
                    onChange={(e) =>
                      setDelegations((d) =>
                        d.map((a, j) =>
                          j === i
                            ? {
                                ...a,
                                percentage: e.target.value,
                                amount: ((amount * Number(e.target.value)) / 100).toFixed(2),
                              }
                            : a
                        )
                      )
                    }
                  />
                </Box>
                {v.showSlider ? (
                  <Card
                    sx={(theme) => ({
                      marginTop: theme.spacing(1),
                      padding: theme.spacing(1, 2),
                      boxShadow: theme.shadows[7],
                      position: 'absolute',
                      zIndex: 1000,
                      left: 0,
                      right: 0,
                    })}
                  >
                    <Slider
                      value={Number(v.percentage) / 100}
                      defaultValue={0.25}
                      aria-labelledby="input-slider"
                      step={0.25}
                      marks
                      min={0}
                      max={1}
                      onChange={(_event, newValue) => {
                        setDelegations((d) =>
                          d.map((a, j) =>
                            j === i
                              ? {
                                  ...a,
                                  percentage: String(
                                    typeof newValue === 'number' ? newValue * 100 : ''
                                  ),
                                  amount: String((amount * Number(newValue || '') * 100) / 100),
                                }
                              : a
                          )
                        )
                      }}
                    />
                  </Card>
                ) : null}
              </Box>
            ))}
          </Grid>
        </Grid>
      </Box>
      <Box pt={3} px={4}>
        <DialogActions>
          <Button
            variant="contained"
            sx={(theme) => ({
              width: '100%',
            })}
            color="primary"
            disabled={
              !delegations.filter((v) => v.validator.name && Number(v.amount)).length ||
              delegations.filter((v) => v.validator === '').length !== 0 ||
              !consent
            }
            type="submit"
          >
            Next
          </Button>
        </DialogActions>
      </Box>
    </form>
  )
}

export default SelectValidators
