import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class Feed extends Component {
  state = {
    articles: [],
    search: "",
  };

  componentDidMount() {
    axios
      .get(`/api/articles/findarticles`)
      .then((response) => {
        this.setState({ articles: response.data });
      })
      .catch((err) => {
        console.log(err, `errors are our friends`);
        return err.response.message;
      });
  }

  handleFilter = (event) => {
    console.log(event.target.value);
    this.setState({
      search: event.target.value,
    });
  };

  render() {
    return (
      <>
        <h1 className="feed-title">Your daily articles and analysis</h1>
        <form>
          <select
            className="input-text"
            name="category"
            onChange={this.handleFilter}
            id="category"
          >
            <option value="">All</option>
            <option value="analysis">Analysis</option>
            <option value="stocks">Stocks</option>
            <option value="options">Options</option>
            <option value="comodities">Comodities</option>
            <option value="opinion">Opinion</option>
            <option value="Due-Diligence">Due Diligence</option>
          </select>
          {/* <button type="submit" onClick={this.handleChange}>
            Search
          </button> */}
        </form>

        <div>
          {this.state.articles
            .filter((article) => article.category.includes(this.state.search))
            .map((article) => {
              //console.log(article);
              return (
                <div className="post">
                  <div className="post-image post-image-1">
                    <img
                      className="post-image"
                      alt="avatar"
                      src={
                        article.author.length
                          ? article.author[0].avatarUrl
                          : null
                      }
                    />
                  </div>
                  <div className="post-content">
                    <div>
                      <Link
                        className="post-author"
                        to={
                          article.author.length &&
                          `/userpage/${article.author[0]._id}`
                        }
                      >
                        {article.author.length && article.author[0].username}
                      </Link>
                    </div>
                    <Link className="post-title" to={`/article/${article._id}`}>
                      {article.title}
                    </Link>
                    <div class="post-excerpt">
                      <p>{article.category}</p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        {/* <div className="container">
          {this.state.articles
            .filter((article) => article.category.includes(this.state.search))
            .map((article) => {
              console.log(article);
              return (
                <div>
                  <Link
                    className="feed-link"
                    to={
                      article.author.length &&
                      `/userpage/${article.author[0]._id}`
                    }
                  >
                    <img
                      className="feed-image"
                      src={
                        article.author.length
                          ? article.author[0].avatarUrl
                          : null
                      }
                      alt="author's avatar"
                    />
                    {article.author.length && article.author[0].username}
                  </Link>
                  <span className="category-feed">{article.category}</span>

                  <Link className="feed-article" to={`/article/${article._id}`}>
                    {article.title}
                  </Link>
                </div>
              );
            })}
        </div> */}
      </>
    );
  }
}
