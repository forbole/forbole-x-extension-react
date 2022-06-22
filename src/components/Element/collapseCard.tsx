import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import { ReactComponent as ArrowDownIcon } from '../../assets/images/icons/icon_arrow_down.svg';
import Markdown from '../Markdown';

type Props = {
  question: string;
  answer: string;
};

const CollapseCard = ({ question, answer }: Props) => {
  return (
    <Accordion sx={{ backgroundColor: 'background.paper' }}>
      <AccordionSummary
        expandIcon={<ArrowDownIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>{question}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Markdown>{answer}</Markdown>
      </AccordionDetails>
    </Accordion>
  );
};

export default CollapseCard;
