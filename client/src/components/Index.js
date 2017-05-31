import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import AskQuestion from './AskQuestion.js';

const Index = () => (
  <div>
    <h1> Questions </h1>    
    <AskQuestion/>
  </div>
)

export default Index;