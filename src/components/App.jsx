import React from 'react';
import Statistics from './StatsComp/Statistics/Statictics';
import FeedbackOptions from './FeedbackOption/FeedbackOptions';
import Section from './Section/Section';
import Notification from './Notification/Notification';
//
export class App extends React.Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  handleFeedback = (option) => {
    this.setState((prev) => ({
      [option]: prev[option] + 1,
    }));
  };

  countTotalFeedback = () => {
    const { good, neutral, bad } = this.state;
    return good + neutral + bad;
  };

  countPositiveFeedbackPercentage = () => {
    const total = this.countTotalFeedback();
    return total === 0 ? 0 : Math.round((this.state.good / total) * 100);
  };


  render() {
    const { good, neutral, bad } = this.state;
    const total = this.countTotalFeedback();
    const positivePercentage = this.countPositiveFeedbackPercentage();

    return (
      <div>
        <Section title="Please leave feedback">
          <FeedbackOptions options={{ good, neutral, bad }} onLeaveFeedback={this.handleFeedback} />
        </Section>

        <Section title="Statistics">
          {total === 0 ? (
            <Notification message="There is no feedback" />
          ) : (
            <Statistics good={good} neutral={neutral} bad={bad} total={total} positivePercentage={positivePercentage} />
          )}
        </Section>
      </div>
    );
  }
}