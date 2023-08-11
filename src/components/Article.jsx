import React from 'react'

export default function Article(props) {
    return (
        <div className="article-container">
            <h1>{props.article.articleTitle}</h1>
            <p>{props.article.articleContent}</p>
        </div>
    )
}