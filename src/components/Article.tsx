import '../models/Article'
import { useState, useEffect } from 'react'
import { ArticleType } from '../models/Article'
import axios from 'axios'

function Article({article}: {article: ArticleType}) {

  return (
      <div key={article.id}>
        <h2>{article.title}</h2>
        <p><strong>Author:</strong> {article.author}</p>
        <p><strong>Date:</strong> {article.date}</p>
        <p>{article.content}</p>
    </div>
  );
}

export default Article
