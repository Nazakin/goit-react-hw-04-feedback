import React, { useState } from 'react';
import Statistics from './StatsComp/Statistics/Statictics';
import FeedbackOptions from './FeedbackOption/FeedbackOptions';
import Section from './Section/Section';
import Notification from './Notification/Notification';

export const App = () => {
  const [feedback, setFeedback] = useState({ good: 0, neutral: 0, bad: 0 });

  const handleFeedback = (option) => {
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [option]: prevFeedback[option] + 1,
    }));
  };

  const countTotalFeedback = () => {
    const { good, neutral, bad } = feedback;
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    const total = countTotalFeedback();
    return total === 0 ? 0 : Math.round((feedback.good / total) * 100);
  };

  const total = countTotalFeedback();
  const positivePercentage = countPositiveFeedbackPercentage();

  return (
    <div>
      <Section title="Please leave feedback">
        <FeedbackOptions options={feedback} onLeaveFeedback={handleFeedback} />
      </Section>

      <Section title="Statistics">
        {total === 0 ? (
          <Notification message="There is no feedback" />
        ) : (
          <Statistics good={feedback.good} neutral={feedback.neutral} bad={feedback.bad} total={total} positivePercentage={positivePercentage} />
        )}
      </Section>
    </div>
  );
};


