import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import CollapseCard from '../components/Element/collapseCard';
import Layout from '../components/Layout/layout';

const Support = () => {
  const { t } = useTranslation('support');

  const [qnaList] = useState([
    {
      title: t('qna.tutorial.title'),
      items: [
        {
          question: t('qna.tutorial.q1.question'),
          answer: t('qna.tutorial.q1.answer'),
        },
      ],
    },
    {
      title: t('qna.gettingStarted.title'),
      items: [
        {
          question: t('qna.gettingStarted.q1.question'),
          answer: t('qna.gettingStarted.q1.answer'),
        },
        {
          question: t('qna.gettingStarted.q2.question'),

          answer: t('qna.gettingStarted.q2.answer'),
        },
      ],
    },
    {
      title: t('qna.assets.title'),
      items: [
        {
          question: t('qna.assets.q1.question'),
          answer: t('qna.assets.q1.answer'),
        },
      ],
    },
    {
      title: t('qna.security.title'),
      items: [
        {
          question: t('qna.security.q1.question'),
          answer: t('qna.security.q1.answer'),
        },
        {
          question: t('qna.security.q2.question'),

          answer: t('qna.security.q2.answer'),
        },
        {
          question: t('qna.security.q3.question'),

          answer: t('qna.security.q3.answer'),
        },
        {
          question: t('qna.security.q4.question'),

          answer: t('qna.security.q4.answer'),
        },
        {
          question: t('qna.security.q5.question'),

          answer: t('qna.security.q5.answer'),
        },
        {
          question: t('qna.security.q6.question'),

          answer: t('qna.security.q6.answer'),
        },
      ],
    },
    {
      title: t('qna.staking.title'),
      items: [
        {
          question: t('qna.staking.q1.question'),
          answer: t('qna.staking.q1.answer'),
        },
        {
          question: t('qna.staking.q2.question'),

          answer: t('qna.staking.q2.answer'),
        },
        {
          question: t('qna.staking.q3.question'),

          answer: t('qna.staking.q3.answer'),
        },
        {
          question: t('qna.staking.q4.question'),

          answer: t('qna.staking.q4.answer'),
        },
        {
          question: t('qna.staking.q5.question'),

          answer: t('qna.staking.q5.answer'),
        },
        {
          question: t('qna.staking.q6.question'),

          answer: t('qna.staking.q6.answer'),
        },
        {
          question: t('qna.staking.q7.question'),

          answer: t('qna.staking.q7.answer'),
        },
        {
          question: t('qna.staking.q8.question'),

          answer: t('qna.staking.q8.answer'),
        },
        {
          question: t('qna.staking.q9.question'),

          answer: t('qna.staking.q9.answer'),
        },
        {
          question: t('qna.staking.q10.question'),

          answer: t('qna.staking.q10.answer'),
        },
        {
          question: t('qna.staking.q11.question'),

          answer: t('qna.staking.q11.answer'),
        },
      ],
    },
    {
      title: t('qna.other.title'),
      items: [
        {
          question: t('qna.other.q1.question'),
          answer: t('qna.other.q1.answer'),
        },
      ],
    },
  ]);

  const [queryString, setQueryString] = useState<string>('');

  return (
    <Layout title="Support">
      <Box sx={{ paddingX: 2, paddingTop: 0.5 }}>
        <input
          className="bg-surface-100 rounded-lg px-6 py-4 w-full"
          placeholder="Describe your issue"
          value={queryString}
          onChange={(e) => setQueryString(e.target.value)}
        />
      </Box>

      {qnaList
        .filter((e) =>
          queryString
            ? e.items.find(
                (item) =>
                  item.answer.toLowerCase().search(queryString.toLowerCase()) > -1 ||
                  item.question.toLowerCase().search(queryString.toLowerCase()) > -1
              )
            : e
        )
        .map((e, index) => (
          <Box sx={{ paddingX: 2, paddingTop: index === 0 ? 3 : 4 }}>
            <Typography variant="h4" sx={{ paddingX: 3, paddingBottom: 0.5 }}>
              {e.title}
            </Typography>
            {e.items
              .filter(
                (i) =>
                  i.answer.toLowerCase().search(queryString.toLowerCase()) > -1 ||
                  i.question.toLowerCase().search(queryString.toLowerCase()) > -1
              )
              .map((i) => (
                <CollapseCard question={i.question} answer={i.answer} />
              ))}
          </Box>
        ))}
      <Box sx={{ padding: 5, paddingTop: 2 }}>
        <Typography variant="body2">{t('contact.questions')}</Typography>
        <Trans>
          <Typography variant="body2">
            {t('contact.contactUs')}{' '}
            <a href="mailto:info＠forbole.com" target="_blank" rel="noreferrer">
              info＠forbole.com
            </a>
          </Typography>
        </Trans>
      </Box>
    </Layout>
  );
};

export default Support;
