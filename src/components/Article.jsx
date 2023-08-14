import React from 'react'

export default function Article(props) {
    return (
        <div className="article-container">
            <h1 className="article-title">{props.article.articleTitle}</h1>
            <p className="article-content">{props.article.articleContent}</p>
        </div>
    )
}