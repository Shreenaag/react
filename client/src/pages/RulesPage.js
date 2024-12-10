import React from "react";
import './RulesPage.css';
function RulesPage () {
  return (
    <div class="Rules">
      <h2 style={{font:'MyFont'}}>Game Rules</h2>
      <ul>
        <li>You have limited time to answer each question.</li>
        <li>Each correct answer awards you points.</li>
        <li>No negative marking for incorrect answers.</li>
        <li>Be honest—no cheating!</li>
        <li>Have fun and enjoy the quiz!</li>
      </ul>
    </div>
  );
};

export default RulesPage;
