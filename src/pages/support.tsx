import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
      <div className="mx-4 mt-1">
        <input
          className="bg-surface-100 rounded-lg px-6 py-4 w-full"
          placeholder="Describe your issue"
          value={queryString}
          onChange={(e) => setQueryString(e.target.value)}
        />
      </div>

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
          <div className={`px-4 pt-8 ${index === 0 ? 'pt-6' : ''}`}>
            <h2 className="px-6 pb-4">{e.title}</h2>
            {e.items
              .filter(
                (i) =>
                  i.answer.toLowerCase().search(queryString.toLowerCase()) > -1 ||
                  i.question.toLowerCase().search(queryString.toLowerCase()) > -1
              )
              .map((i) => (
                <div>
                  <CollapseCard question={i.question} answer={i.answer} />
                </div>
              ))}
          </div>
        ))}
      <div className="text-sm text-font-200 p-10 pt-5">
        <p>Your questions are not covered?</p>
        <p>
          Contact us directly at{' '}
          <a href="mailto:info＠forbole.com" target="_blank" rel="noreferrer">
            info＠forbole.com
          </a>
        </p>
      </div>
    </Layout>
  );
};

export default Support;
