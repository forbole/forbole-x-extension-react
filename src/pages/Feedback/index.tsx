import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useTheme, Box, Button, CircularProgress, Typography } from '@mui/material';
import CustomInput from 'components/inputs/CustomInput';
import Layout from 'components/Layout/layout';
import MUIDropdown from 'components/MUIDropdown';
import { useNavigate } from 'react-router';
import SuccessDialog from './components/SuccessDialog';

const Feedback = () => {
  const { t } = useTranslation('feedback');
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = React.useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = React.useState(false);
  const [category, setCategory] = React.useState(undefined);
  const theme = useTheme();
  const navigate = useNavigate();

  const dropdownValues = [t('category.feedback'), t('category.issue'), t('category.others')];

  const onSubmit = React.useCallback(
    async (args: { name: string; subject: string; message: string }) => {
      try {
        setLoading(true);

        /**
         * CBA to learn how to get react-hook-form to work with MUI select, so just inject it into
         * the request like so:
         */
        await fetch('/api/contact-us', {
          method: 'POST',
          body: JSON.stringify({ ...args, category }),
        });

        setLoading(false);
        setShowSuccessDialog(true);
        setCategory('');
        reset();

        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    },
    []
  );

  return (
    <Layout title={t('tabName')} backCallback={() => navigate(-1)}>
      <Box
        sx={{
          padding: 2,
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <CustomInput
            label={t('email.label')}
            placeholder={t('email.placeholder')}
            register={register}
            name="name"
            options={{ required: true }}
          />
          <CustomInput
            label={t('subject.label')}
            placeholder={t('subject.placeholder')}
            register={register}
            name="subject"
            options={{ required: true }}
          />

          <MUIDropdown
            label={t('category.label')}
            selectedValue={category}
            values={dropdownValues}
            onChange={setCategory}
            placeholder={t('category.placeholder')}
          />

          <CustomInput
            label={t('message.label')}
            placeholder={t('message.placeholder')}
            register={register}
            name="message"
            multiline
          />

          <Button type="submit" variant="contained" fullWidth disabled={loading}>
            {loading ? (
              <CircularProgress size={theme.spacing(3.5)} />
            ) : (
              <Typography variant="subtitle2">{t('common:next')}</Typography>
            )}
          </Button>
        </form>
        <SuccessDialog isOpen={showSuccessDialog} onClose={() => setShowSuccessDialog(false)} />
      </Box>
    </Layout>
  );
};

export default Feedback;
