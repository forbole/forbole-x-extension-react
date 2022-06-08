import React, { useState } from 'react'
import CollapseCard from '../components/Element/collapseCard'
import Layout from '../components/Layout/layout'

const Support = () => {
  const [qnaList] = useState([
    {
      title: 'Tutorials',
      items: [
        {
          question: 'How to Manage Your Tokens on Forbole X?',
          answer:
            'Forbole X is an all-round crypto management tool for general users aimed at driving wide-adoption of crypto through gamification and education. \n [This guide](http://forbole.com "This guide") will walk you through the basic setup and features of Forbole X',
        },
      ],
    },
    {
      title: 'Getting Started',
      items: [
        {
          question: 'How to install and set up Forbole X?',
          answer:
            'Go to the Chrome Web Store and download the [Forbole X Extension](http://x.forbole.com "Forbole X Extension").  To kick start, you may: \n 1. Create a new wallet (Step by step guide you once you’ve installed Forbole X) \n 2. Import your existing wallet with four options \n  - Input 12 or 24-word secret recovery phrase backup \n    - Enter your password and encrypted secret recovery phrase backup \n    - Connect your Ledger Nano S or Nano X to start \n    - Entering your private key',
        },
        {
          question: 'Does Forbole X support Ledger Nano hardware wallets?',
          answer: 'Yes. Import your existing wallet by connecting your Ledger Nano.',
        },
      ],
    },
    {
      title: 'Assets',
      items: [
        {
          question: 'What tokens do Forbole X support?',
          answer: 'Forbole X currently only supports $DSM. ',
        },
      ],
    },
    {
      title: 'Security',
      items: [
        { question: 'Does Forbole X store my private key?', answer: '' },
        { question: 'What is the Secret Recovery Phrase and why is it so important? ', answer: '' },
        { question: 'I lost my secret recovery phrase. Can I restore my wallet?', answer: '' },
        { question: 'I forgot my Forbole X unlock password, how can I reset it?', answer: '' },
        {
          question: 'What is the difference between “Unlock Password” and “Wallet Password”?',
          answer: '',
        },
        { question: 'Can I ask the administrator to obtain my password?', answer: '' },
      ],
    },
    {
      title: 'Staking',
      items: [
        { question: 'What is staking?', answer: '' },
        { question: 'What are delegating, undelegating, and redelegating?', answer: '' },
        { question: "Why can't I redelegate my token?", answer: '' },
        { question: 'Which validator should I delegate to?', answer: '' },
        { question: 'How much staking rewards can I expect by delegating?', answer: '' },
        { question: 'Why did my staking rewards drop?', answer: '' },
        { question: 'Any risks associated with delegating?', answer: '' },
        { question: 'How often should I claim my staking rewards?', answer: '' },
        {
          question: 'I delegate to multiple validators. Can I claim my staking rewards in one go?',
          answer: '',
        },
        { question: 'What is the unbonding period and how long does it take?', answer: '' },
        { question: 'Can I relegate my token to another validator?', answer: '' },
      ],
    },
    {
      title: 'Others',
      items: [
        { question: 'Does Forbole X have a browser extension for Firefox or Safari?', answer: '' },
      ],
    },
  ])

  const [queryString, setQueryString] = useState<string>('')

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
            {e.items.map((i) => (
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
  )
}

export default Support
